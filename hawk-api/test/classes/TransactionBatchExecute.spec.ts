import * as web3 from "@solana/web3.js";
import { TransactionBatchExecute } from "../../src/classes/TransactionBatchExecute";
import { TransactionInstruction } from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";
import { HawkAPI } from "../../src";
import { JupiterAlts } from "../../src/classes/JupiterAlts";

dotenv.config({
  path: path.join(process.cwd(), 'test', '.env')
});

const TEST_TIMEOUT = 15_000;

describe('TransactionBatchExecute', () => {
  it('Be able to create new instance of TransactionBatchExecute without error', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    new TransactionBatchExecute(
      [],
      [],
      web3.Keypair.generate(),
      connection,
      [web3.Keypair.generate()],
      new JupiterAlts(),
    );
  });

  it('Be able to chunk transactions into set of 5 transactions without any error', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
    const signers = new Array(5).fill(web3.Keypair.generate());
    const dummyIx = new TransactionInstruction({
      programId: web3.SystemProgram.programId,
      keys: [
        ...signers.map(signer => {
          return { pubkey: signer.publicKey, isSigner: true, isWritable: true };
        }),
        ...new Array(25).fill({ pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false }, 0, 25)
      ],
      data: Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    });
    hawkAPI.jupAlts.setApiUrl(`${process.env.WORKER_URL}/jupiterAlts`);
    hawkAPI.jupAlts.setCredentials(
      process.env.WORKER_USERNAME as string,
      process.env.WORKER_PASSWORD as string,
    );
    const txBatch = hawkAPI.batchExecute({
      lookupTableAddresses: [],
      instructions: new Array(100).fill(dummyIx, 0, 100),
      payer: signers[0],
      connection,
      signers,
    });

    // Build batch
    const batch = await txBatch.buildBatch();

    // Expect 5 batch of transaction from given 100 instruction
    expect(batch.length).toBe(5);

    // Expect 100 instructions from batch
    let count = 0;
    batch.map(ixs => { count += ixs.length });
    expect(count).toBe(100)
  }, TEST_TIMEOUT);

  it('Be able to create batch of versioned transactions without any error', async () => {
    const connection = new web3.Connection(process.env.RPC_URL as string);
    const hawkAPI = new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
    const signers: web3.Keypair[] = new Array(5).fill(web3.Keypair.generate());
    const dummyIx = new web3.TransactionInstruction({
      programId: web3.SystemProgram.programId,
      keys: [
        ...signers.map(signer => {
          return { pubkey: signer.publicKey, isSigner: true, isWritable: true };
        }),
        ...new Array(25).fill({ pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false }, 0, 25)
      ],
      data: Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    });
    hawkAPI.jupAlts.setApiUrl(`${process.env.WORKER_URL}/jupiterAlts`);
    hawkAPI.jupAlts.setCredentials(
      process.env.WORKER_USERNAME as string,
      process.env.WORKER_PASSWORD as string,
    );
    const txBatch = hawkAPI.batchExecute({
      lookupTableAddresses: [],
      instructions: new Array(100).fill(dummyIx, 0, 100),
      payer: signers[0],
      connection,
      signers,
    });

    // Build batch
    const batch = await txBatch.buildBatch();

    // Build versioned transactions
    const txs = await txBatch.buildV0Transactions(batch);

    // Expect 5 batch of transaction from given 100 instruction
    expect(txs.length).toBe(5);
  }, TEST_TIMEOUT);
});
