import * as web3 from "@solana/web3.js";
import * as client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse, TransactionPriority, UserPortfolioOut } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";

export class General {

  protected priorityLevel: TransactionPriority;
  protected maxPriorityFee: number;

  constructor(
    private readonly client: Client,
  ) {
    // Set default priority level and fee
    this.priorityLevel = "Default";
    this.maxPriorityFee = 500_000
  }

  setPriorityLevel(priorityLevel: TransactionPriority) {
    this.priorityLevel = priorityLevel;
  }

  setMaxPriorityFee(maxPriorityFee: number) {
    this.maxPriorityFee = maxPriorityFee;
  }


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
  async pools(): Promise<ResponseWithStatus<client.InlineResponse2002[]>> {
    const result = await this.client.generalEndpoints.poolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async tokens(): Promise<ResponseWithStatus<client.InlineResponse2003[]>> {
    const result = await this.client.generalEndpoints.tokensGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async register(connection: web3.Connection, payer: string, params: client.RegisterBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.generalEndpoints.registerPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data, this.priorityLevel, this.maxPriorityFee),
    );
  }
}