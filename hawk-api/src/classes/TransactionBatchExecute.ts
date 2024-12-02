import * as web3 from '@solana/web3.js';
import { JupiterAlts } from './JupiterAlts';
import { Log } from './Logging';

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

  protected readonly MAX_SIZE = 1232;

  /**
   * Downloaded address lookup table accounts
   */
  protected alts: web3.AddressLookupTableAccount[] = [];

  /**
   * Map of public keys to address lookup table
   */
  protected pubkeyToAlt: Record<string, web3.AddressLookupTableAccount> = {};

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
    protected lookupTableAddresses: web3.PublicKey[],
    protected instructions: web3.TransactionInstruction[],
    protected payer: web3.Keypair,
    protected connection: web3.Connection,
    protected signers: web3.Keypair[] = [],
    protected jupiterAlts?: JupiterAlts,
  ) {};

  /**
   * Download all jupiter alts (overridable)
   */
  protected async jupiterDownloadAlts() {
    if (this.jupiterAlts) {
      await this.jupiterAlts.downloadAlts();
    } else {
      throw new Error('Unexpected error: jupiterDownloadAlts not implemented!');
    }
  }

  /**
   * Find alt by pubkeys (overridable)
   */
  protected async jupiterFindAltByPubkeys(pubkeys: web3.PublicKey[]): Promise<web3.PublicKey[]> {
    if (this.jupiterAlts) {
      return this.jupiterAlts.findAltByPubkeys(pubkeys);
    } else {
      throw new Error('Unexpected error: jupiterFindAltByPubkeys not implemented!');
    }
  }

  /**
   * Downoad address lookup table from given cluster
   */
  protected async downloadAlts() {

    // Public keys across all instructions
    const pubkeys = this.getPubkeyFromInstruction();

    // Download jupiter alts first
    await this.jupiterDownloadAlts();

    // Then find alts from pubkeys
    const jupAlts = await this.jupiterFindAltByPubkeys(pubkeys);

    // Then append jupiter alts in the lookup table address
    this.lookupTableAddresses.push(...jupAlts);

    // Then make sure lookup table addresses are unique
    this.filterLookupTables();

    // Get list of lookup tables to download
    const lookupTableAddresses = this.getListOfAltsToDownload();

    // Download if address lookup table does not match with downloaded alts
    await this.downloadAlts2(lookupTableAddresses);

    // Map public key to alt
    const s0 = new Date().getTime() / 1000;
    this.mapPubkeyToAlt(pubkeys);
    Log(`TransactionBatchExecute::downloadAlts(): this.mapPubkeyToAlt benchmark: ${(new Date().getTime() / 1000) - s0}`);
  }

  /**
   * Downoad address lookup table from given cluster
   */
  protected async downloadAlts2(lookupTableAddresses: web3.PublicKey[]) {
    for (const lookupTable of lookupTableAddresses) {
      const alt = await this.connection.getAddressLookupTable(lookupTable);
      if (alt.value === null) {
        throw new Error(`Address lookup table: ${lookupTable} does not exist on the blockchain.`);
      }
      this.alts.push(alt.value);
    }
  }

  /**
   * Map public key to alt
   *
   * @param pubkeys
   */
  private mapPubkeyToAlt(pubkeys: web3.PublicKey[]) {
    const addressesInAlt: string[] = [];
    const map: Record<string, [web3.AddressLookupTableAccount, string[]]> = {};
    for (const alt of this.alts) {
      const addresses = alt.state.addresses.map(p => p.toString());
      addressesInAlt.push(...addresses);
      map[alt.key.toString()] = [alt, addresses];
    }
    for (const pubkey of pubkeys) {
      // If pubkey is not in alt, then skip
      const inAlt = addressesInAlt.includes(pubkey.toString());
      if (!inAlt) continue;

      // Find the alt where public key is included
      for (const key in map) {
        if (map[key][1].includes(pubkey.toString())) {
          this.pubkeyToAlt[pubkey.toString()] = map[key][0];
          break;
        }
      }
    }
  }

  /**
   * Get list of lookup tables to download
   */
  private getListOfAltsToDownload(): web3.PublicKey[] {
    const alts = this.alts.map(alt => alt.key.toBase58());
    const toDownload: web3.PublicKey[] = [];
    for (const alt of this.lookupTableAddresses) {
      if (!alts.includes(alt.toBase58())) {
        toDownload.push(alt);
      }
    }
    return toDownload;
  }

  /**
   * Filter lookup tables
   */
  private filterLookupTables() {
    const map: Record<string, 1> = {};
    for (const alt of this.lookupTableAddresses) {
      map[alt.toBase58()] = 1;
    }
    const filtered: web3.PublicKey[] = [];
    for (const alt in map) {
      filtered.push(new web3.PublicKey(alt));
    }
    this.lookupTableAddresses = filtered;
  }

  /**
   * Get public keys from instruction
   * @returns
   */
  private getPubkeyFromInstruction(): web3.PublicKey[] {
    const pubkeys: web3.PublicKey[] = [];
    this.instructions.map(ix => {
      pubkeys.push(...ix.keys.map(meta => meta.pubkey));
    });
    return pubkeys;
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
   * Build versioned transactions from given batches of transactions
   *
   * @param batches
   * @returns
   */
  async buildV0Transactions(batches: web3.TransactionInstruction[][]): Promise<web3.VersionedTransaction[]> {
    const latestBlockhash = await this.connection.getLatestBlockhash();
    const signedVersionedTxs: web3.VersionedTransaction[] = [];
    for (const batch of batches) {
      const alts = this.findRequiredAltsForBatch(batch);
      const messageV0 = new web3.TransactionMessage({
        payerKey: this.payer.publicKey,
        instructions: batch,
        recentBlockhash: latestBlockhash.blockhash,
      }).compileToV0Message(alts);
      const versionedTx = new web3.VersionedTransaction(messageV0);
      const signers = this.findSigningKeypairFromIxs(batch);
      versionedTx.sign(signers);
      signedVersionedTxs.push(versionedTx)
    }
    return signedVersionedTxs;
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

    if (batch.length > 0 && simulationIxs.length !== 0) {
      result.push(batch);
    }

    return result;
  }

  /**
   * Calculate transaction size
   *
   * @param batch
   */
  protected calculateTransactionSize(latestBlockhash: web3.BlockhashWithExpiryBlockHeight, batch: web3.TransactionInstruction[], dummySigners: DummySigners): number {
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
   * Find required signers from instructions
   *
   * @param ixs
   * @param dummySigners
   */
  protected findRequiredSignersFromIxs(ixs: web3.TransactionInstruction[]): web3.PublicKey[] {
    const signers: web3.PublicKey[] = [];
    signers.push(this.payer.publicKey);
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
   * Find signing keypairs from signers defined in instruction
   *
   * @param batch
   * @returns
   */
  private findSigningKeypairFromIxs(batch: web3.TransactionInstruction[]): web3.Keypair[] {
    const signers = this.findRequiredSignersFromIxs(batch);
    const result: web3.Keypair[] = [];
    for (const signer of signers) {
      const keypair = this.signers.find(keypair => keypair.publicKey.toBase58() === signer.toBase58());
      if (keypair === undefined) {
        throw new Error(`Keypair ${signer} cannot be found in $this.signers array. Perhaps you forgot to add it?`);
      }
      result.push(keypair);
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
