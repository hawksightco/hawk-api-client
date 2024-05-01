import * as client from "../../swagger-client";
import { HealthResponse, ResponseWithStatus, UserPortfolioOut } from "./types";

class Client {
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

class Health {
  constructor(
    private readonly client: Client,
  ) {}
  async health(): Promise<ResponseWithStatus<HealthResponse>> {
    const result = await this.client.healthCheck.healthGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }
}

class General {
  constructor(
    private readonly client: Client,
  ) {}

  async portfolio(
    params: {
      wallet: string,
      pool?: string,
    }
  ): Promise<ResponseWithStatus<UserPortfolioOut>> {
    const result = await this.client.generalEndpoints.portfolioGet(params.wallet, params.pool).catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    }
  }
  async pools(): Promise<ResponseWithStatus<client.InlineResponse2002[]>> {
    const result = await this.client.generalEndpoints.poolsGet();
    return {
      status: result.status,
      data: result.data,
    };
  }

  async tokens(): Promise<ResponseWithStatus<client.InlineResponse2003[]>> {
    const result = await this.client.generalEndpoints.tokensGet();
    return {
      status: result.status,
      data: result.data,
    };
  }

  async register(params: client.RegisterBody): Promise<ResponseWithStatus<client.InlineResponse2004>> {
    const result = await this.client.generalEndpoints.registerPost(params);
    return {
      status: result.status,
      data: result.data,
    };
  }
}

class Util {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraDlmmPools(): Promise<ResponseWithStatus<client.InlineResponse2005[]>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPoolsGet();
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
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilPositionsGet(params.wallet, params.pool);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async meteoraDlmmActiveBin(params: client.UtilActiveBinBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMUtilityFunctionsApi.meteoraDlmmUtilActiveBinPost(params);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async orcaClmmPools(): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaUtilityFunctionsApi.orcaUtilPoolsGet();
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
    return await this.client.orcaUtilityFunctionsApi.orcaUtilPositionsGet(params.wallet, params.pool);
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
    return await this.client.orcaUtilityFunctionsApi.orcaUtilGetPositionMintGet(params.position);
    return {
      status: result.status,
      data: result.data,
    };
  }
}

class TxGenerator {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraCreatePositionAndDeposit(params: client.TxCreatePositionAndDepositBody): Promise<ResponseWithStatus<any>> {
    return await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxCreatePositionAndDepositPost(params);
  }

  async meteoraDeposit(params: client.TxDepositBody): Promise<ResponseWithStatus<any>> {
    return await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxDepositPost(params);
  }

  async meteoraWithdraw(params: client.TxWithdrawBody): Promise<ResponseWithStatus<any>> {
    return await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxWithdrawPost(params);
  }

  async meteoraClaim(params: client.TxClaimBody): Promise<ResponseWithStatus<any>> {
    return await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClaimPost(params);
  }

  async meteoraClosePosition(params: client.TxClaimBody): Promise<ResponseWithStatus<any>> {
    return await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClosePositionPost(params);
  }

  async orcaOpenPosition(params: client.TxOpenPositionBody): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaCLMMInstructionsApi.orcaTxOpenPositionPost(params);
  }

  async orcaClosePosition(params: client.TxClosePositionBody1): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaCLMMInstructionsApi.orcaTxClosePositionPost(params);
  }

  async orcaDeposit(params: client.TxDepositBody1): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaCLMMInstructionsApi.orcaTxDepositPost(params);
  }

  async orcaWithdraw(params: client.TxWithdrawBody1): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaCLMMInstructionsApi.orcaTxWithdrawPost(params);
  }

  async orcaClaimRewards(params: client.TxClaimRewardsBody): Promise<ResponseWithStatus<any>> {
    return await this.client.orcaCLMMInstructionsApi.orcaTxClaimRewardsPost(params);
  }
}

class HawkAPI {
  public readonly health: Health;
  public readonly general: General;
  public readonly util: Util;
  public readonly txGenerator: TxGenerator;
  constructor(
    protected readonly url: string = "https://api2.hawksight.co",
  ) {
    const client = new Client(url);
    this.health = new Health(client);
    this.general = new General(client);
    this.util = new Util(client);
    this.txGenerator = new TxGenerator(client);
  }
}

export default HawkAPI;
