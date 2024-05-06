import * as web3 from "@solana/web3.js";
import * as client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";

export class TxGeneratorAutomations {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraClaimFeeAndRewards(connection: web3.Connection, payer: string, params: client.AutomationClaimFeeAndRewardsAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationClaimFeeAndRewardsAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async meteoraFullWithdrawalAndClosePosition(connection: web3.Connection, payer: string, params: client.AutomationFullWithdrawAndClosePositionAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationFullWithdrawAndClosePositionAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }

  async meteoraCreatePositionAndDeposit(connection: web3.Connection, payer: string, params: client.AutomationCreatePositionAndDepositAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationCreatePositionAndDepositAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data),
    );
  }
}