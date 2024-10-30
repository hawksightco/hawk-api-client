import * as web3 from "@solana/web3.js";
import { SimpleIxGenerator } from "../../src/classes/SimpleIxGenerator";
import { generateUserPda, sighashMatch } from "../../src/functions";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { JupiterAlts } from "../../src/classes/JupiterAlts";
import { IYF_EXTENSION, IYF_MAIN, USDC_FARM } from "../../src/addresses";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

describe('SimpleIxGenerator', () => {
  it('Be able to create new instance of SimpleIxGenerator without error', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    new SimpleIxGenerator();
  });

  it('Generate iyfMain.iyfExtensionExecute instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;
    const userPda = generateUserPda(userWallet);

    // Generate instruction
    let throwsException = false;
    try {
      await hawkAPI.ix.iyfMain.iyfExtensionExecute(connection, {
        userWallet,
        iyfExtensionIx: new web3.TransactionInstruction({
          data: Buffer.from([0,0,0,0,0,0,0,0]),
          keys: [
            { pubkey: USDC_FARM, isSigner: false, isWritable: false },
            { pubkey: userPda, isSigner: false, isWritable: false },
            { pubkey: userWallet, isSigner: false, isWritable: false },
            { pubkey: IYF_MAIN, isSigner: false, isWritable: false },
          ],
          programId: IYF_EXTENSION,
        })
      });
    } catch(e) {
      throwsException = true;
    }
    expect(throwsException).toBe(false);

    throwsException = true;
    try {
      await hawkAPI.ix.iyfMain.iyfExtensionExecute(connection, {
        userWallet,
        iyfExtensionIx: new web3.TransactionInstruction({
          data: Buffer.from([0,0,0,0,0,0,0,0]),
          keys: [],
          programId: IYF_EXTENSION,
        })
      });
    } catch(e) {
      throwsException = true;
    }
    expect(throwsException).toBe(true);
  });

  it('Generate iyfMain.setTransactionSlot instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate instruction
    let throwsException = false;
    try {
      await hawkAPI.ix.iyfMain.setTransactionSlot(connection, { userWallet });
    } catch {
      throwsException = true;
    }
    expect(throwsException).toBe(false);
  });

  it('Generate iyfMain.verifyTransactionSlot instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate instruction
    let throwsException = false;
    try {
      await hawkAPI.ix.iyfMain.verifyTransactionSlot(connection, { userWallet });
    } catch {
      throwsException = true;
    }
    expect(throwsException).toBe(false);
  });

  it('Generate meteora.initializePositionAutomation instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate instruction
    let throwsException = false;
    try {
      await hawkAPI.ix.meteoraDlmm.initializePositionAutomation(connection, {
        userWallet,
        lbPair: web3.SystemProgram.programId,
        position: web3.SystemProgram.programId,
        lowerBinId: 0,
        upperBinId: 1
      });
    } catch {
      throwsException = true;
    }
    expect(throwsException).toBe(false);
  });

  // it('Generate meteora.claimFee instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.claimFee(connection, {});
  // });

  // it('Generate meteora.claimReward instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.claimReward(connection, {});
  // });

  // it('Generate meteora.claimFeeAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.claimFeeAutomation(connection, {});
  // });

  // it('Generate meteora.claimRewardAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.claimRewardAutomation(connection, {});
  // });

  // it('Generate meteora.depositAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.depositAutomation(connection, {});
  // });

  // it('Generate meteora.oneSideDeposit instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.oneSideDeposit(connection, {});
  // });

  // it('Generate meteora.withdrawAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.withdrawAutomation(connection, {});
  // });

  // it('Generate meteora.closePositionAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.closePositionAutomation(connection, {});
  // });

  // it('Generate meteora.limitCloseAutomation instruction', async () => {
  //   // Connection instance
  //   const connection = new web3.Connection(process.env.RPC_URL as string);

  //   // Create instance of HawkAPI
  //   const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

  //   // Generate wallet
  //   const userWallet = web3.Keypair.generate().publicKey;

  //   // Generate verify transaction slot
  //   await hawkAPI.ix.meteoraDlmm.limitCloseAutomation(connection, {});
  // });
});


describe('SimpleIxGenerator: Jupiter Route IX Tests', () => {
  it('Generate iyfMain.jupiterRouteIx instruction', async () => {
    // Connection instance
    const connection = new web3.Connection(process.env.RPC_URL as string);

    // Create instance of HawkAPI
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });

    // Generate wallet
    const userWallet = web3.Keypair.generate().publicKey;

    // Generate instruction
    let throwsException = false;
    try {
      await hawkAPI.ix.iyfMain.jupiterRouteIx({
        connection,
        userWallet,
        sourceTokenAccount: web3.SystemProgram.programId,
        destinationTokenAccount: web3.SystemProgram.programId,
        destinationMint: web3.SystemProgram.programId,
        platformFeeAccount: web3.SystemProgram.programId,
        eventAuthority: web3.SystemProgram.programId,
        remainingAccounts: [],
        data: Buffer.from([
          0xe5, 0x17, 0xcb, 0x97, 0x7a, 0xe3, 0xad, 0x2a, 0x01, 0x00, 0x00, 0x00, 0x3a, 0x00, 0x64, 0x00,
          0x01, 0x8e, 0xdf, 0x1e, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x46, 0xf2, 0x9f, 0x39, 0x00, 0x00, 0x00,
          0x00, 0xd0, 0x07, 0x00,
        ]),
        quotedOutAmount: undefined, // optiona parameter (override)
        slippageBps: undefined, // optiona parameter (override)
        platformFeeBps: undefined, // optional parameter (override)
      });
    } catch {
      throwsException = true;
    }
    expect(throwsException).toBe(false);
  });
});
