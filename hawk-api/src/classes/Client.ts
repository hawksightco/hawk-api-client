import * as client from "@hawksightco/swagger-client";

/**
 * The Client class serves as the central configuration point for all HawkSight API interactions.
 * It encapsulates the setup of the API's configuration and initializes various sub-APIs to manage different
 * aspects of the HawkSight services. These sub-APIs include health checks, general endpoints, and specific
 * functionalities for different decentralized market making solutions like Meteora and Orca.
 */
export class Client {
  /** Configuration object for the HawkSight API, setting the base path and other necessary settings. */
  public readonly config: client.Configuration;

  /** API accessor for health check operations to monitor the availability and status of the HawkSight API. */
  public readonly healthCheck: client.HealthCheckApi;

  /** API accessor for general endpoints, which include various utility functions that are broadly applicable. */
  public readonly generalEndpoints: client.GeneralEndpointsApi;

  /** API accessor for general utility */
  public readonly generalUtility: client.GeneralUtilityEndpointsApi;

  /** API accessor for utility functions specifically tailored for Meteora Decentralized Liquidity Market Maker (DLMM) operations. */
  public readonly meteoraDLMMUtilityFunctionsApi: client.MeteoraDLMMUtilityFunctionsApi;

  /** API accessor for instructional functions related to Meteora DLMM, handling specific transaction instructions. */
  public readonly meteoraDLMMInstructionsApi: client.MeteoraDLMMInstructionsApi;

  /** API accessor for automation instructions within Meteora DLMM, supporting automated transaction processes. */
  public readonly meteoraDLMMAutomationInstructionsApi: client.MeteoraDLMMAutomationInstructionsApi;

  /** API accessor for utility functions tailored for Orca's Concentrated Liquidity Market Maker (CLMM) operations. */
  public readonly orcaUtilityFunctionsApi: client.OrcaUtilityFunctionsApi;

  /** API accessor for instructional functions related to Orca CLMM, managing specific trading and liquidity strategies. */
  public readonly orcaCLMMInstructionsApi: client.OrcaCLMMInstructionsApi;

  /**
   * Constructs a new Client object with a specified API URL.
   * @param url The base URL for the HawkSight API, defaulting to "https://api2.hawksight.co" if not specified.
   * This URL is used to configure the path for all API calls made through this client.
   */
  constructor(
    public readonly url: string = "https://api2.hawksight.co",
  ) {
    this.config = new client.Configuration({
      basePath: url
    });
    // Initialization of all API accessors with the configured base path.
    this.healthCheck = new client.HealthCheckApi(this.config);
    this.generalEndpoints = new client.GeneralEndpointsApi(this.config);
    this.generalUtility = new client.GeneralUtilityEndpointsApi(this.config);
    this.meteoraDLMMUtilityFunctionsApi = new client.MeteoraDLMMUtilityFunctionsApi(this.config);
    this.meteoraDLMMInstructionsApi = new client.MeteoraDLMMInstructionsApi(this.config);
    this.meteoraDLMMAutomationInstructionsApi = new client.MeteoraDLMMAutomationInstructionsApi(this.config);
    this.orcaUtilityFunctionsApi = new client.OrcaUtilityFunctionsApi(this.config);
    this.orcaCLMMInstructionsApi = new client.OrcaCLMMInstructionsApi(this.config);
  }
}
