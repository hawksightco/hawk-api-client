import * as web3 from '@solana/web3.js';
import { TransactionBatchExecute, DummySigners } from './TransactionBatchExecute';
import { CreateTxMetadata } from './CreateTxMetadata';
import { InsertNonceAtOpt } from '../types';
import { GeneralUtility } from './GeneralUtility';
import { MultiTransaction } from './MultiTransaction';
import { generateNonceAddressFromIndex } from '../functions';

/**
 * Executes transactions in batches
 */
export class TransactionBatchExecute2 extends TransactionBatchExecute {

  private _insertNonceAt: InsertNonceAtOpt = {};

  /**
   * Creates an instance of TransactionExecute class
   *
   * @param lookupTableAddresses Address lookup table addresses to be used by batch of transactions
   * @param instructions Array of instructions to be batched into transactions
   * @param payer Payer that will pay for the batch of transactions
   * @param connection Connection to mainnet
   */
  constructor(
    protected lookupTableAddresses: web3.PublicKey[],
    protected instructions: web3.TransactionInstruction[],
    protected connection: web3.Connection,
    protected createTxMetadataInstance: CreateTxMetadata,
    protected latestBlockhash: web3.BlockhashWithExpiryBlockHeight,
    protected payerKey: web3.PublicKey,
  ) {
    super(
      lookupTableAddresses,
      instructions,
      new web3.Keypair(), // unused
      connection,
      [], // unused
    )
  };

  /**
   * Find alt by pubkeys (overridable)
   *
   * @param pubkeys
   */
  static jupiterFindAltByPubkeysFn: (pubkeys: web3.PublicKey[]) => Promise<web3.PublicKey[]> = async (pubkeys: web3.PublicKey[]) => {
    throw new Error("jupiterFindAltByPubkeysFn not implemented.");
  }

  /**
   * Download all jupiter alts (overridable)
   */
  protected async jupiterDownloadAlts() {}

  /**
   * Find alt by pubkeys (overridable)
   */
  protected async jupiterFindAltByPubkeys(pubkeys: web3.PublicKey[]): Promise<web3.PublicKey[]> {
    return await TransactionBatchExecute2.jupiterFindAltByPubkeysFn(pubkeys);
  }

  /**
   * Downoad address lookup table from given cluster
   */
  protected async downloadAlts2(lookupTableAddresses: web3.PublicKey[]) {
    const pubkeyStr = lookupTableAddresses.map(pubkey => pubkey.toString());
    const alts = await this.createTxMetadataInstance.stringToAlt(pubkeyStr);
    this.alts.push(...alts);
  }

  /**
   * Option to include nonce advance instruction
   *
   * @param opt
   */
  insertNonceAt(opt: InsertNonceAtOpt) {
    this._insertNonceAt = opt;
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
    let i = 0;
    const lastIndex = dummyBatches.length - 1;
    for (const dummyIxs of dummyBatches) {
      const isLastIndex = i == lastIndex;
      const currentBatch: web3.TransactionInstruction[] = [];
      for (const ix of dummyIxs) {
        // If program id is compute budget, ignore
        if (ix.programId.equals(web3.ComputeBudgetProgram.programId)) continue;

        // Otherwise, include in batch
        currentBatch.push(this.instructions[index++]);
      }
      if (isLastIndex && this._insertNonceAt.onlyEndOfTx) {
        currentBatch.push(await this.generateNonceAdvanceIx(i));
      }
      batch.push(currentBatch);
      i++;
    }

    return batch;
  }

  /**
   * Builds a batch of executable transaction instructions
   */
  async buildBatchWithAlts(description: string, generalUtility: GeneralUtility): Promise<MultiTransaction> {
    // Download address lookup table from given cluster
    await this.downloadAlts();

    // Generate dummy instructions for batch calculation
    const [simulationIxs, dummySigners] = this.generateSimulationIxs();

    // Split simulation ixs
    const dummyBatches = await this.splitToTransactions(simulationIxs, dummySigners);

    // Batch of actual instructions
    const batch: MultiTransaction = new MultiTransaction(description, generalUtility, this.latestBlockhash, this.payerKey);
    let index = 0;
    let i = 0;
    const lastIndex = dummyBatches.length - 1;
    for (const dummyIxs of dummyBatches) {
      const isLastIndex = i == lastIndex;
      const currentBatch: web3.TransactionInstruction[] = [];
      for (const ix of dummyIxs) {
        // If program id is compute budget, ignore
        if (ix.programId.equals(web3.ComputeBudgetProgram.programId)) continue;

        // Otherwise, include in batch
        currentBatch.push(this.instructions[index++]);
      }
      if (lastIndex !== 0 && isLastIndex && this._insertNonceAt.onlyEndOfTx) {
        currentBatch.push(await this.generateNonceAdvanceIx(i));
      }

      const alts = this.findRequiredAltsForBatch2(currentBatch);
      batch.push(alts, currentBatch);
      i++;
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

    // Create dummy priority fee instructions for the transaction (to account for total tx size)
    const preIxs = [
      web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000, // dummy value
      }),
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000, // dummy value
      }),
    ];

    // Run simulation
    let batch: web3.TransactionInstruction[] = [];
    let result: web3.TransactionInstruction[][] = [];
    for (const ix of simulationIxs) {

      // Include dummy ix to transaction
      batch.push(ix);

      // Calculate transaction size
      try {
        const estimateTxSize = this.getEstimateSize([...preIxs, ...batch]);
        if (estimateTxSize < this.MAX_SIZE) continue;

        // Generate dummy nonce advance (anticipation)
        const nonceAdvance = this._insertNonceAt.onlyEndOfTx ? [await this.generateNonceAdvanceIx(result.length)] : [];

        const txSize = this.calculateTransactionSize(this.latestBlockhash, [...preIxs, ...nonceAdvance, ...batch], dummySigners);
        if (txSize > this.MAX_SIZE) {
          batch.pop();
          result.push([...preIxs, ...batch]);
          batch = [ix];
        }
      } catch {
        batch.pop();
        result.push([...preIxs, ...batch]);
        batch = [ix];
      }
    }

    if (batch.length > 0 && simulationIxs.length !== 0) {
      result.push([...preIxs, ...batch]);
    }

    return result;
  }

  /**
   * Generate nonde advance instruction (dummy instruction)
   */
  private async generateNonceAdvanceIx(index: number): Promise<web3.TransactionInstruction> {
    const noncePubkey = await generateNonceAddressFromIndex(this.payerKey, index);
    // Generate dummy nonce ix
    return web3.SystemProgram.nonceAdvance({
      /** Nonce account */
      noncePubkey,
      /** Public key of the nonce authority */
      authorizedPubkey: this.payerKey,
    });
  }

  private getEstimateSize(ixs: web3.TransactionInstruction[]) {
    let length = 0;
    const alts: Record<string, web3.AddressLookupTableAccount> = {};
    ixs.map(ix => {
      length += ix.data.length + ix.programId.toBuffer().length;
      ix.keys.map(meta => {
        const alt = this.pubkeyToAlt[meta.pubkey.toString()];
        if (!!alt) {
          alts[alt.key.toString()] = alt;
          length += 3
        } else {
          length += 34;
        }
      });
    });
    for (const _ in alts) {
      length += 32;
    }
    return length;
  }

  /**
   * Find required signers from instructions
   *
   * @param ixs
   * @param dummySigners
   */
  protected findRequiredSignersFromIxs(ixs: web3.TransactionInstruction[]): web3.PublicKey[] {
    const signers: web3.PublicKey[] = [];
    signers.push(this.payerKey);
    for (const instruction of ixs) {
      const _signers = instruction.keys
        .filter(meta => meta.isSigner)
        .map(meta => meta.pubkey);
      if (_signers.length > 0) {
        signers.push(..._signers);
      }
    }
    const uniqueSigners: Record<string, web3.PublicKey> = {};
    for (const signer of signers) {
      uniqueSigners[signer.toBase58()] = signer;
    }
    const result: web3.PublicKey[] = [];
    for (const id in uniqueSigners) {
      result.push(uniqueSigners[id]);
    }
    return result;
  }

  /**
   * Calculate transaction size
   *
   * @param batch
   */
  protected calculateTransactionSize(latestBlockhash: web3.BlockhashWithExpiryBlockHeight, batch: web3.TransactionInstruction[], dummySigners: DummySigners): number {
    const alts = this.findRequiredAltsForBatch2(batch);
    const messageV0 = new web3.TransactionMessage({
      payerKey: dummySigners[this.payerKey.toString()].publicKey,
      instructions: batch,
      recentBlockhash: latestBlockhash.blockhash,
    }).compileToV0Message(alts);
    const versionedTx = new web3.VersionedTransaction(messageV0);
    const signers = this.findRequiredSignersFromBatch2(batch, dummySigners);
    versionedTx.sign(signers);
    const bytes = versionedTx.serialize();
    return bytes.length;
  }

  /**
   * Find required address lookup table addresses for given batch of instructions
   *
   * @param batch
   */
  public findRequiredAltsForBatch2(batch: web3.TransactionInstruction[]): web3.AddressLookupTableAccount[] {
    const pubkeys: web3.PublicKey[] = [];
    batch.map(ix => {
      pubkeys.push(...ix.keys.map(meta => meta.pubkey));
    });
    const alts: Record<string, web3.AddressLookupTableAccount> = {};
    for (const pubkey of pubkeys) {
      const alt = this.pubkeyToAlt[pubkey.toString()];
      if (!!alt) {
        alts[alt.key.toString()] = alt;
      }
    }
    const result: web3.AddressLookupTableAccount[] = [];
    for (const key in alts) {
      result.push(alts[key]);
    }
    return result;
  }

  /**
   * Find required signers from batch
   *
   * @param ixs
   * @param dummySigners
   */
  private findRequiredSignersFromBatch2(batch: web3.TransactionInstruction[], dummySigners: DummySigners): web3.Keypair[] {
    const signers = this.findRequiredSignersFromIxs(batch);
    const result: web3.Keypair[] = [];
    for (const signer of signers) {
      const key = signer.toString();
      result.push(dummySigners[key]);
    }
    return result;
  }
}
