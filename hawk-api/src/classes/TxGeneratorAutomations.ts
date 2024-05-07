import * as web3 from "@solana/web3.js";
import * as client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse, TransactionPriority } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";

export class TxGeneratorAutomations {

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

  async meteoraClaimFeeAndRewards(connection: web3.Connection, payer: string, params: client.AutomationClaimFeeAndRewardsAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationClaimFeeAndRewardsAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data, this.priorityLevel, this.maxPriorityFee),
    );
  }

  async meteoraFullWithdrawalAndClosePosition(connection: web3.Connection, payer: string, params: client.AutomationFullWithdrawAndClosePositionAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationFullWithdrawAndClosePositionAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data, this.priorityLevel, this.maxPriorityFee),
    );
  }

  async meteoraCreatePositionAndDeposit(connection: web3.Connection, payer: string, params: client.AutomationCreatePositionAndDepositAutomationIxBody): Promise<ResponseWithStatus<TransactionMetadataResponse> | ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.meteoraDLMMAutomationInstructionsApi.meteoraDlmmAutomationCreatePositionAndDepositAutomationIxPost(params).catch(e => e.response);
    return resultOrError<TransactionMetadataResponse, TransactionMetadata>(
      {
        status: result.status,
        data: result.data,
      },
      async (data) => await createTxMetadata(connection, payer, data, this.priorityLevel, this.maxPriorityFee),
    );
  }
}