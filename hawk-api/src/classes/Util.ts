import * as client from "@hawksightco/swagger-client";
import { MeteoraDlmmActiveBin, ResponseWithStatus, UserPortfolio } from "../types";
import { Client } from "./Client";

/**
 * Provides utility functions for interacting with the Meteora DLMM and Orca CLMM subsystems of the HawkSight API.
 * This class enables fetching and manipulating data related to pools, positions, and other transaction-related information.
 */
export class Util {
  /**
   * Initializes a new instance of the Util class.
   *
   * @param client The Client object through which API calls will be made.
   */
  constructor(
    private readonly client: Client,
  ) {}

  /**
   * Retrieves a list of pools managed by Meteora DLMM.
   *
   * @returns A Promise resolving to a response object containing the status and array of pool information.
   */
  async meteoraDlmmPools(): Promise<ResponseWithStatus<client.InlineResponse2003[]>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPoolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Fetches positions held in Meteora DLMM pools, optionally filtered by a specific pool.
   *
   * @param params An object containing wallet address and an optional pool identifier.
   * @returns A Promise resolving to a response object with the status and data of positions.
   */
  async meteoraDlmmPositions(
    params: {
      wallet: string,
      pool?: string,
    }
  ): Promise<ResponseWithStatus<UserPortfolio>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPositionsGet(params.wallet, params.pool).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Retrieves the active bin data for a specific set of parameters in Meteora DLMM.
   *
   * @param params The parameters required to define the active bin query.
   * @returns A Promise resolving to a response with the status and data of the active bin.
   */
  async meteoraDlmmActiveBin(params: client.UtilActiveBinBody): Promise<ResponseWithStatus<MeteoraDlmmActiveBin>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilActiveBinPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Retrieves a list of pools managed by Orca CLMM.
   *
   * @returns A Promise resolving to a response object containing the status and array of pool information.
   */
  async orcaClmmPools(): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaUtilityFunctionsApi.orcaUtilPoolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  /**
   * Fetches positions held in Orca CLMM pools, optionally filtered by a specific pool.
   *
   * @param params An object containing wallet address and an optional pool identifier.
   * @returns A Promise resolving to a response object with the status and data of positions.
   */
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

  /**
   * Retrieves the mint information of a specific position managed by Orca CLMM.
   *
   * @param params An object containing the identifier of the position.
   * @returns A Promise resolving to a response object with the status and mint details of the position.
   */
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
