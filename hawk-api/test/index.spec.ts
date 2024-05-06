import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import HawkAPI from "../src";
import { ResponseWithStatus } from "../src/types";

const client = new HawkAPI('http://localhost:5001');
const TIMEOUT = 30_000;
const testWallet = 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G';
const hawkWallet = 'dche7M2764e8AxNihBdn7uffVzZvTBNeL8x4LZg5E2c';
const connection = new web3.Connection('https://mainnet-beta.solana.com'); // change this to private rpc
const testPool = 'ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq';
const testPosition = '7kbNjgL5SUtcwqpTRbjxkmSDHeYTnPUgEGUQwm1ETdDp';
let activeBin: number;

describe('Health Endpoints', () => {
  it ('GET /health', async () => {
    const result: any = await client.health.health();
    expect(result.status).toBe(200);
    for (const key in result.services) {
      expect(result.services[key]).toBe('OK');
    }
  });
});

describe('General Endpoints', () => {
  it ('GET /portfolio', async () => {
    const result = await client.general.portfolio({ wallet: 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G' });
    expect(result.status).toBe(200);
    for (const poolId in result.data.pools) {
      if (result.data.pools[poolId] !== undefined) {
        for (const position of result.data.pools[poolId]) {
          expect(isPublicKey(position.positionAddress)).toBe(true); // Must be a valid public key
          expect(position.balances.length >= 0).toBe(true); // Must be a valid array
          expect(position.fees.length >= 0).toBe(true); // Must be a valid array
          expect(position.rewards.length >= 0).toBe(true); // Must be a valid array
          for (const balance of position.balances) {
            expect(isInteger(balance.amount)).toBe(true);
            expect(isPublicKey(balance.mint)).toBe(true);
          }
          for (const balance of position.fees) {
            expect(isInteger(balance.amount)).toBe(true);
            expect(isPublicKey(balance.mint)).toBe(true);
          }
          for (const balance of position.rewards) {
            expect(isInteger(balance.amount)).toBe(true);
            expect(isPublicKey(balance.mint)).toBe(true);
          }
        }
      }
    }
  }, TIMEOUT);

  // it ('GET /pools', async () => {
  //   const result = await client.general.pools();
  //   expect(result.status).toBe(200);
  //   expect(result.data.length >= 0).toBe(true);
  // }, TIMEOUT);

  // it ('POST /register', async () => {
  //   const result = await client.general.register(connection, hawkWallet, { userWallet: hawkWallet });
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
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
      hawkWallet,
      {
        position: web3.Keypair.generate().publicKey.toString(),
        pool: testPool,
        userWallet: testWallet,
        totalXAmount: 10_000,
        totalYAmount: 10_000,
        lowerBinRange: activeBin - 20,
        upperBinRange: activeBin + 20,
        distribution: 'CURVE',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
  }, TIMEOUT);
  // it ('POST /meteora/dlmm/tx/deposit', async () => {
  //   const result = await client.txGenerator.meteoraDeposit(
  //     connection,
  //     hawkWallet,
  //     {
  //       position: testPosition,
  //       userWallet: testWallet,
  //       totalXAmount: 10_000,
  //       totalYAmount: 10_000,
  //       distribution: 'CURVE',
  //     }
  //   );
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
  // it ('POST /meteora/dlmm/tx/claim', async () => {
  //   const result = await client.txGenerator.meteoraClaim(
  //     connection,
  //     hawkWallet,
  //     {
  //       position: testPosition,
  //       userWallet: testWallet,
  //     }
  //   );
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
  // it ('POST /meteora/dlmm/tx/withdraw', async () => {
  //   const result = await client.txGenerator.meteoraWithdraw(
  //     connection,
  //     hawkWallet,
  //     {
  //       position: testPosition,
  //       userWallet: testWallet,
  //       amountBps: 10_000,
  //       shouldClaimAndClose: true,
  //     }
  //   );
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
  // it ('POST /meteora/dlmm/tx/closePosition', async () => { // will not work because position is not empty.
  //   const result = await client.txGenerator.meteoraClosePosition(
  //     connection,
  //     hawkWallet,
  //     {
  //       position: testPosition,
  //       userWallet: testWallet,
  //     }
  //   );
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
});

// describe('Meteora Automation Endpoints', () => {
//   it ('POST /meteora/dlmm/automation/claimFeeAndRewardsAutomationIx', async () => {
//     const result = await client.txGeneratorAutomation.meteoraClaimFeeAndRewards(
//       connection,
//       hawkWallet,
//       {
//         userWallet: testWallet,
//         position: testPosition,
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//   }, TIMEOUT);
//   it ('POST /meteora/dlmm/automation/fullWithdrawAndClosePositionAutomationIx', async () => {
//     const result = await client.txGeneratorAutomation.meteoraFullWithdrawalAndClosePosition(
//       connection,
//       hawkWallet,
//       {
//         userWallet: testWallet,
//         position: testPosition,
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//   }, TIMEOUT);
//   it ('POST /meteora/dlmm/automation/createPositionAndDepositAutomationIx', async () => { // can't test...
//     const result = await client.txGeneratorAutomation.meteoraCreatePositionAndDeposit(
//       connection,
//       hawkWallet,
//       {
//         position: web3.Keypair.generate().publicKey.toString(),
//         pool: testPool,
//         userWallet: testWallet,
//         lowerBinRange: activeBin - 20,
//         upperBinRange: activeBin + 20,
//         distribution: 'CURVE',
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//   }, TIMEOUT);
// });

describe('Orca Endpoints', () => {});

function isPublicKey(address: string): boolean {
  try {
    new web3.PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

function isInteger(value: string): boolean {
  return String(parseInt(value)) === value;
}

function logIfNot200(result: ResponseWithStatus<any>) {
  if (result.status !== 200) {
    console.log(result.data);
  }
}
