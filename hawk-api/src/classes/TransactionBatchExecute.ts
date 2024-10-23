import * as web3 from '@solana/web3.js';

/**
 * Dummy signers
 */
export type DummySigners = Record<string, web3.Keypair>;

/**
 * Transaction batch
 */
export type Batch = {
  addressLookupTables: web3.PublicKey[],
  instructions: web3.PublicKey[],
  signers: web3.Keypair,
}

export type TransactionBatchExecuteParams = {
  lookupTableAddresses: web3.PublicKey[],
  instructions: web3.TransactionInstruction[],
  payer: web3.Keypair,
  connection: web3.Connection,
  signers: web3.Keypair[],
}

/**
 * Executes transactions in batches
 */
export class TransactionBatchExecute {

  private readonly MAX_SIZE = 1232;

  /**
   * Downloaded address lookup table accounts
   */
  private alts: web3.AddressLookupTableAccount[] = [];

  /**
   * Creates an instance of TransactionExecute class
   *
   * @param lookupTableAddresses Address lookup table addresses to be used by batch of transactions
   * @param instructions Array of instructions to be batched into transactions
   * @param payer Payer that will pay for the batch of transactions
   * @param connection Connection to mainnet
   * @param signers Required signers to fulfill the transactions
   */
  constructor(
    private lookupTableAddresses: web3.PublicKey[],
    private instructions: web3.TransactionInstruction[],
    private payer: web3.Keypair,
    private connection: web3.Connection,
    private signers: web3.Keypair[] = [],
  ) {};

  /**
   * Downoad address lookup table from given cluster
   */
  async downloadAlts() {
    // Skip if we already downloaded alts from the cluster
    if (this.alts.length > 0 && this.alts.length === this.lookupTableAddresses.length) return;

    // Download if address lookup table does not match with downloaded alts
    for (const lookupTable of this.lookupTableAddresses) {
      const alt = await this.connection.getAddressLookupTable(lookupTable);
      if (alt.value === null) {
        throw new Error(`Address lookup table: ${lookupTable} does not exist on the blockchain.`);
      }
      this.alts.push(alt.value);
    }
  }

  /**
   * Override signers (in case that signers are set to empty array)
   *
   * @param signers
   */
  setSigners(signers: web3.Keypair[]) {
    this.signers = signers;
  }

  /**
   * Find missing signers
   */
  findMissingSigners(): web3.PublicKey[] {
    const requiredSigners = this.findRequiredSigningPubkeys();
    if (requiredSigners.length > this.signers.length) {
      return requiredSigners;
    }
    const missingSigners = [];
    for (const requiredSigner of requiredSigners) {
      const match = this.signers.find(v => v.publicKey.toBase58() === requiredSigner.toBase58());
      if (!!match) continue;
      missingSigners.push(requiredSigner);
    }
    return missingSigners;
  }

  /**
   * Returns list of public keys that are required to sign the batch of transaction
   */
  findRequiredSigningPubkeys(): web3.PublicKey[] {
    return this.findRequiredSignersFromIxs(this.instructions);
  }

  /**
   * Generate dummy signers needed for simulation
   *
   * @returns
   */
  generateDummySigners(): DummySigners {
    const requiredSigners = this.findRequiredSigningPubkeys();
    const dummySigners: DummySigners = {};
    for (const signer of requiredSigners) {
      dummySigners[signer.toString()] = web3.Keypair.generate();
    }
    return dummySigners;
  }

  /**
   * Generate instruction that has modified signers for simulation purposes
   */
  generateSimulationIxs(): [web3.TransactionInstruction[], DummySigners] {
    const dummySigners = this.generateDummySigners();
    let simulationIxs = this.instructions;
    for (const pubkey in dummySigners) {
      simulationIxs = simulationIxs.map(ix => {
        const keys = ix.keys.map(meta => {
          if (meta.pubkey.toString() === pubkey && meta.isSigner) {
            return { ...meta, pubkey: dummySigners[pubkey].publicKey };
          }
          return meta;
        })
        return { ...ix, keys };
      });
    }
    return [simulationIxs, dummySigners];
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
        currentBatch.push(this.instructions[index++]);
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
  private async splitToTransactions(simulationIxs: web3.TransactionInstruction[], dummySigners: DummySigners): Promise<web3.TransactionInstruction[][]> {

    // Fetch latest blockhash required to calculate transaction size
    const latestBlockhash = await this.connection.getLatestBlockhash();

    // Run simulation
    let batch: web3.TransactionInstruction[] = [];
    let result: web3.TransactionInstruction[][] = [];
    for (const ix of simulationIxs) {

      // Include dummy ix to transaction
      batch.push(ix);

      // Calculate transaction size
      const txSize = this.calculateTransactionSize(latestBlockhash, batch, dummySigners);

      if (txSize > this.MAX_SIZE) {
        batch.pop();
        result.push(batch);
        batch = [ix];
      }
    }

    if (batch.length > 0) {
      result.push(batch);
    }

    return result;
  }

  /**
   * Calculate transaction size
   *
   * @param batch
   */
  private calculateTransactionSize(latestBlockhash: web3.BlockhashWithExpiryBlockHeight, batch: web3.TransactionInstruction[], dummySigners: DummySigners): number {
    const alts = this.findRequiredAltsForBatch(batch);
    const messageV0 = new web3.TransactionMessage({
      payerKey: this.payer.publicKey,
      instructions: batch,
      recentBlockhash: latestBlockhash.blockhash,
    }).compileToV0Message(alts);
    const versionedTx = new web3.VersionedTransaction(messageV0);
    const signers = this.findRequiredSignersFromBatch(batch, dummySigners);
    versionedTx.sign(signers);
    const bytes = versionedTx.serialize();
    return bytes.length;
  }

  /**
   * Find required signers from batch
   *
   * @param ixs
   * @param dummySigners
   */
  private findRequiredSignersFromBatch(batch: web3.TransactionInstruction[], dummySigners: DummySigners): web3.Keypair[] {
    const signers = this.findRequiredSignersFromIxs(batch);
    const result: web3.Keypair[] = [];
    for (const key in dummySigners) {
      const dummySigner = signers.find(signer => signer.toBase58() === dummySigners[key].publicKey.toBase58());
      if (dummySigner === undefined) {
        throw new Error('Unexpected error: Dummy signer not found (it should never happen)');
      }
      result.push(dummySigners[key]);
    }
    return result;
  }

  /**
   * Find required signers from instructions
   *
   * @param ixs
   * @param dummySigners
   */
  private findRequiredSignersFromIxs(ixs: web3.TransactionInstruction[]): web3.PublicKey[] {
    const signers: web3.PublicKey[] = [];
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
   * Find required address lookup table addresses for given batch of instructions
   *
   * @param batch
   */
  private findRequiredAltsForBatch(batch: web3.TransactionInstruction[]): web3.AddressLookupTableAccount[] {
    const uniquePubkeys: Record<string, 1> = {};
    batch.map(ix => {
      const pubkeys = ix.keys.map(meta => meta.pubkey);
      for (const pubkey of pubkeys) {
        uniquePubkeys[pubkey.toBase58()] = 1;
      }
    });
    const pubkeys: web3.PublicKey[] = [];
    for (const pubkey in uniquePubkeys) {
      pubkeys.push(new web3.PublicKey(pubkey));
    }
    const alts: Record<string, web3.AddressLookupTableAccount> = {};
    for (const alt of this.alts) {
      for (const pubkey of pubkeys) {
        const match = alt.state.addresses.find(address => pubkey.toBase58() === address.toBase58());
        if (!!match) {
          alts[alt.key.toString()] = alt;
        }
      }
    }
    const result: web3.AddressLookupTableAccount[] = [];
    for (const key in alts) {
      result.push(alts[key]);
    }
    return result;
  }
}
