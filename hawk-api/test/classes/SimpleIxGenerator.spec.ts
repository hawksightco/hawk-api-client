import * as web3 from "@solana/web3.js";
import { SimpleIxGenerator } from "../../src/classes/SimpleIxGenerator";
import { sighashMatch } from "../../src/functions";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { JupiterAlts } from "../../src/classes/JupiterAlts";
import { IYF_EXTENSION } from "../../src/addresses";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

describe('SimpleIxGenerator', () => {
  it('Be able to create new instance of SimpleIxGenerator without error', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    new SimpleIxGenerator();
  });

  // it('Generate iyfMain.iyfExtensionExecute instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate set transaction slot
  //   hawkAPI.ix.iyfMain.iyfExtensionExecute(connection, {
  //     userWallet,
  //     iyfExtensionIx: new web3.TransactionInstruction({
  //       data: Buffer.from([]),
  //       keys: [],
  //       programId: IYF_EXTENSION,
  //     })
  //   });
  // });

  it('Generate iyfMain.setTransactionSlot instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate set transaction slot
    hawkAPI.ix.iyfMain.setTransactionSlot(connection, { userWallet });
  });

  it('Generate iyfMain.verifyTransactionSlot instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate verify transaction slot
    hawkAPI.ix.iyfMain.verifyTransactionSlot(connection, { userWallet });
  });

  it('Generate meteora.initializePositionAutomation instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate verify transaction slot
    hawkAPI.ix.meteoraDlmm.initializePositionAutomation(connection, {
      userWallet,
      lbPair: web3.SystemProgram.programId,
      position: web3.SystemProgram.programId,
      lowerBinId: 0,
      upperBinId: 1
    });
  });

  // it('Generate meteora.claimFee instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.claimFee(connection, {});
  // });

  // it('Generate meteora.claimReward instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.claimReward(connection, {});
  // });

  // it('Generate meteora.claimFeeAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.claimFeeAutomation(connection, {});
  // });

  // it('Generate meteora.claimRewardAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.claimRewardAutomation(connection, {});
  // });

  // it('Generate meteora.depositAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.depositAutomation(connection, {});
  // });

  // it('Generate meteora.oneSideDeposit instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.oneSideDeposit(connection, {});
  // });

  // it('Generate meteora.withdrawAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.withdrawAutomation(connection, {});
  // });

  // it('Generate meteora.closePositionAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.closePositionAutomation(connection, {});
  // });

  // it('Generate meteora.limitCloseAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   hawkAPI.ix.meteoraDlmm.limitCloseAutomation(connection, {});
  // });
});
