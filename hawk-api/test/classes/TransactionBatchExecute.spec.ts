import * as web3 from "@solana/web3.js";
import { TransactionBatchExecute } from "../../src/classes/TransactionBatchExecute";
import { TransactionInstruction } from "@solana/web3.js";

describe('TransactionBatchExecute', () => {
  it('Be able to create new instance of TransactionBatchExecute without error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
    new TransactionBatchExecute(
      [],
      [],
      web3.Keypair.generate(),
      connection,
      [web3.Keypair.generate()],
    );
  });

  it('Be able to chunk transactions into set of 5 transactions without any error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
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
    })
    const txBatch = new TransactionBatchExecute(
      [],
      new Array(100).fill(dummyIx, 0, 100),
      signers[0],
      connection,
      signers,
    );

    // Build batch
    const batch = await txBatch.buildBatch();

    // Expect 5 batch of transaction from given 100 instruction
    expect(batch.length).toBe(5);

    // Expect 100 instructions from batch
    let count = 0;
    batch.map(ixs => { count += ixs.length });
    expect(count).toBe(100)
  });
});