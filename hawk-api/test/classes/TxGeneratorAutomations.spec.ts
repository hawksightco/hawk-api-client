import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

const TIMEOUT = 60_000;

describe('TxGenerationAutomations: Test meteoraRebalanceIxs', () => {
  it('Generate iyfMain.jupiterRouteIx instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate instruction
    const ixs = await hawkAPI.txGeneratorAutomation.meteoraRebalanceIxs(
      connection,
      web3.SystemProgram.programId.toString(),
      {
        userWallet: new web3.PublicKey('Bqi9BrkuyJcLSY97MEHnfJrR262EwpdFVh5MCmqTCGb1'),
        currentPosition: new web3.PublicKey('AHWseGqByDhcaAzJ6iZp3F1jauqUVTBRFeDqF7tWX28H'),
        newPosition: web3.Keypair.generate().publicKey,
        binRange: {
          lowerRange: 1650,
          upperRange: 1640,
        },
        distribution: "SPOT",
      }
    )

    console.log(ixs);
  }, TIMEOUT);
});
