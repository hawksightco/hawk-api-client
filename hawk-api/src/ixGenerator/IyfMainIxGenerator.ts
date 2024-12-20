import * as web3 from "@solana/web3.js";
import { Anchor } from "../anchor";
import { setTransactionSlot, verifyTransactionSlot, AtomicityContextParams } from "../hawksight";
import { createAtaIdempotentIxs, generateAta, generateUserPda, getJupiterRouteIxParams, generateUserPdaStorageAccount } from "../functions";
import { HS_AUTHORITY, IYF_EXTENSION, IYF_MAIN, JUPITER_PROGRAM, TOKEN_PROGRAM_ID, USDC_FARM } from "../addresses";
import { Transactions } from "../classes/Transactions";
import { InitializeStorageTokenAccount } from "../types";
import BN from "bn.js";

type IyfExtensionExecute = {
  userWallet: web3.PublicKey,
  iyfExtensionIx: web3.TransactionInstruction,
}

type JupiterRouteIx = {
  connection: web3.Connection,
  userWallet?: web3.PublicKey,
  userPda?: web3.PublicKey,
  sourceTokenAccount: web3.PublicKey,
  destinationTokenAccount: web3.PublicKey,
  destinationMint: web3.PublicKey,
  platformFeeAccount: web3.PublicKey,
  eventAuthority: web3.PublicKey,
  remainingAccounts: web3.AccountMeta[],
  data: Buffer,
  quotedOutAmount?: BN,
  slippageBps?: number,
  platformFeeBps?: number
  checkDestinationTokenAccount?: boolean,
};

export type JupiterRouteIxReturn = {
  swapIx: web3.TransactionInstruction,
  createAtaIx: web3.TransactionInstruction,
  closeAtaIx: web3.TransactionInstruction,
  ataExists: boolean,
};

/**
 * Iyf Main IX Generator
 */
export class IyfMainIxGenerator {
  /**
   * Generates a transaction instruction that sets the current blockchain clock
   * to the user's PDA (Program Derived Address) account.
   *
   * @param connection - A Solana web3.js Connection object for interacting with the blockchain.
   * @param params - AtomicityContextParams containing the context and parameters for setting the transaction slot.
   * @returns A Promise that resolves to a TransactionInstruction object for setting the current clock in the PDA.
   */
  async setTransactionSlot(connection: web3.Connection, params: AtomicityContextParams): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Get set transaction slot instruction
    return await setTransactionSlot(params);
  }

  /**
   * Generates a transaction instruction that verifies whether the current blockchain
   * clock matches the value that has been previously set in the user's PDA (Program Derived Address) account.
   *
   * @param connection - A Solana web3.js Connection object for interacting with the blockchain.
   * @param params - AtomicityContextParams containing the context and parameters for verifying the transaction slot.
   * @returns A Promise that resolves to a TransactionInstruction object for verifying the clock in the PDA.
   */
  async verifyTransactionSlot(connection: web3.Connection, params: AtomicityContextParams): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Get verify transaction slot instruction
    return await verifyTransactionSlot(params);
  }

  /**
   * Invoke iyf extension
   *
   * @param connection
   * @param params
   */
  async iyfExtensionExecute(
    connection: web3.Connection,
    {
      userWallet,
      iyfExtensionIx,
    }: IyfExtensionExecute
  ): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Generate user pda
    const userPda = generateUserPda(userWallet);

    // Validate whether instruction is valid
    const invalidInstruction =
      !iyfExtensionIx.programId.equals(IYF_EXTENSION) ||
      iyfExtensionIx.keys.length < 4 ||
      iyfExtensionIx.data.length < 8 ||
      !iyfExtensionIx.keys[0].pubkey.equals(USDC_FARM) ||
      !iyfExtensionIx.keys[1].pubkey.equals(userPda) ||
      !iyfExtensionIx.keys[2].pubkey.equals(userWallet) ||
      !iyfExtensionIx.keys[3].pubkey.equals(IYF_MAIN);
    if (invalidInstruction) {
      throw new Error('The given instruction is not a valid iyf extension instruction.');
    }

    // Generate iyf extension instruction
    const ix = await Anchor.instance().iyfMain
      .methods
      .iyfExtensionExecute(iyfExtensionIx.data)
      .accounts({
        farm: USDC_FARM,
        userPda,
        authority: userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: iyfExtensionIx.programId
      })
      .remainingAccounts(iyfExtensionIx.keys.slice(4))
      .instruction();

    return ix;
  }

  async jupiterRouteIx({
    connection,
    userWallet,
    userPda,
    sourceTokenAccount,
    destinationTokenAccount,
    destinationMint,
    platformFeeAccount,
    eventAuthority,
    remainingAccounts,
    data,
    quotedOutAmount,
    slippageBps,
    platformFeeBps,
    checkDestinationTokenAccount,
  }: JupiterRouteIx): Promise<JupiterRouteIxReturn> {
    // Initialize anchor
    Anchor.initialize(connection);

    const {
      routePlan,
      quotedOutAmount: quotedOutAmount_default,
      slippageBps: slippageBps_default,
      platformFeeBps: platformFeeBps_default,
    } = getJupiterRouteIxParams(data);

    quotedOutAmount = quotedOutAmount === undefined ? quotedOutAmount_default : quotedOutAmount;
    slippageBps = slippageBps === undefined ? slippageBps_default : slippageBps;
    platformFeeBps = platformFeeBps === undefined ? platformFeeBps_default : platformFeeBps;

    // Generate user pda from given user wallet
    userPda = userWallet !== undefined ? generateUserPda(userWallet) : userPda;

    if (userPda === undefined) {
      throw new Error("Either one of `userWallet` or `userPda` parameter must be defined!");
    }

    // Defaults to false
    let ataExists = false;

    // Generate STA and ATA
    const destATA = generateAta(userPda, destinationMint);
    const destSTA = generateUserPdaStorageAccount(userPda, destinationMint);

    // createAtaIx
    let createAtaIx;

    if (destATA.equals(destinationTokenAccount)) {
      [createAtaIx] = createAtaIdempotentIxs({
        accounts: [{
          payer: HS_AUTHORITY,
          mint: destinationMint,
          owner: userPda,
        }]
      });
    } else if (destSTA.equals(destinationTokenAccount)) {
      createAtaIx = await Anchor.instance().iyfMain
        .methods
        .initializeStorageTokenAccount()
        .accounts({
          userPda,
          payer: HS_AUTHORITY,
          mint: destinationMint,
          storageTokenAccount: destSTA,
          rent: web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .instruction();
    } else {
      throw new Error(`destinationTokenAccount: ${destinationTokenAccount} is neither ATA(${destATA}) or STA${destSTA}`);
    }

    // Flag must be enabled first to check ATA onchain
    if (checkDestinationTokenAccount) {
      const info = await connection.getAccountInfo(destinationTokenAccount);
      ataExists = !(info === null || info === undefined);
    }

    const closeAtaIx = await Anchor.instance().iyfMain
      .methods
      .closeAta()
      .accounts({
        userPda,
        hsAuthority: HS_AUTHORITY,
        userTokenAccount: destinationTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();

    const ix = await Anchor.instance().iyfMain
      .methods
      .jupiterRouteIx(
        routePlan,
        quotedOutAmount,
        slippageBps,
        platformFeeBps,
      )
      .accounts({
        authority: HS_AUTHORITY,
        tokenProgram: TOKEN_PROGRAM_ID,
        userPda,
        userSourceTokenAccount: sourceTokenAccount,
        userDestinationTokenAccount: destinationTokenAccount,
        destinationMint,
        platformFeeAccount,
        eventAuthority,
        jupiterProgram: JUPITER_PROGRAM
      })
      .remainingAccounts(remainingAccounts)
      .instruction();

    return {
      swapIx: ix,
      createAtaIx,
      closeAtaIx,
      ataExists,
    };
  }
}