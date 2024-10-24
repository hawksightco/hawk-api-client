import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { JupiterAlts } from "../../src/classes/JupiterAlts";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

describe('JupiterAlts', () => {
  it('Be able to create new instance of JupiterAlts without error', async () => {
    new JupiterAlts();
  });

  it('Should throw an error if URL is not set', async () => {
    const hawkApi = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
    let thrownError = false;
    try {
      await hawkApi.jupAlts.downloadAlts();
    } catch {
      thrownError = true;
    }
    expect(thrownError).toBe(true);
  });

  it('Should throw an error if credential is not set', async () => {
    const hawkApi = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
    hawkApi.jupAlts.setApiUrl(`${process.env.WORKER_URL}/jupiterAlts`);
    let thrownError = false;
    try {
      await hawkApi.jupAlts.downloadAlts();
    } catch {
      thrownError = true;
    }
    expect(thrownError).toBe(true);
  });

  it('Be able to download alts from Jupiter', async () => {
    const hawkApi = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
    hawkApi.jupAlts.setApiUrl(`${process.env.WORKER_URL}/jupiterAlts`);
    hawkApi.jupAlts.setCredentials(
      process.env.WORKER_USERNAME as string,
      process.env.WORKER_PASSWORD as string,
    );
    await hawkApi.jupAlts.downloadAlts();
    for (const key in hawkApi.jupAlts.alts) {
      // Expect valid public keys (will throw error if invalid)
      new web3.PublicKey(key);
      new web3.PublicKey(hawkApi.jupAlts.alts[key]);
    }
  });
});
