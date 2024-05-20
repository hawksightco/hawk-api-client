import * as web3 from "@solana/web3.js";
import * as _client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse, TransactionPriority, UserPortfolioOut } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";
import { GeneralUtility } from "./GeneralUtility";

/**
 * Provides general utility functions for managing and querying blockchain-related data,
 * handling transactions, and interfacing with a specific blockchain network via the client API.
 * This class serves as an abstraction layer to interact with various blockchain operations
 * such as registering new entities, retrieving portfolio information, and more.
 */
export class General {

  /** The priority level for transactions, influencing transaction fee calculation and processing priority. */
  protected priorityLevel: _client.PriorityLevel;

  /** The maximum priority fee to be included in transaction fee calculations, specified in lamports. */
  protected maxPriorityFee: number;

  /**
   * Constructs a new instance of the General class.
   * @param client The Client object providing network access and API functionality.
   */
  constructor(
    private readonly client: Client,
    private readonly generalUtility: GeneralUtility,
    ) {
    // Initialize with default values for transaction priority and fees.
    this.priorityLevel = _client.PriorityLevel.Default;
    this.maxPriorityFee = 500_000;
  }

  /**
   * Sets the transaction priority level, which may affect the processing speed and fees.
   *
   * @param priorityLevel The desired priority level for upcoming transactions.
   */
  setPriorityLevel(priorityLevel: _client.PriorityLevel) {
    this.priorityLevel = priorityLevel;
  }

  /**
   * Sets the maximum priority fee for transactions, which is the additional fee to speed up transaction processing.
   *
   * @param maxPriorityFee The fee in lamports.
   */
  setMaxPriorityFee(maxPriorityFee: number) {
    this.maxPriorityFee = maxPriorityFee;
  }

  /**
   * Retrieves the portfolio information for a specified wallet and optionally a pool.
   *
   * @param params Object containing wallet address and optional pool identifier.
   * @returns A Promise resolving to the portfolio information including assets and balances.
   */
  async portfolio(
    params: {
      wallet: string,
      pool?: string,
    }
  ): Promise<ResponseWithStatus<UserPortfolioOut>> {
    const result = await this.client.generalEndpoints.portfolioGet(params.wallet, params.pool).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    }
  }

  /**
   * Fetches a list of pools managed by the platform, providing details about each pool.
   *
   * @returns A Promise resolving to an array of pools, including metadata such as pool addresses and statistics.
   */
  async pools(): Promise<ResponseWithStatus<_client.InlineResponse2002[]>> {
    const result = await this.client.generalEndpoints.poolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Retrieves information about the available tokens on the platform.
   *
   * @returns A Promise resolving to an array of token details, including names, symbols, and other token-specific information.
   */
  async tokens(): Promise<ResponseWithStatus<_client.InlineResponse2003[]>> {
    const result = await this.client.generalEndpoints.tokensGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Registers a new entity or user with the necessary parameters, handling transaction creation and response.
   *
   * @param connection A Solana web3 connection for interacting with the blockchain.
   * @param payer The public key of the payer, responsible for transaction fees.
   * @param params Registration parameters required by the API.
   * @returns A Promise resolving to the transaction metadata or an error response, depending on the outcome of the registration.
   */
  async register(connection: web3.Connection, payer: string, params: _client.RegisterBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.generalEndpoints.registerPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(this.generalUtility, connection, payer, data, this.priorityLevel, this.maxPriorityFee),
    );
  }
}
