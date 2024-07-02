import { HealthResponse, ResponseWithStatus } from "../types";
import { Client } from "./Client";

/**
 * Provides health checking functionality for HawkSight's API services.
 * This class allows for simple verification of system health, ensuring that the underlying API and its services
 * are operational and accessible. It utilizes a dedicated `Client` instance to perform the health check operations.
 */
export class Health {
  /**
   * Constructs a Health instance with a specified client.
   * @param client A Client object configured to interact with the HawkSight API. This client handles
   *               the actual API calls to perform health checks.
   */
  constructor(
    private readonly client: Client,
  ) {}

  /**
   * Performs a health check on the HawkSight API.
   * This method queries the API's health check endpoint to determine the operational status of the system.
   * It is useful for monitoring and alert systems to ensure that API services are up and running smoothly.
   *
   * @returns A Promise that resolves to a `ResponseWithStatus<HealthResponse>` object containing:
   *          - `status`: The HTTP status code of the health check request.
   *          - `data`: The detailed health check response from the API, typically indicating various service statuses.
   *
   * Example of a health check response might include database connectivity status, API uptime, or other relevant system metrics.
   */
  async health(): Promise<ResponseWithStatus<HealthResponse>> {
    const result = await this.client.healthCheck.healthGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }
}
