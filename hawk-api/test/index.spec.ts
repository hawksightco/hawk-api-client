import * as web3 from "@solana/web3.js";
import { HawkAPI, TransactionMetadata } from "../src";
import { ResponseWithStatus } from "../src/types";
import bs58 from "bs58";
import dotenv from "dotenv";
import path from "path";
import { Anchor } from "../src/anchor";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});


const client = new HawkAPI('https://stagingapi2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
const TIMEOUT = 60_000;
const testWalletSecret = process.env.TEST_WALLET as string;
const testWalletKpBuffer = bs58.decode(testWalletSecret);
const testWalletKp = web3.Keypair.fromSecretKey(testWalletKpBuffer);
const testWallet = testWalletKp.publicKey.toString();
const hawkWallet = 'dche7M2764e8AxNihBdn7uffVzZvTBNeL8x4LZg5E2c';
const connection = new web3.Connection(process.env.RPC_URL as string); // change this to private rpc
const testPool = process.env.TEST_METEORA_POOL as string;
const testPosition = process.env.TEST_METEORA_POSITION as string;
const testOrcaPool = process.env.TEST_ORCA_POOL as string;
let activeBin: number;

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

describe('Health Endpoints', () => {
  it ('GET /health', async () => {
    const result: any = await client.health.health();
    expect(result.status).toBe(200);
    for (const key in result.services) {
      expect(result.services[key]).toBe('OK');
    }
  });
});

describe('Search', () => {
  it ('Search for token (Partial String)', async () => {
    console.log(client.search.token("USDC"));
  }, TIMEOUT);
});

describe('General Endpoints', () => {
  it ('GET /portfolio', async () => {
    const result = await client.general.portfolio({ wallet: 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G' });
    expect(result.status).toBe(200);
  }, TIMEOUT);

  it ('GET /pools', async () => {
    const result = await client.general.pools({});
    expect(result.status).toBe(200);
    expect(result.data.length >= 0).toBe(true);
  }, TIMEOUT);

  it ('POST /register', async () => {
    const result = await client.general.register(connection, hawkWallet, { userWallet: hawkWallet });
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
});

describe('Meteora Endpoints', () => {
  it ('POST /meteora/dlmm/util/activeBin', async () => {
    const result = await client.util.meteoraDlmmActiveBin(
      {
        pools: [testPool],
        commitment: 'confirmed',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    activeBin = result.data[testPool];
  }, TIMEOUT);
  it ('POST /meteora/dlmm/tx/createPositionAndDeposit', async () => {
    const result = await client.txGenerator.meteoraCreatePositionAndDeposit(
      connection,
      testWallet,
      {
        position: web3.Keypair.generate().publicKey.toString(),
        pool: testPool,
        userWallet: testWallet,
        totalXAmount: 10_000,
        totalYAmount: 10_000,
        lowerBinRange: activeBin - 34,
        upperBinRange: activeBin + 35,
        distribution: 'CURVE',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
  it ('POST /meteora/dlmm/tx/deposit', async () => {
    const result = await client.txGenerator.meteoraDeposit(
      connection,
      testWallet,
      {
        position: testPosition,
        userWallet: testWallet,
        totalXAmount: 10_000,
        totalYAmount: 10_000,
        distribution: 'CURVE',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
  it ('POST /meteora/dlmm/tx/claim', async () => {
    const result = await client.txGenerator.meteoraClaim(
      connection,
      testWallet,
      {
        position: testPosition,
        userWallet: testWallet,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
  it ('POST /meteora/dlmm/tx/withdraw', async () => {
    const result = await client.txGenerator.meteoraWithdraw(
      connection,
      testWallet,
      {
        position: testPosition,
        userWallet: testWallet,
        amountBps: 10_000,
        shouldClaimAndClose: true,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
  it ('POST /meteora/dlmm/tx/closePosition', async () => { // will not work because position is not empty.
    const result = await client.txGenerator.meteoraClosePosition(
      connection,
      testWallet,
      {
        position: testPosition,
        userWallet: testWallet,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
});

describe('Meteora Automation Endpoints', () => {
  it ('POST /meteora/dlmm/util/activeBin', async () => {
    const result = await client.util.meteoraDlmmActiveBin(
      {
        pools: [testPool],
        commitment: 'confirmed',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    activeBin = result.data[testPool];
  }, TIMEOUT);
  it ('POST /meteora/dlmm/automation/compoundAutomationIx', async () => {
    const result = await client.txGeneratorAutomation.meteoraCompoundIxs(
      connection,
      hawkWallet,
      {
        userWallet: testWallet,
        position: testPosition,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
  it ('POST /meteora/dlmm/automation/rebalanceAutomationIxs', async () => {
    const result = await client.txGeneratorAutomation.meteoraRebalanceIxs(
      connection,
      hawkWallet,
      {
        userWallet: testWallet,
        currentPosition: testPosition,
        newPosition: web3.Keypair.generate().publicKey.toString(),
        lowerBinRange: activeBin - 34,
        upperBinRange: activeBin + 35,
        distribution: 'CURVE',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
});

describe('Orca Transaction Generation', () => {
  it ('Orca Open Position', async () => {
    const positionMint = web3.Keypair.generate();
    Anchor.initialize(connection);
    const pool = await Anchor.instance().orcaProgram.account.whirlpool.fetch(testOrcaPool);
    console.log(`pool.tickCurrentIndex: ${pool.tickCurrentIndex}`);
    const result = await client.txGenerator.orcaOpenPosition(
      connection,
      testWallet,
      {
        userWallet: testWallet,
        positionMint: positionMint.publicKey.toBase58(),
        whirlpool: testOrcaPool,
        // tickLowerIndex: `${pool.tickCurrentIndex - 500}`,
        // tickUpperIndex: `${pool.tickCurrentIndex + 500}`,
        tickLowerIndex: `-443636`,
        tickUpperIndex: `443636`,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);

  it ('Orca Deposit', async () => {
    const positionMint = web3.Keypair.generate();
    const result = await client.txGenerator.orcaDeposit(
      connection,
      testWallet,
      {
        userWallet: testWallet,
        positionMint: positionMint.publicKey.toBase58(),
        totalXAmount: '10000',
        totalYAmount: '10000'
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);

  it ('Orca Withdraw', async () => {
    const positionMint = web3.Keypair.generate();
    const result = await client.txGenerator.orcaWithdraw(
      connection,
      testWallet,
      {
        userWallet: testWallet,
        positionMint: positionMint.publicKey.toBase58(),
        liquidityAmount: 10000,
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);

  it ('Orca Claim Rewards', async () => {
    const positionMint = web3.Keypair.generate();
    const result = await client.txGenerator.orcaClaimRewards(
      connection,
      testWallet,
      {
        userWallet: testWallet,
        positionMint: positionMint.publicKey.toBase58(),
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);

  it ('Orca Close Position', async () => {
    const positionMint = web3.Keypair.generate();
    const result = await client.txGenerator.orcaClosePosition(
      connection,
      testWallet,
      {
        userWallet: testWallet,
        positionMint: positionMint.publicKey.toBase58(),
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    await simulateTransaction(result.data);
  }, TIMEOUT);
});

function logIfNot200(result: ResponseWithStatus<any>) {
  if (result.status !== 200) {
    console.log(result.data);
  }
}

async function simulateTransaction(txMetadata: TransactionMetadata, signers: web3.Keypair[] = []) {
  console.log(txMetadata.description);
  console.log(`-----------------------------------------`);
  const simulation = await txMetadata.transaction.simulateTransaction(connection, signers);
  for (const log of simulation.logs as string[]) {
    console.log(log);
  }
  console.log(``)
  console.log(``)
  console.log(``)
  if (simulation.err) {
    throw new Error(`Simulation has error`);
  }
  return simulation;
}
