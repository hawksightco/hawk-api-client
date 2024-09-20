import * as web3 from "@solana/web3.js";
import { HawkAPI, TransactionMetadata } from "../src";
import { ResponseWithStatus } from "../src/types";
import bs58 from "bs58";
import dotenv from "dotenv";
import path from "path";
import { Anchor } from "../src/anchor";
import { PriorityLevel } from "@hawksightco/swagger-client";
import { generateOrcaPositionPDA, sighashMatch } from "../src/functions";
import { BN } from "bn.js";
import { SolanaTestValidator } from "@ghabxph/solana-localnet";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

const client = new HawkAPI('https://stagingapi2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
const TIMEOUT = 480_000;
const testWalletSecret = process.env.TEST_WALLET as string;
const testWalletKpBuffer = bs58.decode(testWalletSecret);
const testWalletKp = web3.Keypair.fromSecretKey(testWalletKpBuffer);
const testWallet = testWalletKp.publicKey;
// const testWallet = new web3.PublicKey('9rVK18Mp1PuWTkcEqyEcd4QDNL3U2vTbzws6KbeuHbDM');
const hawkWallet = 'dche7M2764e8AxNihBdn7uffVzZvTBNeL8x4LZg5E2c';
const connection = new web3.Connection(process.env.RPC_URL as string); // change this to private rpc
const testPool = process.env.TEST_METEORA_POOL as string;
const testPosition = process.env.TEST_METEORA_POSITION as string;
const testPositionMint = new web3.PublicKey(process.env.TEST_ORCA_POSITION_MINT as string);
const testOrcaPool = new web3.PublicKey(process.env.TEST_ORCA_POOL as string);
const positionMintKp = web3.Keypair.generate();
const positionMint = positionMintKp.publicKey;
let liquidityDelta = new BN(0);
let activeBin: number;
Anchor.initialize(connection);

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

// describe('Health Endpoints', () => {
//   it ('GET /health', async () => {
//     const result: any = await client.health.health();
//     expect(result.status).toBe(200);
//     for (const key in result.services) {
//       expect(result.services[key]).toBe('OK');
//     }
//   });
// });

// describe('Search', () => {
//   it ('Search for token (Partial String)', async () => {
//     console.log(client.search.token("USDC"));
//   }, TIMEOUT);
// });

describe('General Endpoints', () => {
  // it ('GET /portfolio', async () => {
  //   const result = await client.general.portfolio({ wallet: 'Ga5jNBh26JHh9zyJcdm7vpyVWRgtKS2cLpNgEc5zBv8G' });
  //   expect(result.status).toBe(200);
  // }, TIMEOUT);

  // it ('GET /pools', async () => {
  //   const result = await client.general.pools({});
  //   expect(result.status).toBe(200);
  //   expect(result.data.length >= 0).toBe(true);
  // }, TIMEOUT);

  // it ('POST /register', async () => {
  //   const newWalletKp = web3.Keypair.generate();
  //   const newWallet = newWalletKp.publicKey.toString();
  //   const result = await client.general.register(connection, testWallet.toString(), { userWallet: newWallet });
  //   logIfNot200(result);
  //   expect(result.status).toBe(200);
  //   // await simulateOrExecuteTransaction(result.data);
  //   await localnetTest(result, [testWalletKp, newWalletKp], [newWalletKp.publicKey]);
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
    const positionKp = web3.Keypair.generate();
    const position = positionKp.publicKey.toString()
    const result = await client.txGenerator.meteoraCreatePositionAndDeposit(
      connection,
      testWallet.toString(),
      {
        position,
        pool: testPool,
        userWallet: testWallet.toString(),
        totalXAmount: 10_000,
        totalYAmount: 10_000,
        lowerBinRange: activeBin - 10,
        upperBinRange: activeBin + 10,
        distribution: 'CURVE',
      }
    );
    logIfNot200(result);
    expect(result.status).toBe(200);
    // await simulateOrExecuteTransaction(result.data);
    await localnetTest(result, [testWalletKp, positionKp]);
  }, TIMEOUT);
//   it ('POST /meteora/dlmm/tx/deposit', async () => {
//     const result = await client.txGenerator.meteoraDeposit(
//       connection,
//       testWallet.toString(),
//       {
//         position: testPosition,
//         userWallet: testWallet.toString(),
//         totalXAmount: 10_000,
//         totalYAmount: 10_000,
//         distribution: 'CURVE',
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//     await simulateOrExecuteTransaction(result.data);
//   }, TIMEOUT);
//   it ('POST /meteora/dlmm/tx/claim', async () => {
//     const result = await client.txGenerator.meteoraClaim(
//       connection,
//       testWallet.toString(),
//       {
//         position: testPosition,
//         userWallet: testWallet.toString(),
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//     await simulateOrExecuteTransaction(result.data);
//   }, TIMEOUT);
//   it ('POST /meteora/dlmm/tx/withdraw', async () => {
//     const result = await client.txGenerator.meteoraWithdraw(
//       connection,
//       testWallet.toString(),
//       {
//         position: testPosition,
//         userWallet: testWallet.toString(),
//         amountBps: 10_000,
//         shouldClaimAndClose: true,
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//     await simulateOrExecuteTransaction(result.data);
//   }, TIMEOUT);
//   it ('POST /meteora/dlmm/tx/closePosition', async () => { // will not work because position is not empty.
//     const result = await client.txGenerator.meteoraClosePosition(
//       connection,
//       testWallet.toString(),
//       {
//         position: testPosition,
//         userWallet: testWallet.toString(),
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//     await simulateOrExecuteTransaction(result.data);
//   }, TIMEOUT);
});

// // describe('Meteora Automation Endpoints', () => {
// //   it ('POST /meteora/dlmm/util/activeBin', async () => {
// //     const result = await client.util.meteoraDlmmActiveBin(
// //       {
// //         pools: [testPool],
// //         commitment: 'confirmed',
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     activeBin = result.data[testPool];
// //   }, TIMEOUT);
// //   it ('POST /meteora/dlmm/automation/compoundAutomationIx', async () => {
// //     const result = await client.txGeneratorAutomation.meteoraCompoundIxs(
// //       connection,
// //       hawkWallet,
// //       {
// //         userWallet: testWallet,
// //         position: new web3.PublicKey(testPosition),
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data);
// //   }, TIMEOUT);
// //   it ('POST /meteora/dlmm/automation/rebalanceAutomationIxs', async () => {
// //     const result = await client.txGeneratorAutomation.meteoraRebalanceIxs(
// //       connection,
// //       hawkWallet,
// //       {
// //         userWallet: testWallet,
// //         currentPosition: new web3.PublicKey(testPosition),
// //         newPosition: web3.Keypair.generate().publicKey,
// //         binRange: {
// //           lowerRange: activeBin - 34,
// //           upperRange: activeBin + 35,
// //         },
// //         distribution: 'CURVE',
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data);
// //   }, TIMEOUT);
// // });

// describe('Orca Transaction Generation', () => {
//   it ('Orca Open Position', async () => {
//     Anchor.initialize(connection);
//     const pool = await Anchor.instance().orcaProgram.account.whirlpool.fetch(testOrcaPool);
//     const tickLowerIndex = Math.floor((pool.tickCurrentIndex - 50 * pool.tickSpacing) / pool.tickSpacing) * pool.tickSpacing;
//     const tickUpperIndex = Math.floor((pool.tickCurrentIndex + 50 * pool.tickSpacing) / pool.tickSpacing) * pool.tickSpacing;
//     const result = await client.txGenerator.orcaOpenPosition(
//       connection,
//       testWallet.toString(),
//       {
//         userWallet: testWallet,
//         positionMint: positionMint,
//         whirlpool: testOrcaPool,
//         tickLowerIndex,
//         tickUpperIndex,
//       }
//     );
//     logIfNot200(result);
//     expect(result.status).toBe(200);
//     // await simulateOrExecuteTransaction(result.data, [testWalletKp, positionMintKp]);
//     await localnetTest(result, [testWalletKp, positionMintKp]);
//   }, TIMEOUT);

// //   it ('Orca Close Position', async () => {
// //     const result = await client.txGenerator.orcaClosePosition(
// //       connection,
// //       testWallet.toString(),
// //       {
// //         userWallet: testWallet,
// //         positionMint,
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data, [testWalletKp]);
// //   }, TIMEOUT);

// //   it ('Orca Deposit', async () => {
// //     const position = generateOrcaPositionPDA(testPositionMint);
// //     let positionInfo = await Anchor.instance().orcaProgram.account.position.fetch(position);
// //     const currentLiquidity = positionInfo.liquidity;
// //     console.log(`position: ${position}`);
// //     const result = await client.txGenerator.orcaDeposit(
// //       connection,
// //       testWallet.toString(),
// //       {
// //         userWallet: testWallet,
// //         positionMint: testPositionMint,
// //         totalXAmount: new BN('10000'),
// //         totalYAmount: new BN('10000')
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data, [testWalletKp]);
// //     positionInfo = await Anchor.instance().orcaProgram.account.position.fetch(position);
// //     liquidityDelta = positionInfo.liquidity.sub(currentLiquidity);
// //   }, TIMEOUT);

// //   it ('Orca Claim Rewards', async () => {
// //     const result = await client.txGenerator.orcaClaimRewards(
// //       connection,
// //       testWallet.toString(),
// //       {
// //         userWallet: testWallet,
// //         positionMint: testPositionMint,
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data, [testWalletKp]);
// //   }, TIMEOUT);

// //   it ('Orca Withdraw', async () => {
// //     console.log(`liquidityDelta: ${liquidityDelta}`);
// //     const result = await client.txGenerator.orcaWithdraw(
// //       connection,
// //       testWallet.toString(),
// //       {
// //         userWallet: testWallet,
// //         positionMint: testPositionMint,
// //         liquidityAmount: liquidityDelta,
// //       }
// //     );
// //     logIfNot200(result);
// //     expect(result.status).toBe(200);
// //     await simulateOrExecuteTransaction(result.data, [testWalletKp]);
// //   }, TIMEOUT);
// });

function logIfNot200(result: ResponseWithStatus<any>) {
  if (result.status !== 200) {
    console.log(result.data);
  }
}

/**
 * Simulate and execute transaction
 *
 * @param txMetadata
 * @param signers
 * @returns
 */
async function simulateOrExecuteTransaction(txMetadata: TransactionMetadata, signers: web3.Keypair[] = []) {
  console.log(txMetadata.description);
  console.log(`-----------------------------------------`);
  const simulation = await txMetadata.transaction.simulateTransaction(connection, signers);
  if (simulation.err) {
    for (const log of simulation.logs as string[]) {
      console.log(log);
    }
    console.log(`Consumed ${simulation.unitsConsumed} units`);
    console.log(``)
    console.log(``)
    console.log(``)
    throw new Error(`Simulation has error`);
  }
  const executeTransaction = (process.env.EXECUTE_TRANSACTION as string).toLowerCase() === 'true';
  if (executeTransaction && signers.length > 0) {
    // txMetadata.transaction.addPriorityFeeIx(connection, Math.ceil(simulation.unitsConsumed * 1.1), false, PriorityLevel.High);
    txMetadata.transaction.sign(signers);
    const rawTx = txMetadata.transaction.versionedTransaction.serialize();
    const signature = await connection.sendRawTransaction(rawTx);
    console.log(`Transaction signature: ${signature}`);
    const result = await connection.confirmTransaction({
      signature,
      blockhash: txMetadata.transaction.recentBlockhash,
      lastValidBlockHeight: txMetadata.transaction.lastValidBlockHeight
    }, 'finalized');
    console.log(`Transaction result`, result);
    console.log(`\n\n`);
  }
  return simulation;
}

async function localnetTest(tx: ResponseWithStatus<TransactionMetadata>, signers: web3.Keypair[], requestAirdrop: web3.PublicKey[] = []) {
  const testValidator = new SolanaTestValidator();
  testValidator.rpc = process.env.RPC_URL as string;
  testValidator.path = process.env.TEST_VALIDATOR_PATH as string;
  testValidator.addProgram('FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P', `/${process.env.PATH_index_yield_farming}`);
  testValidator.addProgram('6qZ4eVTH5ZbcK7gaqKNUSg7dLyCxTGZB43G4NcQdP2LZ', `/${process.env.PATH_iyf_strategy_quarry}`);
  testValidator.addProgram('8WViAZqpgDWxV2VxiQ2RZ8WRXqFieDnrJsspE3DtWnpn', `/${process.env.PATH_iyf_strategy_solend}`);
  testValidator.addProgram('EZiUb6ydWpR3ciizBTJ1J36KCqLyPKVjh4yZEJbs5Uno', `/${process.env.PATH_iyf_extension}`);
  console.log(`testWallet: ${testWallet}`);
  console.log(`tx.data.transaction.payerKey: ${tx.data.transaction.payerKey}`);
  tx.data.transaction.instructions.map(ix => {
    console.log(`program: ${ix.programId}`);
    console.log(`data: ${bs58.encode(ix.data)} -- ${decodeIxName(ix.data)}`);
    ix.keys.map(meta => {
      console.log(`pubkey: ${meta.pubkey}, isSigner: ${meta.isSigner}, isWritable: ${meta.isWritable}`);
    })
  });
  await testValidator.sendTransaction([{
    instructions: tx.data.transaction.instructions,
    payer: tx.data.transaction.payerKey,
    addressLookupTable: tx.data.transaction.alts.map(alt => alt.key),
    signers,
  }], requestAirdrop);
}

function decodeIxName(data: Buffer) {
  try {
    if (sighashMatch(data, 'IyfExtensionExecute')) {
      return 'IyfExtensionExecute';
    } else if (sighashMatch(data, 'meteora_dynamic_cpi')) {
      if (sighashMatch(data.subarray(12), 'AddLiquidityByWeight')) {
        return 'meteora_dynamic_cpi -- AddLiquidityByWeight';
      } else if (sighashMatch(data.subarray(12), 'AddLiquidityByStrategy')) {
        return 'meteora_dynamic_cpi -- AddLiquidityByStrategy';
      } else if (sighashMatch(data.subarray(12), 'AddLiquidityOneSide')) {
        return 'meteora_dynamic_cpi -- AddLiquidityOneSide';
      } else if (sighashMatch(data.subarray(12), 'AddLiquidityByStrategyOneSide')) {
        return 'meteora_dynamic_cpi -- AddLiquidityByStrategyOneSide';
      } else if (sighashMatch(data.subarray(12), 'RemoveLiquidity')) {
        return 'meteora_dynamic_cpi -- RemoveLiquidity';
      } else if (sighashMatch(data.subarray(12), 'RemoveLiquidityByRange')) {
        return 'meteora_dynamic_cpi -- RemoveLiquidityByRange';
      } else if (sighashMatch(data.subarray(12), 'ClaimFee')) {
        return 'meteora_dynamic_cpi -- ClaimFee';
      } else if (sighashMatch(data.subarray(12), 'ClaimReward')) {
        return 'meteora_dynamic_cpi -- ClaimReward';
      } else if (sighashMatch(data.subarray(12), 'ClosePosition')) {
        return 'meteora_dynamic_cpi -- ClosePosition';
      }
      return 'meteora_dynamic_cpi';
    } else if (sighashMatch(data, 'DepositMultipleToken')) {
      return 'DepositMultipleToken';
    } else if (sighashMatch(data, 'WithdrawMultipleToken')) {
      return 'WithdrawMultipleToken';
    }
  } catch {
    return 'Non-anchor';
  }
}
