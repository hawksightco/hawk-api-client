import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { BN } from "bn.js";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

const TIMEOUT = 60_000;

describe('TxGenerationAutomations: Test orcaDeposit ix', () => {
  it('Dummy test', async () => {
    expect(false).toBe(false);
  }, TIMEOUT);

  it('Generate hawkAPI.txGenerator.orcaDeposit instruction', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    const result = await hawkAPI.txGenerator.orcaDeposit(
      connection, web3.SystemProgram.programId.toString(),
      {
        userWallet: web3.SystemProgram.programId,
        positionMint: web3.SystemProgram.programId,
        totalXAmount: new BN(1_000_000),
        totalYAmount: new BN(1_000_000),
        newPosition: {
          whirlpool: new web3.PublicKey('Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE'),
          tickLowerIndex: 1_000,
          tickUpperIndex: 1_000,
        },
      }
    );

    console.log(result);
  }, TIMEOUT);
});
