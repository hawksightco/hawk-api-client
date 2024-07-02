import { PriorityFeeEstimate, UtilGetPriorityFeeEstimateBody, UtilFindAltWithTxBody } from "@hawksightco/swagger-client";
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

  /**
   * Finds alternative public keys related to a given transaction and returns them along with the response status.
   *
   * This method sends a request to the `utilFindAltWithTxPost` endpoint with the provided parameters, and returns the response
   * status and an array of public key strings. In case of an error, it captures the error response and includes the status and
   * data in the returned object.
   *
   * @param {UtilFindAltWithTxBody} params - The parameters for the function, which include the transaction metadata.
   * @returns {Promise<ResponseWithStatus<Array<string>>>>} A promise that resolves to an object containing the response status and an array of public key strings.
   */
  async findAltWithTxPost(params: UtilFindAltWithTxBody): Promise<ResponseWithStatus<Array<string>>> {
    const result = await this.client.generalUtility.utilFindAltWithTxPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }
}
