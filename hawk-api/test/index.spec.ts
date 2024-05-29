import * as web3 from "@solana/web3.js";
import { HawkAPI, TransactionMetadata } from "../src";
import { ResponseWithStatus } from "../src/types";

const client = new HawkAPI('https://stagingapi2.hawksight.co');
const TIMEOUT = 60_000;
const testWallet = 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G';
const hawkWallet = 'dche7M2764e8AxNihBdn7uffVzZvTBNeL8x4LZg5E2c';
const connection = new web3.Connection('https://mainnet-beta.solana.com'); // change this to private rpc
const testPool = 'ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq';
const testPosition = '3xbDyEuRKWRtQSoHV2R7fqQpGS1SKacL1gQp1vGzaYgp';
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
    await client.search.load();
    console.log(client.search.token("USDC"));
  }, TIMEOUT);
});

describe('General Endpoints', () => {
  it ('GET /portfolio', async () => {
    const result = await client.general.portfolio({ wallet: 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G' });
    expect(result.status).toBe(200);
  }, TIMEOUT);

  it ('GET /pools', async () => {
    const result = await client.general.pools();
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

describe('Orca Endpoints', () => {});

function logIfNot200(result: ResponseWithStatus<any>) {
  if (result.status !== 200) {
    console.log(result.data);
  }
}

async function simulateTransaction(txMetadata: TransactionMetadata) {
  console.log(txMetadata.description);
  console.log(`-----------------------------------------`);
  const simulation = await txMetadata.transaction.simulateTransaction(connection);
  for (const log of simulation.logs as string[]) {
    console.log(log);
  }
  console.log(``)
  console.log(``)
  console.log(``)
  return simulation;
}
