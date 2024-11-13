import * as web3 from "@solana/web3.js";
import { Anchor } from "../anchor";
import { generateAta, generateUserPda, generateUserPdaStorageAccount } from "../functions";
import { ASSOCIATED_TOKEN_PROGRAM, HS_AUTHORITY, IYF_MAIN, TOKEN_PROGRAM_ID, USDC_FARM } from "../addresses";
import BN from "bn.js";
import { IyfMainIxGenerator } from "./IyfMainIxGenerator";

type MoveTokenIx = {
  connection: web3.Connection,
  userWallet: web3.PublicKey,
  mint: web3.PublicKey,
  useSourceAmount: boolean,
  amount?: BN,
};

/**
 * Iyf Extension IX Generator
 */
export class IyfExtensionIxGenerator {

  constructor(
    private iyfMain: IyfMainIxGenerator,
  ) {}

  /**
   * Move token from ATA to STA
   *
   * @param param0
   * @returns
   */
  async moveTokenIx({
    connection,
    userWallet,
    mint,
    useSourceAmount,
    amount,
  }: MoveTokenIx): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Generate user pda
    const userPda = generateUserPda(userWallet);
    const sourceToken = generateAta(userPda, mint);
    const destinationToken = generateUserPdaStorageAccount(userPda, mint);

    if (!useSourceAmount && amount === undefined) {
      throw new Error('Source amount cannot be undefined if `useSourceAmount` is false');
    }

    if (amount === undefined) {
      amount = new BN(0);
    }

    // Generate move_token instruction
    const iyfExtensionIx = await Anchor.instance().iyfExtension
      .methods
      .moveToken(useSourceAmount, amount)
      .accounts({
        farm: USDC_FARM,
        userPda,
        authority: userWallet,
        iyfProgram: IYF_MAIN,
        hawksightAuthority: HS_AUTHORITY,
        sourceToken,
        destinationToken,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      })
      .instruction();

    // Wrap instruction in iyf extension (iyf-main)
    return await this.iyfMain.iyfExtensionExecute(connection, {
      userWallet,
      iyfExtensionIx,
    });
  }
}
