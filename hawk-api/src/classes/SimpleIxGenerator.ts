import * as web3 from "@solana/web3.js";
import { GeneralUtility } from "./GeneralUtility";
import { Anchor } from "../anchor";
import { setTransactionSlot, verifyTransactionSlot, AtomicityContextParams } from "../hawksight";

/**
 * The SimpleIxGenerator class is a general-purpose utility for generating single
 * transaction instructions for simple tasks on the Solana blockchain. It offers
 * methods to set and verify transaction slots within an atomicity context, specifically
 * interacting with the user's PDA (Program Derived Address) account.
 */
export class SimpleIxGenerator {

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
}
