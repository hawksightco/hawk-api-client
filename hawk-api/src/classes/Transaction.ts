import * as client from "@hawksightco/swagger-client";
import * as web3 from "@solana/web3.js";
import { BN } from "bn.js";
import { getFeeEstimate } from "../functions";
import {
  SimulatedTransactionResponse,
  TransactionMetadataResponse,
} from "../types";
import { GeneralUtility } from "./GeneralUtility";
import { Log } from "./Logging";

/**
 * Represents a transaction object in Solana using the web3.js library.
 * This class encapsulates the logic for creating, signing, and verifying signatures of transactions.
 */
export class Transaction {
  /** Compiled TransactionMessage which includes payer, instructions, and recent blockhash */
  private _txMessage: web3.TransactionMessage;
  get txMessage(): web3.TransactionMessage {
    return this._txMessage;
  }

  /** Versioned transaction built from the transaction message */
  private _versionedTransaction: web3.VersionedTransaction;
  get versionedTransaction(): web3.VersionedTransaction {
    return this._versionedTransaction;
  }

  /** A map indicating whether each required signer has signed the transaction */
  readonly requiredSigners: Record<string, boolean>;

  /** Estimated fee in SOL for priority fee when addPriorityFee() method is called. */
  private _priorityFeeEstimate: string = "";
  get priorityFeeEstimate(): string {
    return this._priorityFeeEstimate;
  }

  /** The blockhash of a recent ledger entry */
  get recentBlockhash(): string {
    return this.latestBlockhash.blockhash;
  }

  /** Array of TransactionInstruction to be executed in this transaction */
  private _instructions: web3.TransactionInstruction[];
  get instructions(): web3.TransactionInstruction[] {
    return this._instructions;
  }

  /** last valid block height */
  get lastValidBlockHeight(): number {
    return this.latestBlockhash.lastValidBlockHeight;
  }

  /**
   * Constructs a new Transaction object.
   *
   * @param payerKey PublicKey of the transaction payer
   * @param instructions Array of TransactionInstruction to be executed in this transaction
   * @param recentBlockhash The blockhash of a recent ledger entry
   * @param alts Address lookup tables that optimize account address storage
   */
  constructor(
    readonly txMetadataResponse: TransactionMetadataResponse,
    readonly payerKey: web3.PublicKey,
    private latestBlockhash: web3.BlockhashWithExpiryBlockHeight,
    readonly alts: web3.AddressLookupTableAccount[],
    private generalUtility: GeneralUtility,
    _mainIxs: web3.TransactionInstruction[] = [],
  ) {
    let mainIxs;
    if (_mainIxs.length > 0) {
      mainIxs = _mainIxs;
      txMetadataResponse.mainInstructions = mainIxs.map(ix => {
        const accounts = ix.keys.map(meta => {
          return {
            pubkey: meta.pubkey.toString(),
            isSigner: meta.isSigner,
            isWritable: meta.isWritable,
          }
        });
        return {
          accounts,
          programId: ix.programId.toString(),
          data: ix.data.toString('base64'),
        }
      })
    }
    else {
      // Construct main instructions
      mainIxs = txMetadataResponse.mainInstructions.map((ix) => {
        return new web3.TransactionInstruction({
          keys: ix.accounts.map((meta) => {
            return {
              pubkey: new web3.PublicKey(meta.pubkey),
              isSigner: meta.isSigner,
              isWritable: meta.isWritable,
            };
          }),
          programId: new web3.PublicKey(ix.programId),
          data: Buffer.from(ix.data, "base64"),
        });
      });
    }

    this._instructions = [...mainIxs];
    const [txMessage, versionedTransaction] =
      this.buildTransaction(latestBlockhash);
    this._txMessage = txMessage;
    this._versionedTransaction = versionedTransaction;
    this.requiredSigners = this.getRequiredSigners();
  }

  /**
   * Signs the transaction with provided signers.
   *
   * @param signers Array of Signer objects whose private keys will be used to sign the transaction.
   * @param idempotent Boolean indicating whether signing should be idempotent (default is false).
   * @throws Error if a signer is not required or has already signed the transaction when not idempotent.
   */
  sign(signers: web3.Signer[], idempotent: boolean = false): void {
    // First validate all signers
    signers.forEach((signer) => {
      const key = signer.publicKey.toString();
      if (typeof this.requiredSigners[key] !== "boolean") {
        throw new Error(`Key ${key} is not a required signer!`);
      }
      if (!idempotent && this.requiredSigners[key]) {
        throw new Error(
          `Key ${key} has already been signed by required signer!`
        );
      }
    });

    // If all signers are valid and the process is idempotent or they haven't signed yet, update and sign
    signers.forEach((signer) => {
      const key = signer.publicKey.toString();
      this.requiredSigners[key] = true;
    });

    this.versionedTransaction.sign(signers);
  }

  /**
   * Add a signature on the transaction with provided signature.
   *
   * @param publicKey The public key of the signer
   * @param signature A signature of the signed transaction
   * @throws Error if a signer is not required or has already signed the transaction.
   */
  addSignature(publicKey: web3.PublicKey, signature: Uint8Array): void {
    const key = publicKey.toBase58();
    if (typeof this.requiredSigners[key] !== "boolean") {
      throw new Error(`Key ${key} is not a required signer!`);
    }
    if (this.requiredSigners[key]) {
      throw new Error(`Key ${key} has already been signed by required signer!`);
    }

    this.requiredSigners[key] = true;

    this.versionedTransaction.addSignature(publicKey, signature);
  }

  /**
   * Checks if all required signers have signed the transaction.
   *
   * @returns Boolean indicating whether all required signers have signed.
   */
  isSignedByRequiredSigners(): boolean {
    return Object.values(this.requiredSigners).every((isSigned) => isSigned);
  }

  /**
   * Add priority fee instructions (compute budget) with a fixed priority fee.
   *
   * This method adds priority fee instructions to the transaction based on a fixed priority fee.
   *
   * @param connection - The connection to the Solana cluster.
   * @param computeUnitLimit - The limit on the number of compute units.
   * @param fixedPriority - Set to true to indicate a fixed priority fee.
   * @param fixedPriorityFee - The fixed priority fee in lamports.
   * @returns An array of transaction instructions.
   */
  async addPriorityFeeIx(
    connection: web3.Connection,
    computeUnitLimit: number,
    fixedPriority: true,
    fixedPriorityFee: number,
  ): Promise<web3.TransactionInstruction[]>;

  /**
   * Add priority fee instructions (compute budget) with a variable priority defined by Helius.
   *
   * This method adds priority fee instructions to the transaction based on the specified
   * priority level and compute unit limit. It ensures that the total fee does not exceed
   * the specified maximum priority fee (in SOL) if provided.
   *
   * @param connection - The connection to the Solana cluster.
   * @param computeUnitLimit - The limit on the number of compute units.
   * @param fixedPriority - Set to false to indicate a variable priority fee.
   * @param priorityLevel - The priority level for the fee estimation.
   * @param maxPriorityFee - The maximum priority fee in SOL (optional).
   * @returns An array of transaction instructions.
   */
  async addPriorityFeeIx(
    connection: web3.Connection,
    computeUnitLimit: number,
    fixedPriority: false,
    priorityLevel: client.PriorityLevel,
    maxPriorityFee?: number,
  ): Promise<web3.TransactionInstruction[]>;

  /**
   * Add priority fee instructions (compute budget)
   *
   * This method adds priority fee instructions to the transaction based on the specified
   * priority level and compute unit limit. It ensures that the total fee does not exceed
   * the specified maximum priority fee (in SOL) if provided.
   *
   * @param connection - The connection to the Solana cluster.
   * @param computeUnitLimit - The limit on the number of compute units.
   * @param fixedPriority - If true, a fixed priority fee is used; if false, the fee is based on priority level.
   * @param priorityLevelOrPriorityFee - The priority level for the fee estimation or the fixed priority fee.
   * @param maxPriorityFee - The maximum priority fee in SOL (optional, only applicable when fixedPriority is false).
   * @returns An array of transaction instructions.
   */
  async addPriorityFeeIx(
    connection: web3.Connection,
    computeUnitLimit: number,
    fixedPriority: boolean = false,
    priorityLevelOrPriorityFee: client.PriorityLevel | number,
    maxPriorityFee?: number,
  ): Promise<web3.TransactionInstruction[]> {
    Log(`addPriorityFeeIx`);
    // First, remove any existing priority fee instructions
    this.removePriorityFeeIxs();

    let totalPriorityFeeLamports: number;

    if (fixedPriority && typeof priorityLevelOrPriorityFee === 'number') {
      // For fixed priority, directly use the provided fixed priority fee
      totalPriorityFeeLamports = priorityLevelOrPriorityFee - 5000;
    } else if (typeof priorityLevelOrPriorityFee === 'string') {
      // Convert maxPriorityFee from SOL to lamports (1 SOL = 1_000_000_000 lamports)
      const maxPriorityFeeLamports = maxPriorityFee !== undefined ? maxPriorityFee * 1_000_000_000 : undefined;

      // Get fee estimate by simulating the transaction
      const startTime = new Date().getTime() / 1000;
      Log(`addPriorityFeeIx: Starting getFeeEstimate function`);
      let estimate = await getFeeEstimate(
        this.generalUtility,
        priorityLevelOrPriorityFee,
        this.txMetadataResponse
      );
      Log(`addPriorityFeeIx: Starting getFeeEstimate function: Elapsed Time: ${(new Date().getTime() / 1000) - startTime}`);

      // If priority is set to default or medium, we multiply estimate by 2 to increase its chance on blockchain.
      if (priorityLevelOrPriorityFee === client.PriorityLevel.Default || priorityLevelOrPriorityFee === client.PriorityLevel.Medium) {
        estimate = estimate * 2
      }

      // Calculate the total fee in lamports
      totalPriorityFeeLamports = new BN(estimate).mul(new BN(computeUnitLimit)).div(new BN(1_000_000)).toNumber();

      // If maxPriorityFee is defined and it is less than the total calculated fee, cap it
      if (maxPriorityFeeLamports !== undefined && totalPriorityFeeLamports > maxPriorityFeeLamports) {
        totalPriorityFeeLamports = maxPriorityFeeLamports - 5000;
      }
    } else {
      throw new Error('Invalid parameters');
    }

    // Convert the total priority fee back to microLamports per compute unit
    const priorityFeePerUnitMicroLamports = new BN(totalPriorityFeeLamports).mul(new BN(1_000_000)).div(new BN(computeUnitLimit)).toNumber();

    // Create priority fee instructions for the transaction
    const priorityFeeIxs = [
      web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
      }),
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: priorityFeePerUnitMicroLamports,
      }),
    ];

    // Store the total priority fee in lamports
    this._priorityFeeEstimate = totalPriorityFeeLamports.toString();

    // Append priority fee instructions at the beginning
    this._instructions.unshift(...priorityFeeIxs);

    // Rebuild versioned transaction with the latest blockhash
    const blockhash = await connection.getLatestBlockhash();
    this.buildTransaction(blockhash);

    return priorityFeeIxs;
  }

  /**
   * Gets the compute unit limit from a transaction simulation.
   *
   * This function simulates a transaction and calculates the compute unit limit
   * based on the simulation results. If an additional compute limit is provided,
   * it is added to the units consumed in the simulation. Otherwise, the units
   * consumed are increased by 10%.
   *
   * @param {web3.Connection} connection - The connection object to the Solana cluster.
   * @param {number} [additionalComputeLimit] - Optional additional compute limit to add to the units consumed.
   * @returns {Promise<number>} - A promise that resolves to the total compute unit limit.
   * @throws {Error} - Throws an error if the transaction simulation fails.
   */
  async getComputeUnitLimit(
    connection: web3.Connection,
    additionalComputeLimit?: number
  ): Promise<number> {
    const simulation = await this.simulateTransaction(connection);
    if (simulation.err !== null) {
      if (simulation.logs === null) {
        Log(simulation.err);
      } else {
        for (const log of simulation.logs) {
          Log(log);
        }
      }
      throw new Error(`Transaction simulation error. See logs above.`);
    }
    const totalUnitLimit = additionalComputeLimit ? simulation.unitsConsumed + additionalComputeLimit : Math.round(simulation.unitsConsumed * 1.1);
    return totalUnitLimit;
  }


  /**
   * Simulate transaction
   *
   * @param connection
   * @returns
   */
  async simulateTransaction(
    connection: web3.Connection,
    signers: web3.Keypair[] = [],
  ): Promise<SimulatedTransactionResponse> {
    const testInstructions = [
      ...this.instructions,
    ]
    if (this.findSetComputeUnitLimitIndex(testInstructions) === -1) {
      testInstructions.unshift(web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }));
    }
    if (this.findSetComputeUnitPriceIndex(testInstructions) === -1) {
      testInstructions.unshift(
        web3.ComputeBudgetProgram.setComputeUnitPrice({
          // CU * CU PRICE -> 1400000 * feeEstimate.priorityFeeEstimate
          microLamports: 100_000,
        }),
      );
    }
    const testVersionedTxn = new web3.VersionedTransaction(
      new web3.TransactionMessage({
        instructions: testInstructions,
        payerKey: this.payerKey,
        recentBlockhash: web3.PublicKey.default.toString(),
      }).compileToV0Message(this.alts)
    );
    if (signers.length > 0) {
      testVersionedTxn.sign(signers);
    }
    const simulation = await connection.simulateTransaction(testVersionedTxn, {
      replaceRecentBlockhash: true,
      sigVerify: false,
    });
    if (simulation.value.unitsConsumed === undefined) {
      throw new Error("Unable to calculate compute budget.");
    }
    return {
      err: simulation.value.err,
      logs: simulation.value.logs,
      accounts: simulation.value.accounts,
      unitsConsumed: simulation.value.unitsConsumed,
      returnData: simulation.value.returnData,
    };
  }

  /**
   * Builds transaction object
   */
  buildTransaction(
    latestBlockhash: web3.BlockhashWithExpiryBlockHeight
  ): [web3.TransactionMessage, web3.VersionedTransaction] {
    this.latestBlockhash = latestBlockhash;
    this._txMessage = new web3.TransactionMessage({
      payerKey: this.payerKey,
      instructions: this.instructions,
      recentBlockhash: this.recentBlockhash,
    });

    this._versionedTransaction = new web3.VersionedTransaction(
      this.txMessage.compileToV0Message(this.alts)
    );
    return [this._txMessage, this._versionedTransaction];
  }

  /**
   * Gathers the public keys of all parties required to sign the transaction.
   *
   * @returns A record of signer public keys mapped to a boolean indicating whether they have signed.
   */
  private getRequiredSigners(): Record<string, boolean> {
    const signerKeys = this.instructions.flatMap((ix) =>
      ix.keys
        .filter((meta) => meta.isSigner)
        .map((meta) => meta.pubkey.toString())
    );
    const result: Record<string, boolean> = {};
    signerKeys.forEach((key) => (result[key] = false));
    return result;
  }

  /**
   * Find setComputeUnitLimit index within the instructions
   */
  private findSetComputeUnitLimitIndex(instructions?: web3.TransactionInstruction[]): number {
    let _instructions: web3.TransactionInstruction[] = [];
    if (instructions !== undefined) {
      _instructions = instructions;
    } else {
      _instructions = this.instructions;
    }
    return _instructions.findIndex((ix) => {
      const isComputeBudgetProgram =
        ix.programId.toString() ===
        "ComputeBudget111111111111111111111111111111";
      const isSetComputeLimitIx = ix.data[0] === 2;
      return isComputeBudgetProgram && isSetComputeLimitIx;
    });
  }

  /**
   * Find setComputeUnitPrice index within the instructions
   */
  private findSetComputeUnitPriceIndex(instructions?: web3.TransactionInstruction[]): number {
    let _instructions: web3.TransactionInstruction[] = [];
    if (instructions !== undefined) {
      _instructions = instructions;
    } else {
      _instructions = this.instructions;
    }
    return _instructions.findIndex((ix) => {
      const isComputeBudgetProgram =
        ix.programId.toString() ===
        "ComputeBudget111111111111111111111111111111";
      const isSetComputeUnitPriceIx = ix.data[0] === 3;
      return isComputeBudgetProgram && isSetComputeUnitPriceIx;
    });
  }

  /**
   * Remove priority fee instructions
   */
  private removePriorityFeeIxs() {
    while (true) {
      const setComputeUnitLimitIxIndex = this.findSetComputeUnitLimitIndex();
      const setComputeUnitPriceIxIndex = this.findSetComputeUnitPriceIndex();
      if (setComputeUnitLimitIxIndex !== -1)
        this._instructions.splice(setComputeUnitLimitIxIndex, 1);
      if (setComputeUnitPriceIxIndex !== -1)
        this._instructions.splice(setComputeUnitPriceIxIndex, 1);
      if (setComputeUnitLimitIxIndex && setComputeUnitPriceIxIndex) break;
    }
  }
}
