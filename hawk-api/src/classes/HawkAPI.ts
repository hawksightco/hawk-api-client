import { General } from "./General";
import { Health } from "./Health";
import { TxGenerator } from "./TxGenerator";
import { Util } from "./Util";
import { TxGeneratorAutomations } from "./TxGeneratorAutomations";
import { Client } from "./Client";

export class HawkAPI {
  public readonly health: Health;
  public readonly general: General;
  public readonly util: Util;
  public readonly txGenerator: TxGenerator;
  public readonly txGeneratorAutomation: TxGeneratorAutomations;
  constructor(
    protected readonly url: string = "https://api2.hawksight.co",
  ) {
    const client = new Client(url);
    this.health = new Health(client);
    this.general = new General(client);
    this.util = new Util(client);
    this.txGenerator = new TxGenerator(client);
    this.txGeneratorAutomation = new TxGeneratorAutomations(client);
  }
}