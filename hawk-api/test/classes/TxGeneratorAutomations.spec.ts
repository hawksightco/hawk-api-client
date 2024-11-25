import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { HS_AUTHORITY } from "../../src/addresses";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

const TIMEOUT = 60_000;

describe('TxGenerationAutomations: Test meteoraRebalanceIxs', () => {
  it('Dummy test', async () => {
    expect(false).toBe(false);
  }, TIMEOUT);

  // brittle test. do not use.
  // it('Generate hawkAPI.txGeneratorAutomation.meteoraRebalanceIxs instruction 2', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate instruction
  //   const ixs = await hawkAPI.txGeneratorAutomation.meteoraRebalanceIxs(
  //     connection,
  //     web3.SystemProgram.programId.toString(),
  //     {
  //       userWallet: new web3.PublicKey("GAhhrXsB816fDCEAksxnwrenmA89Xk8PFph6jk5GS4KL"),
  //       currentPosition: new web3.PublicKey("54VkorXiwFaD5QpcamV2MkCG3h1iVYLHVTbhimfUYCZs"),
  //       newPosition: new web3.PublicKey("243jjcp9xMHqkJG4kwVrtfYLGDUM9QzGHChYaf2dqu9V"),
  //       binRange: { lowerRange: -509, upperRange: -467 },
  //       distribution: 'SPOT-IMBALANCED'
  //     }
  //   );

  //   console.log(ixs);
  // }, TIMEOUT);

  // it('Debug this.hawkClient.txGeneratorAutomation.meteoraCompoundIxs issue', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate instruction
  //   const ixs = await hawkAPI.txGeneratorAutomation.meteoraRebalanceIxs(
  //     connection,
  //     web3.SystemProgram.programId.toString(),
  //     {
  //       userWallet: new web3.PublicKey('Bqi9BrkuyJcLSY97MEHnfJrR262EwpdFVh5MCmqTCGb1'),
  //       currentPosition: new web3.PublicKey('AHWseGqByDhcaAzJ6iZp3F1jauqUVTBRFeDqF7tWX28H'),
  //       newPosition: web3.Keypair.generate().publicKey,
  //       binRange: {
  //         lowerRange: 1650,
  //         upperRange: 1640,
  //       },
  //       distribution: "SPOT",
  //     }
  //   );

  //   const tx = await hawkAPI.txGeneratorAutomation.meteoraCompoundIxs(
  //     connection,
  //     HS_AUTHORITY.toString(),
  //     {
  //       userWallet: new web3.PublicKey('BjYFBdNJtTdLF7ioNU3884YEQokDn2wpoUaamnSmcATN'), // BjYFBdNJtTdLF7ioNU3884YEQokDn2wpoUaamnSmcATN
  //       position: new web3.PublicKey('GFo1phL3PE2iWDZEvihdTyLFK98TqTGD4ScBDHm31YCu'), // GFo1phL3PE2iWDZEvihdTyLFK98TqTGD4ScBDHm31YCu
  //     }
  //   );

  //   tx.data.transaction.instructions.map(ix => {
  //     console.log(``);
  //     console.log(``);
  //     console.log(`ix.programId: ${ix.programId}`);
  //     console.log(`--------------------------------------------`);
  //     // Assuming ix.data is a Buffer
  //     const formattedHex = ix.data.toString('hex')
  //       .match(/.{1,2}/g) // Split into pairs of hex characters (1 byte each)
  //       ?.map(byte => `0x${byte}`) // Prefix each pair with '0x'
  //       .join(', '); // Join with space between each 0x byte

  //     console.log(`ix.data: ${formattedHex}`);
  //     ix.keys.map(meta => {
  //       console.log(`pubkey: ${meta.pubkey}, isSigner: ${meta.isSigner}, isWritable: ${meta.isWritable}`);
  //     })
  //   })

  //   console.log(ixs);
  // }, TIMEOUT);
});
