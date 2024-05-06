import { HealthResponse, ResponseWithStatus } from "../types";
import { Client } from "./Client";

export class Health {
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