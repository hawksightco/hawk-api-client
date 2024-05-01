import * as web3 from "@solana/web3.js";
import * as client from "../../swagger-client";
import { HealthResponse, ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse, UserPortfolioOut } from "./types";

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
    const result = await this.client.generalEndpoints.poolsGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async tokens(): Promise<ResponseWithStatus<client.InlineResponse2003[]>> {
    const result = await this.client.generalEndpoints.tokensGet().catch(e => e.response);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async register(connection: web3.Connection, payer: web3.PublicKey, params: client.RegisterBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    const result = await this.client.generalEndpoints.registerPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }
}

class Util {
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

  async meteoraDlmmActiveBin(params: client.UtilActiveBinBody): Promise<ResponseWithStatus<any>> {
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

class TxGenerator {
  constructor(
    private readonly client: Client,
  ) {}

  async meteoraCreatePositionAndDeposit(connection: web3.Connection, payer: web3.PublicKey, params: client.TxCreatePositionAndDepositBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxCreatePositionAndDepositPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async meteoraDeposit(connection: web3.Connection, payer: web3.PublicKey, params: client.TxDepositBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxDepositPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async meteoraWithdraw(connection: web3.Connection, payer: web3.PublicKey, params: client.TxWithdrawBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxWithdrawPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async meteoraClaim(connection: web3.Connection, payer: web3.PublicKey, params: client.TxClaimBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClaimPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async meteoraClosePosition(connection: web3.Connection, payer: web3.PublicKey, params: client.TxClaimBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.meteoraDLMMInstructionsApi.meteoraDlmmTxClosePositionPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async orcaOpenPosition(connection: web3.Connection, payer: web3.PublicKey, params: client.TxOpenPositionBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxOpenPositionPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async orcaClosePosition(connection: web3.Connection, payer: web3.PublicKey, params: client.TxClosePositionBody1): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxClosePositionPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async orcaDeposit(connection: web3.Connection, payer: web3.PublicKey, params: client.TxDepositBody1): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxDepositPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async orcaWithdraw(connection: web3.Connection, payer: web3.PublicKey, params: client.TxWithdrawBody1): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxWithdrawPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
  }

  async orcaClaimRewards(connection: web3.Connection, payer: web3.PublicKey, params: client.TxClaimRewardsBody): Promise<ResponseWithStatus<any>> {
    const result = await this.client.orcaCLMMInstructionsApi.orcaTxClaimRewardsPost(params).catch(e => e.response);
    return {
      status: result.status,
      data: await createTxMetadata(connection, payer, result.data),
    };
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

async function createTxMetadata(connection: web3.Connection, payerKey: web3.PublicKey, data: TransactionMetadataResponse): Promise<TransactionMetadata> {
  const alts: web3.AddressLookupTableAccount[] = [];
  for (const alt of data.addressLookupTableAddresses) {
    alts.push(
      (await connection.getAddressLookupTable(new web3.PublicKey(alt))).value as web3.AddressLookupTableAccount
    );
  }
  const computeIxs = data.computeBudgetInstructions.map(ix => {
    return new web3.TransactionInstruction({
      keys: ix.accounts.map(meta => {
        return { pubkey: new web3.PublicKey(meta.pubkey), isSigner: meta.isSigner, isWritable: meta.isWritable };
      }),
      programId: new web3.PublicKey(ix.programId),
      data: Buffer.from(ix.data, 'base64'),
    });
  });
  const mainIxs = data.computeBudgetInstructions.map(ix => {
    return new web3.TransactionInstruction({
      keys: ix.accounts.map(meta => {
        return { pubkey: new web3.PublicKey(meta.pubkey), isSigner: meta.isSigner, isWritable: meta.isWritable };
      }),
      programId: new web3.PublicKey(ix.programId),
      data: Buffer.from(ix.data, 'base64'),
    });
  });
  const { blockhash: recentBlockhash } = await connection.getLatestBlockhash();
  const txMessage = new web3.TransactionMessage({
    payerKey,
    instructions: [...computeIxs, ...mainIxs],
    recentBlockhash,
  });
  const tx = new web3.VersionedTransaction(txMessage.compileToV0Message(alts));
  return {
    description: data.description,
    estimatedFeeInSOL: data.estimatedFeeInSOL,
    transaction: tx.serialize(),
  }
}
