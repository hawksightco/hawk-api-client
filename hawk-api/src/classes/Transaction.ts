import * as client from "@hawksightco/swagger-client";
import * as web3 from "@solana/web3.js";
import { BN } from "bn.js";
import { getFeeEstimate } from "../functions";
import {
  SimulatedTransactionResponse,
  TransactionMetadataResponse,
} from "../types";
import { GeneralUtility } from "./GeneralUtility";

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
    private generalUtility: GeneralUtility
  ) {
    // Construct main instructions
    const mainIxs = txMetadataResponse.mainInstructions.map((ix) => {
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
   * Add priority fee instructions (compute budget)
   */
  async addPriorityFeeIx(
    connection: web3.Connection,
    priorityLevel: client.PriorityLevel,
    computeUnitLimit: number,
    maxPriorityFee?: number
  ): Promise<web3.TransactionInstruction[]> {
    // First, remove priority fee instructions (compute budget if there is)
    this.removePriorityFeeIxs();

    // Then get fee estimate by simulating the transaction
    const estimate = await getFeeEstimate(
      this.generalUtility,
      priorityLevel,
      this.txMetadataResponse
    );
    const priorityFeeEstimate =
      maxPriorityFee !== undefined && maxPriorityFee > 0
        ? Math.round(Math.min(estimate, maxPriorityFee))
        : Math.round(estimate);

    // Create priority fee ixs for transaction
    const priorityFeeIxs = [
      web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
      }),
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        // CU * CU PRICE -> 1400000 * feeEstimate.priorityFeeEstimate
        microLamports: priorityFeeEstimate,
      }),
    ];
    this._priorityFeeEstimate = (
      new BN(priorityFeeEstimate)
        .mul(new BN(computeUnitLimit))
        .div(new BN(1_000_000))
        .add(new BN(5000))
        .toNumber() / 1_000_000_000
    ).toString();

    // Append priority fee instruction at the beginning
    this._instructions.unshift(...priorityFeeIxs);

    // Rebuild versioned transaction
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
        console.log(simulation.err);
      } else {
        for (const log of simulation.logs) {
          console.log(log);
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
    connection: web3.Connection
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
