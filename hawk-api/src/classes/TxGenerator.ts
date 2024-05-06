import * as web3 from "@solana/web3.js";
import * as client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";

export class TxGenerator {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraCreatePositionAndDeposit(connection: web3.Connection, payer: string, params: client.TxCreatePositionAndDepositBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxCreatePositionAndDepositPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data)
    );
  }

  async meteoraDeposit(connection: web3.Connection, payer: string, params: client.TxDepositBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxDepositPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async meteoraWithdraw(connection: web3.Connection, payer: string, params: client.TxWithdrawBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxWithdrawPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async meteoraClaim(connection: web3.Connection, payer: string, params: client.TxClaimBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClaimPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async meteoraClosePosition(connection: web3.Connection, payer: string, params: client.TxClosePositionBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClosePositionPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async orcaOpenPosition(connection: web3.Connection, payer: string, params: client.TxOpenPositionBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxOpenPositionPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async orcaClosePosition(connection: web3.Connection, payer: string, params: client.TxClosePositionBody1): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxClosePositionPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async orcaDeposit(connection: web3.Connection, payer: string, params: client.TxDepositBody1): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxDepositPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async orcaWithdraw(connection: web3.Connection, payer: string, params: client.TxWithdrawBody1): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxWithdrawPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async orcaClaimRewards(connection: web3.Connection, payer: string, params: client.TxClaimRewardsBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxClaimRewardsPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }
}