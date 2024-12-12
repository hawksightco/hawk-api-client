import * as web3 from "@solana/web3.js";
import { Anchor, IyfExtension } from '../anchor';
import { setTransactionSlot, verifyTransactionSlot, AtomicityContextParams } from "../hawksight";
import { IyfMainIxGenerator } from "./IyfMainIxGenerator";
import { generateAta, generateUserPda } from "../functions";
import { HS_AUTHORITY, IYF_MAIN, TOKEN_PROGRAM_ID, USDC_FARM } from "../addresses";
import { MeteoraDLMM, MeteoraFunctions } from "../meteora";
import BN from "bn.js";
import { StrategyType } from "@meteora-ag/dlmm";

/**
 * Meteora event authority
 */
const METEORA_EVENT_AUTHORITY = new web3.PublicKey('D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6');

/**
 * Meteora Program ID
 */
const METEORA_DLMM_PROGRAM = new web3.PublicKey('LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo');

type InitializePositionAutomation = {
  userWallet: web3.PublicKey,
  lbPair: web3.PublicKey,
  position: web3.PublicKey,
  lowerBinId: number,
  upperBinId: number,
}

type OpenPositionAndDepositAutomation = {
  userWallet: web3.PublicKey,
  lbPair: web3.PublicKey,
  position: web3.PublicKey,
  relativeLowerBinId: number,
  relativeUpperBinId: number,
  strategyType: StrategyType,
  checkRange?: {
    minBinId: number,
    maxBinId: number,
  }
}

/**
 * Meteora related instructions executed via iyf extension or iyf main
 */
export class MeteoraDlmmIxGenerator {

  constructor(
    private iyfMain: IyfMainIxGenerator
  ) {}

  async initializePositionAutomation(connection: web3.Connection, { userWallet, lbPair, position, lowerBinId, upperBinId }: InitializePositionAutomation): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Generate user pda
    const userPda = generateUserPda(userWallet);

    // Generate instruction
    const width = upperBinId - lowerBinId + 1;
    return this.iyfMain.iyfExtensionExecute(
      connection,
      {
        userWallet,
        iyfExtensionIx: await Anchor.instance().iyfExtension
          .methods
          .meteoraDlmmInitializePositionAutomation(
            lowerBinId,
            width,
          )
          .accounts({
            farm: USDC_FARM,
            userPda,
            authority: userWallet,
            iyfProgram: IYF_MAIN,
            hawksightAuthority: HS_AUTHORITY,
            position,
            lbPair,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
            eventAuthority: METEORA_EVENT_AUTHORITY,
            meteoraDlmmProgram: METEORA_DLMM_PROGRAM,
          })
          .instruction()
      }
    );
  }

  async redepositAutomation(connection: web3.Connection, { userWallet, lbPair, position, relativeLowerBinId, relativeUpperBinId, strategyType, checkRange }: OpenPositionAndDepositAutomation): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    // Meteora utility function
    const fn = new MeteoraFunctions();

    // Generate user pda
    const userPda = generateUserPda(userWallet);

    // Get meteora pool
    const lbPairInfo = await (Anchor.instance().meteoraProgram.account as any).lbPair.fetch(lbPair);
    const tokenXMint = lbPairInfo.tokenXMint;
    const tokenYMint = lbPairInfo.tokenYMint;
    const reserveX = lbPairInfo.reserveX;
    const reserveY = lbPairInfo.reserveY;
    const userTokenX = generateAta(userPda, tokenXMint);
    const userTokenY = generateAta(userPda, tokenYMint);
    const activeBinId = lbPairInfo.activeId;
    const MAX_BIN_ARRAY_SIZE = new BN(Anchor.instance().meteoraProgram.idl.constants[1].value);
    const lowerBinArrayIndex = fn.binIdToBinArrayIndex(MAX_BIN_ARRAY_SIZE, new BN(activeBinId - relativeLowerBinId));
    const binArrayLower = fn.deriveBinArray(lbPair, lowerBinArrayIndex);
    const binArrayUpper = fn.deriveBinArray(lbPair, lowerBinArrayIndex.add(new BN(1)));

    let _checkRange: null | [number, number];
    if (!!checkRange) {
      const { minBinId, maxBinId } = checkRange;
      _checkRange = [minBinId, maxBinId];
    } else {
      _checkRange = null;
    }

    // Generate instruction
    return this.iyfMain.iyfExtensionExecute(
      connection,
      {
        userWallet,
        iyfExtensionIx: await Anchor.instance().iyfExtension
        .methods
        .meteoraDlmmRedepositAutomation(
          relativeLowerBinId,
          relativeUpperBinId,
          strategyType,
          _checkRange,
        )
        .accounts({
          farm: USDC_FARM,
          userPda,
          authority: userWallet,
          iyfProgram: IYF_MAIN,
          hawksightAuthority: HS_AUTHORITY,
          position,
          lbPair,
          userTokenX,
          userTokenY,
          reserveX,
          reserveY,
          tokenXMint,
          tokenYMint,
          binArrayLower,
          binArrayUpper,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
          eventAuthority: METEORA_EVENT_AUTHORITY,
          meteoraDlmmProgram: METEORA_DLMM_PROGRAM,
        })
        .instruction(),
      }
    );
  }

  async claimFee(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async claimReward(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async claimFeeAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async claimRewardAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async depositAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async oneSideDeposit(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async withdrawAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async closePositionAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  async limitCloseAutomation(connection: web3.Connection, params: {}): Promise<web3.TransactionInstruction> {
    // Initialize anchor
    Anchor.initialize(connection);

    return new web3.TransactionInstruction({
      data: Buffer.from([]),
      keys: [],
      programId: web3.SystemProgram.programId,
    });
  }

  /**
   * Meteora IDL
   *
   * @param connection
   * @returns
   */
  private async meteora(connection: web3.Connection) {
    return await MeteoraDLMM.program(connection);
  }
}