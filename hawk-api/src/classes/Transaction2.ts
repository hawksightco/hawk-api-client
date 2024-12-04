import * as client from "@hawksightco/swagger-client";
import * as web3 from "@solana/web3.js";
import { BN } from "bn.js";
import { GeneralUtility } from "./GeneralUtility";
import { Transaction3, TransactionMetadataResponse } from "./Transaction3";
import { Log } from "./Logging";

export const DummyTransactionMetadataResponse: TransactionMetadataResponse = {
  description: '',
  estimatedFeeInSOL: '',
  addressLookupTableAddresses: [], // "alts" is confusing, copied jup's naming
  computeBudgetInstructions: [], // this enables for ease of access while also making them optional
  mainInstructions: [],
  payer: '',
  signature: '',
};

/**
 * Represents a transaction object in Solana using the web3.js library.
 * This class encapsulates the logic for creating, signing, and verifying signatures of transactions.
 */
export class Transaction2 extends Transaction3 {

  /**
   * Whether transaction has nonce advance instruction
   */
  readonly hasNonceAdvanceIx: boolean;

  /**
   * Fee estimate that can be overwritten
   */
  feeEstimate: number = 0;

  /**
   * Constructs a new Transaction object.
   *
   * @param payerKey PublicKey of the transaction payer
   * @param instructions Array of TransactionInstruction to be executed in this transaction
   * @param recentBlockhash The blockhash of a recent ledger entry
   * @param alts Address lookup tables that optimize account address storage
   */
  private constructor(
    readonly txMetadataResponse: TransactionMetadataResponse,
    readonly payerKey: web3.PublicKey,
    protected latestBlockhash: { blockhash: string, lastValidBlockHeight: number },
    readonly alts: web3.AddressLookupTableAccount[],
    protected generalUtility: GeneralUtility,
    _mainIxs: web3.TransactionInstruction[] = [],
  ) {
    super(
      txMetadataResponse,
      payerKey,
      latestBlockhash,
      alts,
      generalUtility,
      _mainIxs
    );
    const index = this.getNonceIndex();
    this.hasNonceAdvanceIx = index > -1;
  };

  static new(
    payerKey: web3.PublicKey,
    alts: web3.AddressLookupTableAccount[],
    generalUtility: GeneralUtility,
    _mainIxs: web3.TransactionInstruction[] = [],
    latestBlockhash: { blockhash: string, lastValidBlockHeight: number } = { blockhash: '', lastValidBlockHeight: 0 },
  ) {
    const instance = new Transaction2(
      DummyTransactionMetadataResponse,
      payerKey,
      latestBlockhash,
      alts,
      generalUtility,
      _mainIxs,
    );
    return instance;
  }

  /**
   * Generate nonde advance instruction (dummy instruction)
   */
  private nonceAdvanceIx(noncePubkey: web3.PublicKey): web3.TransactionInstruction {
    // Generate dummy nonce ix
    return web3.SystemProgram.nonceAdvance({
      /** Nonce account */
      noncePubkey,
      /** Public key of the nonce authority */
      authorizedPubkey: this.payerKey,
    });
  }

  /**
   * Get nonce index
   *
   * @returns
   */
  private getNonceIndex() {
    const referenceIx = this.nonceAdvanceIx(web3.Keypair.generate().publicKey);
    const index = this._instructions.findIndex(ix => {
      const isNonceAdvanceIx =
        ix.data.toString("base64") == referenceIx.data.toString("base64") &&
        ix.programId.toString() == referenceIx.programId.toString();
      return isNonceAdvanceIx;
    });
    return index;
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
      let estimate = this.feeEstimate;

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
    return priorityFeeIxs;
  }

  /**
   * Overwrite blockhash and rebuild transaction
   *
   * @param blockhash
   * @param lastValidBlockHeight
   */
  setBlockhash(blockhash: string | null, lastValidBlockHeight: number | null) {
    if (blockhash !== null) {
      this.latestBlockhash.blockhash = blockhash;
    }
    if (lastValidBlockHeight !== null) {
      this.latestBlockhash.lastValidBlockHeight = lastValidBlockHeight;
    }
    this.buildTransaction({
      blockhash: this.latestBlockhash.blockhash,
      lastValidBlockHeight: this.latestBlockhash.lastValidBlockHeight
    });
  }
}
