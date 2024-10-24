import * as web3 from "@solana/web3.js";
import { Atomicity } from "../../src/classes/Atomicity";
import { TransactionInstruction } from "@solana/web3.js";
import { SimpleIxGenerator } from "../../src/classes/SimpleIxGenerator";
import { sighashMatch } from "../../src/functions";

describe('Atomicity', () => {
  it('Be able to create new instance of Atomicity without error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
    new Atomicity(
      [],
      [],
      web3.Keypair.generate(),
      connection,
      [web3.Keypair.generate()],
      new SimpleIxGenerator(),
    );
  });

  it('Be able to chunk transactions into set of 6 transactions without any error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
    const signers: web3.Keypair[] = new Array(5).fill(web3.Keypair.generate());
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
    const atomicity = new Atomicity(
      [],
      new Array(100).fill(dummyIx, 0, 100),
      signers[0],
      connection,
      signers,
      new SimpleIxGenerator(),
    );

    // Set dummy user wallet
    atomicity.setUserWallet(signers[0].publicKey);

    // Build batch
    const batch = await atomicity.buildBatch();

    // Expect 6 batch of transaction from given 100 instruction
    expect(batch.length).toBe(6);

    // Expect 106 instructions from batch
    let count = 0;
    batch.map(ixs => { count += ixs.length });
    expect(count).toBe(106);

    // Expect first batch to have `setTransactionSlot`
    const firstIxData = batch[0][batch[0].length - 1].data;
    expect(firstIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(firstIxData, "setTransactionSlot")).toBe(true);

    // Expect second batch to have `verifyTransactionSlot`
    const secondIxData = batch[1][batch[1].length - 1].data;
    expect(secondIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(secondIxData, "verifyTransactionSlot")).toBe(true);

    // Expect third batch to have `verifyTransactionSlot`
    const thirdIxData = batch[2][batch[2].length - 1].data;
    expect(thirdIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(thirdIxData, "verifyTransactionSlot")).toBe(true);

    // Expect fourth batch to have `verifyTransactionSlot`
    const fourthIxData = batch[3][batch[3].length - 1].data;
    expect(fourthIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(fourthIxData, "verifyTransactionSlot")).toBe(true);

    // Expect fifth batch to have `verifyTransactionSlot`
    const fifthIxData = batch[4][batch[4].length - 1].data;
    expect(fifthIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(fifthIxData, "verifyTransactionSlot")).toBe(true);

    // Expect sixth batch to have `verifyTransactionSlot`
    const sixthIxData = batch[5][batch[5].length - 1].data;
    expect(sixthIxData.length).toBeGreaterThanOrEqual(8);
    expect(sighashMatch(sixthIxData, "verifyTransactionSlot")).toBe(true);
  });
});
