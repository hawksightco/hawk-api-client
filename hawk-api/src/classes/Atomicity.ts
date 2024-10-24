import * as web3 from '@solana/web3.js';
import { DummySigners, TransactionBatchExecute } from "./TransactionBatchExecute";
import { SimpleIxGenerator } from './SimpleIxGenerator';
import { sighashMatch } from '../functions';
import { JupiterAlts } from './JupiterAlts';

export class Atomicity extends TransactionBatchExecute {

  /**
   * User wallet
   */
  private userWallet?: web3.PublicKey;

  constructor(
    lookupTableAddresses: web3.PublicKey[],
    instructions: web3.TransactionInstruction[],
    payer: web3.Keypair,
    connection: web3.Connection,
    signers: web3.Keypair[] = [],
    jupiterAlts: JupiterAlts,
    private ixGenerator: SimpleIxGenerator,
  ) {
    super(
      lookupTableAddresses,
      instructions,
      payer,
      connection,
      signers,
      jupiterAlts,
    );
  }

  /**
   * Set user wallet
   */
  setUserWallet(userWallet: web3.PublicKey) {
    this.userWallet = userWallet;
  }

  /**
   * Check whether instruction is an atomicity instruction
   * @param ix
   */
  private isAtomicityIx(ix: web3.TransactionInstruction): boolean {
    if (ix.data.length >= 8) {
      return sighashMatch(ix.data, "setTransactionSlot") || sighashMatch(ix.data, "verifyTransactionSlot")
    }
    return false;
  }

  /**
   * Builds a batch of executable transaction instructions
   */
  async buildBatch(): Promise<web3.TransactionInstruction[][]> {
    // Download address lookup table from given cluster
    await this.downloadAlts();

    // Generate dummy instructions for batch calculation
    const [simulationIxs, dummySigners] = this.generateSimulationIxs();

    // Split simulation ixs
    const dummyBatches = await this.splitToTransactions(simulationIxs, dummySigners);

    // Batch of actual instructions
    const batch: web3.TransactionInstruction[][] = [];
    let index = 0;
    for (const dummyIxs of dummyBatches) {
      const currentBatch: web3.TransactionInstruction[] = [];
      for (const dummyIx of dummyIxs) {
        if (this.isAtomicityIx(dummyIx)) {
          currentBatch.push(dummyIx);
        } else {
          currentBatch.push(this.instructions[index++]);
        }
      }
      batch.push(currentBatch);
    }

    return batch;
  }

  /**
   * Split transactions
   *
   * @param simulationIxs
   * @param dummySigners
   * @returns
   */
  protected async splitToTransactions(simulationIxs: web3.TransactionInstruction[], dummySigners: DummySigners): Promise<web3.TransactionInstruction[][]> {

    // Fetch latest blockhash required to calculate transaction size
    const latestBlockhash = await this.connection.getLatestBlockhash();

    // User wallet must be set
    if (this.userWallet === undefined) {
      throw new Error(`Atomicity.userWallet is not set`);
    }

    // Generate set transaction slot instruction
    const setTransactionSlotIx = await this.ixGenerator.iyfMain.setTransactionSlot(this.connection, { userWallet: this.userWallet });

    // Generate verify transaction slot instruction
    const verifyTransactionSlotIx = await this.ixGenerator.iyfMain.verifyTransactionSlot(this.connection, { userWallet: this.userWallet });

    // Run simulation
    let batch: web3.TransactionInstruction[] = [];
    let result: web3.TransactionInstruction[][] = [];
    let postIx: web3.TransactionInstruction;
    for (const ix of simulationIxs) {

      // Include dummy ix to transaction
      batch.push(ix);

      // Include setTransactionSlot instruction if result batch is still zero
      if (result.length === 0) {
        postIx = setTransactionSlotIx;
      } else {
        postIx = verifyTransactionSlotIx;
      }

      // Calculate transaction size
      const txSize = this.calculateTransactionSize(latestBlockhash, [...batch, postIx], dummySigners);

      if (txSize > this.MAX_SIZE) {
        batch.pop();
        result.push([...batch, postIx]);
        batch = [ix];
      }
    }

    if (batch.length > 0 && simulationIxs.length !== 0) {
      result.push([...batch, postIx!]);
    }

    return result;
  }

}