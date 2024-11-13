import * as web3 from "@solana/web3.js";
import { SimpleIxGenerator } from "../../src/classes/SimpleIxGenerator";
import { generateUserPda, sighashMatch } from "../../src/functions";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { JupiterAlts } from "../../src/classes/JupiterAlts";
import { IYF_EXTENSION, IYF_MAIN, USDC_FARM, STABLEMINT_1 } from '../../src/addresses';

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

describe('IyfExtensionIxGenerator', () => {

  it('Generate iyfMain.iyfExtensionExecute instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;
    const userPda = generateUserPda(userWallet);

    const ix = await hawkAPI.ix.iyfExtension.moveTokenIx({
      connection,
      userWallet,
      mint: STABLEMINT_1,
      useSourceAmount: true,
    })
  });
});
