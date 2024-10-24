import * as web3 from "@solana/web3.js";
import { General } from "./General";
import { Health } from "./Health";
import { TxGenerator } from "./TxGenerator";
import { Util } from "./Util";
import { TxGeneratorAutomations } from "./TxGeneratorAutomations";
import { Client } from "./Client";
import { GeneralUtility } from "./GeneralUtility";
import { Search } from "./Search";
import { CreateTxMetadata } from "./CreateTxMetadata";
import { HawkApiOptions } from "../types";
import { SimpleIxGenerator } from "./SimpleIxGenerator";
import { TransactionBatchExecute, TransactionBatchExecuteParams } from "./TransactionBatchExecute";
import { Atomicity } from "./Atomicity";
import { JupiterAlts } from "./JupiterAlts";

/**
 * HawkAPI is a central gateway class that aggregates access to various functional modules
 * for interacting with HawkSight's blockchain APIs. This class initializes and exposes modules
 * that manage different aspects of the blockchain interactions such as general utilities,
 * transaction generation, health checks, and automation services.
 *
 * Each module connected through this class offers specialized APIs for different tasks,
 * making it easier to manage and use HawkSight's comprehensive blockchain features.
 */
export class HawkAPI {
  /** Swagger Client Instance. */
  private readonly client: Client;

  /** Health module to check system health and API connectivity. */
  public readonly health: Health;

  /** General module for basic blockchain operations like portfolio management, token information retrieval. */
  public readonly general: General;

  /** General utility endpoint */
  public readonly generalUtility: GeneralUtility;

  /** Util module for various utility functions that assist with blockchain interactions. */
  public readonly util: Util;

  /** TxGenerator module for creating and managing transactions on the blockchain. */
  private _txGenerator: TxGenerator;
  get txGenerator() { return this._txGenerator; }

  /** TxGeneratorAutomations module for automating and optimizing transaction creation processes. */
  public readonly txGeneratorAutomation: TxGeneratorAutomations;

  /** Search module (token search only for now...) */
  public readonly search: Search;

  /** Simple instruction generator */
  public readonly simpleIxGenerator: SimpleIxGenerator;

  /** Jupiter alts */
  public readonly jupAlts: JupiterAlts;

  /**
   * Initializes a new instance of the HawkAPI class with a specified API URL.
   * @param url The base URL for the HawkSight API services, defaulted to "https://api2.hawksight.co" if not specified.
   */
  constructor(
    protected readonly url: string = "https://api2.hawksight.co",
    protected readonly options?: HawkApiOptions,
  ) {
    const client = new Client(url);
    this.client = client;
    this.health = new Health(client);
    this.generalUtility = new GeneralUtility(client);
    this.general = new General(client, this.generalUtility);
    this.util = new Util(client);
    this._txGenerator = new TxGenerator(client, this.generalUtility);
    this.txGeneratorAutomation = new TxGeneratorAutomations(client, this.generalUtility);
    this.search = new Search(url);
    this.simpleIxGenerator = new SimpleIxGenerator();
    this.jupAlts = new JupiterAlts();

    // Load create tx metadata module
    if (this.options === undefined || !this.options!.disableTxMetadataLoad) {
      CreateTxMetadata.instance().load();
    }

    // Load search module
    if (this.options === undefined || !this.options!.disableTokenLoad) {
      this.search.load();
    }
  }

  /**
   * Override transaction generator
   *
   * @param txGenerator
   */
  overrideTxGenerator(builderFn: (client: Client, generalUtility: GeneralUtility) => TxGenerator) {
    this._txGenerator = builderFn(this.client, this.generalUtility);
  }

  /**
   * Create instance of TransactionBatchExecute class
   *
   * @param param
   */
  batchExecute({lookupTableAddresses, instructions, payer, connection, signers}: TransactionBatchExecuteParams) {
    return new TransactionBatchExecute(
      lookupTableAddresses,
      instructions,
      payer,
      connection,
      signers,
    );
  }

  /**
   * Create instance of Atomicity class
   *
   * @param param
   */
  atomicity({lookupTableAddresses, instructions, payer, connection, signers}: TransactionBatchExecuteParams) {
    return new Atomicity(
      lookupTableAddresses,
      instructions,
      payer,
      connection,
      signers,
      this.simpleIxGenerator,
    );
  }
}
