import * as client from "@hawksightco/swagger-client";

export class Client {
  public readonly config: client.Configuration;
  public readonly healthCheck: client.HealthCheckApi;
  public readonly generalEndpoints: client.GeneralEndpointsApi;
  public readonly meteoraDLMMUtilityFunctionsApi: client.MeteoraDLMMUtilityFunctionsApi;
  public readonly meteoraDLMMInstructionsApi: client.MeteoraDLMMInstructionsApi;
  public readonly meteoraDLMMAutomationInstructionsApi: client.MeteoraDLMMAutomationInstructionsApi;
  public readonly orcaUtilityFunctionsApi: client.OrcaUtilityFunctionsApi;
  public readonly orcaCLMMInstructionsApi: client.OrcaCLMMInstructionsApi;
  constructor(
    public readonly url: string = "https://api2.hawksight.co",
  ) {
    this.config = new client.Configuration({
      basePath: url
    });
    this.healthCheck = new client.HealthCheckApi(this.config);
    this.generalEndpoints = new client.GeneralEndpointsApi(this.config);
    this.meteoraDLMMUtilityFunctionsApi = new client.MeteoraDLMMUtilityFunctionsApi(this.config);
    this.meteoraDLMMInstructionsApi = new client.MeteoraDLMMInstructionsApi(this.config);
    this.meteoraDLMMAutomationInstructionsApi = new client.MeteoraDLMMAutomationInstructionsApi(this.config);
    this.orcaUtilityFunctionsApi = new client.OrcaUtilityFunctionsApi(this.config);
    this.orcaCLMMInstructionsApi = new client.OrcaCLMMInstructionsApi(this.config);
  }
}
