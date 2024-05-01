import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import HawkAPI from "../src";

const client = new HawkAPI('http://localhost:5001');
const TIMEOUT = 30_000;
const testWallet = 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G';
const hawkWallet = 'dche7M2764e8AxNihBdn7uffVzZvTBNeL8x4LZg5E2c';
const connection = new web3.Connection('https://mainnet-beta.solana.com');

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

  it ('GET /pools', async () => {
    const result = await client.general.pools();
    expect(result.status).toBe(200);
    expect(result.data.length >= 0).toBe(true);
  }, TIMEOUT);

  it ('POST /register', async () => {
    const result = await client.general.register(connection, new web3.PublicKey(hawkWallet), { userWallet: hawkWallet });
    expect(result.status).toBe(200);
  }, TIMEOUT);
});
describe('Meteora Endpoints', () => {
  // it ('POST /register', async () => {
  //   const result = await client.general.register(connection, new web3.PublicKey(hawkWallet), { userWallet: hawkWallet });
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);
});
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