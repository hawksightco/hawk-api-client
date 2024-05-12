import { PriorityFeeEstimate, UtilGetPriorityFeeEstimateBody } from "@hawksightco/swagger-client";
import { ResponseWithStatus } from "../types";
import { Client } from "./Client";

/**
 * Provides general utilities related to blockchain fee estimates.
 * 
 * This class handles operations related to fetching priority fee estimates 
 * for transactions on the blockchain. It leverages a client provided during 
 * instantiation to make HTTP requests to the required endpoint.
 */
export class GeneralUtility {

  /**
   * Creates an instance of the GeneralUtility class.
   * 
   * @param client The client instance used for making HTTP requests.
   */
  constructor(
    private readonly client: Client,
  ) {}

  /**
   * Fetches the priority fee estimate based on the provided parameters.
   * 
   * This method communicates with an HTTP client to retrieve the priority fee estimate
   * for a transaction. It uses the `utilGetPriorityFeeEstimatePost` method of the client.
   * The result is processed to fit a standardized response structure.
   *
   * @param params The parameters required to fetch the priority fee estimate, including 
   *               details like the transaction type and network.
   * @returns A Promise resolving to an object containing the status code and data of 
   *          the priority fee estimate.
   * @throws Captures and returns any errors encountered during the API call.
   */
  async getPriorityFeeEstimate(params: UtilGetPriorityFeeEstimateBody): Promise<ResponseWithStatus<PriorityFeeEstimate>> {
    const result = await this.client.generalUtility.utilGetPriorityFeeEstimatePost(params).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }
}
