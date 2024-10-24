import * as web3 from "@solana/web3.js";
import { Anchor } from "../anchor";
import { setTransactionSlot, verifyTransactionSlot, AtomicityContextParams } from "../hawksight";
import { IyfMainIxGenerator } from "./IyfMainIxGenerator";
import { generateUserPda } from "../functions";
import { HS_AUTHORITY, IYF_MAIN, USDC_FARM } from "../addresses";
import { MeteoraDLMM } from "../meteora";
import BN from "bn.js";

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
    return this.iyfMain.iyfExtensionExecute(
      connection,
      {
        userWallet,
        iyfExtensionIx: await Anchor.instance().iyfExtension
          .methods
          .meteoraDlmmInitializePositionAutomation(Buffer.concat([
            Buffer.from(new BN(lowerBinId).toArray('le', 4)),
            Buffer.from(new BN(upperBinId - lowerBinId + 1).toArray('le', 4)),
          ]))
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