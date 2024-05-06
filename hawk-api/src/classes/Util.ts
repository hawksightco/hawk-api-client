import * as client from "@hawksightco/swagger-client";
import { MeteoraDlmmActiveBin, ResponseWithStatus } from "../types";
import { Client } from "./Client";

export class Util {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraDlmmPools(): Promise<ResponseWithStatus<client.InlineResponse2005[]>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPoolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async meteoraDlmmPositions(
    params: {
      wallet: string,
      pool?: string,
    }
  ): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPositionsGet(params.wallet, params.pool).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async meteoraDlmmActiveBin(params: client.UtilActiveBinBody): Promise<ResponseWithStatus<MeteoraDlmmActiveBin>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilActiveBinPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async orcaClmmPools(): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaUtilityFunctionsApi.orcaUtilPoolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async orcaPositions(
    params: {
      wallet: string,
      pool?: string,
    }
  ): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaUtilityFunctionsApi.orcaUtilPositionsGet(params.wallet, params.pool).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async orcaGetPositionMint(
    params: {
      position: string,
    }
  ): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaUtilityFunctionsApi.orcaUtilGetPositionMintGet(params.position).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }
}