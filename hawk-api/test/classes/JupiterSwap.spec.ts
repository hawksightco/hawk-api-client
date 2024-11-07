import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

describe('SimpleIxGenerator: Jupiter Route IX Tests', () => {
  it('Generate iyfMain.jupiterRouteIx instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate instruction
    await hawkAPI.jupiterSwap.jupiterIxToHawksight({
      connection,
      swapInstruction: new web3.TransactionInstruction({
        programId: web3.SystemProgram.programId,
        keys: new Array(20).fill({ pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false }),
        data: Buffer.from([
          0xe5, 0x17, 0xcb, 0x97, 0x7a, 0xe3, 0xad, 0x2a, 0x01, 0x00, 0x00, 0x00, 0x3a, 0x00, 0x64, 0x00,
          0x01, 0x8e, 0xdf, 0x1e, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x46, 0xf2, 0x9f, 0x39, 0x00, 0x00, 0x00,
          0x00, 0xd0, 0x07, 0x00,
        ]),
      }),
      quotedOutAmountOverride: undefined,  // Optional parameter
      slippageBpsOverride: undefined,      // Optional parameter
      platformFeeBpsOverride: undefined,   // Optional parameter
    });
  });
});
