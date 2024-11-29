import * as web3 from "@solana/web3.js";
import { TransactionMetadata, TransactionMetadataResponse } from "../types";
import { Transaction } from "./Transaction";
import { GeneralUtility } from "./GeneralUtility";
import { Log } from "./Logging";

/**
 * The CreateTxMetadata class is responsible for creating and managing transaction metadata,
 * including handling address lookup tables and constructing transactions with the necessary parameters.
 */
export class CreateTxMetadata {

  private constructor() {};

  private connection?: web3.Connection;

  /**
   * Sets the connection to the Solana blockchain.
   *
   * @param connection - The Solana blockchain connection object.
   */
  setConnection(connection: web3.Connection) { this.connection = connection; }

  private static _instance: CreateTxMetadata;

  /**
   * Gets the singleton instance of the CreateTxMetadata class.
   *
   * @returns The singleton instance of CreateTxMetadata.
   */
  static instance(): CreateTxMetadata {
    if (this._instance === undefined) {
      this._instance = new CreateTxMetadata();
    }
    return this._instance;
  }

  private alts: Record<string, web3.AddressLookupTableAccount | null> = {
    "AC3t5k5PUTJirxGEHgGGQStafu1vXkvddPyqVNDrRQDt": null,
    "F2gRaSdfWYucAMAKv3CHReKMHvPkE3sNWrQPPPPR6UMV": null,
    "FQHdXaRjfKxEfqDXMs6L1gfx2wwa6idDVB8hdQuf6eSD": null,
    "4vMQAkkjhxrgJmqbRd4Z9YP9K7WFVAhHZn4jTJoN45Qj": null,
    "6KhzJ2cs85hKdLeUXS6QjQnygUY9rFUnJADJwrYp9mjM": null,
    "4UgEL5PQVu9MSarh8yb7U22GEZQoSkmNM3w7mZFx47aL": null,
    "5FrgBCVUtwD1cFw39PZxnUsBaAecZVxmaYEcvv6y7b1h": null,
    "FJ76CVMrHBxQxLcQkKdh9YBpwZuECsPjBLJWphwS34XF": null,
    "Fgxms1gyzwhF1L3pJSoAxrNkogbg9sqct7U1z6HfLv5A": null,
    "7vaSmpacdSv7vDjpGhBfZf3rLXjsfDkY6A12JkbNqK5Q": null,
    "AEAMg38ZiQHanFqFiYBQSqsmqyUHj66LZXQzEaD8YJxc": null,
    "4gitar8xUmh2wJoY6tP6f2rbyoBWRnY6RJmMK1BLUtjh": null,
  };

  /**
   * Loads the address lookup tables.
   */
  async load() {
    await this.updateAlts();
  }

  /**
   * Updates the address lookup tables by fetching their latest state from the Solana blockchain.
   */
  async updateAlts() {
    if (!!this.connection) {
      for (const alt in this.alts) {
        this.alts[alt] = (await this.connection.getAddressLookupTable(new web3.PublicKey(alt))).value;
      }
      return;
    }
    setTimeout(async () => await this.updateAlts(), 1000); // Update until done
  }

  /**
   * Loads a single address lookup table account.
   *
   * @param alt - The address lookup table account address as a string.
   * @param connection - (Optional) A specific Solana blockchain connection object to use.
   * @returns A promise that resolves to the address lookup table account.
   * @throws Error if the address lookup table does not exist.
   */
  async loadSingleAlt(alt: string, connection?: web3.Connection): Promise<web3.AddressLookupTableAccount> {
    if (!!connection) {
      this.alts[alt] = (await connection.getAddressLookupTable(new web3.PublicKey(alt))).value;
    } else if (!!this.connection) {
      this.alts[alt] = (await this.connection.getAddressLookupTable(new web3.PublicKey(alt))).value;
    }
    const result = this.alts[alt];
    if (!!result) {
      return result;
    } else {
      throw new Error(`ALT ${alt} does not exist`);
    }
  }

  /**
   * Gets an address lookup table account.
   *
   * @param alt - The address lookup table account address as a string.
   * @returns A promise that resolves to the address lookup table account or null if it does not exist.
   */
  async getAlt(alt: string): Promise<web3.AddressLookupTableAccount | null> {
    return this.alts[alt];
  }

  /**
   * Store address lookup table in the object
   *
   * @param alt
   * @param account
   */
  storeAlt(alt: string, account: web3.AddressLookupTableAccount) {
    this.alts[alt] = account;
  }

  /**
   * String to address lookup table. Can input multiple address lookup table addresses
   *
   * @param connection
   * @param alts
   * @returns
   */
  async stringToAlt(
    alts: string[]
  ): Promise<web3.AddressLookupTableAccount[]> {
    const _alts: web3.AddressLookupTableAccount[] = [];
    const notExist: number[] = [];
    alts.map((key, index) => {
      const alt = this.alts[key];
      if (!!alt) {
        _alts.push(alt);
      } else {
        notExist.push(index);
      }
    });
    if (notExist.length === 0) {
      return _alts;
    }
    const pubkeys: web3.PublicKey[] = notExist.map(index => new web3.PublicKey(alts[index]));
    const accountInfos = await this.connection!.getMultipleAccountsInfo(pubkeys);
    for (let i = 0; i < accountInfos.length; i++) {
      const key = pubkeys[i].toString();
      const alt = new web3.AddressLookupTableAccount({
        key: pubkeys[i],
        state: web3.AddressLookupTableAccount.deserialize(accountInfos[i]!.data)
      });
      this.alts[key] = alt;
      _alts.push(alt);
    }
    return _alts;
  }

  /**
   * Asynchronously creates transaction metadata based on the provided transaction parameters and network state.
   * This includes constructing a transaction with given instructions, calculating fees, and optionally handling priority fees.
   *
   * @param generalUtility - The utility object for general helper functions.
   * @param connection - The active Solana blockchain connection used to fetch state and simulate the transaction.
   * @param payer - The public key (as a string) of the payer for the transaction, responsible for fees.
   * @param data - An object containing necessary information to construct the transaction, such as:
   *        - addressLookupTableAddresses: Array of addresses for lookup tables.
   *        - computeBudgetInstructions: Array of instructions for setting compute budget.
   *        - description: Description of the transaction.
   *        - estimatedFeeInSOL: Estimated fee in SOL units.
   * @returns A promise resolving to an object containing the transaction metadata including the description,
   *          estimated fee, and the transaction object itself.
   * @throws Error if there is an issue in constructing the transaction or during simulation which includes logs of errors.
   */
  async createTxMetadata(
    generalUtility: GeneralUtility,
    connection: web3.Connection,
    payer: string,
    data: TransactionMetadataResponse,
  ): Promise<TransactionMetadata> {
    // Retrieve address lookup table accounts
    const alts: web3.AddressLookupTableAccount[] = [];
    Log(`createTxMetadata`);
    const mainStartTime = new Date().getTime() / 1000;

    // Find jup alts
    let startTime = mainStartTime;
    const jupAlts = await generalUtility.findAltWithTxPost({ transaction: data });
    Log(`createTxMetadata: Checkpoint: (jupAlts) ${(new Date().getTime() / 1000) - startTime}`);

    startTime = new Date().getTime() / 1000;
    for (const alt of data.addressLookupTableAddresses) {
      const _alt = await this.getAlt(alt);
      if (!!_alt) {
        alts.push(_alt);
      } else {
        alts.push(await this.loadSingleAlt(alt, connection));
      }
    }

    if (jupAlts.status === 200) {
      for (const alt of jupAlts.data) {
        const _alt = await this.getAlt(alt);
        if (!!_alt) {
          alts.push(_alt);
        } else {
          alts.push(await this.loadSingleAlt(alt, connection));
        }
      }
    } else {
      console.error(jupAlts.data);
    }
    Log(`createTxMetadata: Checkpoint: (jupAlts after loop) ${(new Date().getTime() / 1000) - startTime}`);

    // Get the recent blockhash
    startTime = new Date().getTime() / 1000;
    const latestBlockhash = await connection.getLatestBlockhash();
    Log(`createTxMetadata: Checkpoint: (latestBlockhash) ${(new Date().getTime() / 1000) - startTime}`);

    // Create initial transaction instance
    const transaction = new Transaction(
      data,
      new web3.PublicKey(payer),
      latestBlockhash,
      alts,
      generalUtility,
    );
    Log(`createTxMetadata: Elapsed time: ${(new Date().getTime() / 1000) - mainStartTime}`);

    // Return transaction metadata
    return {
      description: data.description,
      estimatedFeeInSOL: data.estimatedFeeInSOL,
      transaction,
    };
  }
}
