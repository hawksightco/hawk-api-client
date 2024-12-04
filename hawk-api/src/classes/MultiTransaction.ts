import * as web3 from "@solana/web3.js";
import * as client from "@hawksightco/swagger-client";
import { GeneralUtility } from "./GeneralUtility";
import { benchmark, findNonceOwnedBy, generateNonceAddressFromIndex } from "../functions";
import { SendSignedTx, SignerPlugin, SignerPlugin2, TransactionMetadataResponse } from "../types";
import { Transaction2 } from "./Transaction2";
import { Log } from "./Logging";
import { getFeeEstimate } from "../functions";

type CreateDurableNonceAccountOpts = {
  userSignedFn: () => void,
  userDidntSignedFn: () => void,
  successFn: (txid: string) => void,
  failedFn: (message: string, logToMixpanel: boolean) => void,
}

type SignAndSendOpts = {
  userSignedFn: () => void,
  userDidntSignedFn: () => void,
  successFn: (txids: string[]) => void,
  failedFn: (message: string, logToMixpanel: boolean) => void,
}

export class MultiTransaction {

  private txs: [web3.AddressLookupTableAccount[], ixs: web3.TransactionInstruction[]][] = [];
  private nonceAdvanceIxCount: number = 0;
  private nonceAccounts: web3.AccountInfo<web3.NonceAccount>[] = [];

  /**
   * Get transaction count
   */
  get count() {
    return this.txs.length;
  }

  constructor(
    readonly description: string,
    readonly generalUtility: GeneralUtility,
    public latestBlockhash: {
      blockhash: web3.Blockhash,
      lastValidBlockHeight: number
    },
    readonly payerKey: web3.PublicKey,
  ) {}

  push(alts: web3.AddressLookupTableAccount[], ixs: web3.TransactionInstruction[]) {
    this.txs.push([alts, ixs]);
    const currentIndex = this.txs.length - 1;
    const result = this.getNonceIndex(currentIndex);
    this.nonceAdvanceIxCount += result > -1 ? 1 : 0;
  }

  async getPayerOwnedNonceAccounts(connection: web3.Connection) {
    this.nonceAccounts = await findNonceOwnedBy(connection, this.payerKey, this.nonceAdvanceIxCount);
  }

  /**
   * Whether there were enough nonce accounts already initialized on-chain
   *
   * @param connection
   * @returns
   */
  async hasAvailableNonce(connection: web3.Connection) {
    if (this.nonceAdvanceIxCount === 0) {
      return true;
    } else {
      benchmark({ name: `hasAvailableNonce`, msg: `await this.getPayerOwnedNonceAccounts(connection)`});
      await this.getPayerOwnedNonceAccounts(connection);
      benchmark({ name: `hasAvailableNonce`, msg: `await this.getPayerOwnedNonceAccounts(connection)`, end: true});
      return this.nonceAccounts.length >= this.nonceAdvanceIxCount;
    }
  }

  /**
   * Generate a transaction that creates durable nonce account
   *
   * @param connection
   * @returns
   */
  async createDurableNonceAccount(connection: web3.Connection, signerFn: SignerPlugin, sendSigned: SendSignedTx, opts: CreateDurableNonceAccountOpts): Promise<boolean> {
    const count = this.nonceAdvanceIxCount - this.nonceAccounts.length;
    const instructions: web3.TransactionInstruction[] = [];
    benchmark({ name: `createDurableNonceAccount`, msg: `await connection.getMinimumBalanceForRentExemption(web3.NONCE_ACCOUNT_LENGTH)`});
    const rentExempt = await connection.getMinimumBalanceForRentExemption(web3.NONCE_ACCOUNT_LENGTH);
    benchmark({ name: `createDurableNonceAccount`, msg: `await connection.getMinimumBalanceForRentExemption(web3.NONCE_ACCOUNT_LENGTH)`, end: true});
    for (let i = 0; i < count; i++) {
      const noncePubkey = await generateNonceAddressFromIndex(this.payerKey, i);
      instructions.push(...[
        web3.SystemProgram.createAccountWithSeed({
          fromPubkey: this.payerKey,
          newAccountPubkey: noncePubkey,
          basePubkey: this.payerKey,
          seed: `hs-nonce-${i}`,
          lamports: rentExempt,
          space: web3.NONCE_ACCOUNT_LENGTH,
          programId: web3.SystemProgram.programId,
        }),
        web3.SystemProgram.nonceInitialize({
          noncePubkey,
          authorizedPubkey: this.payerKey,
        })
      ]);
    }
    benchmark({ name: `createDurableNonceAccount`, msg: `await connection.getLatestBlockhash`});
    const { blockhash: recentBlockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    benchmark({ name: `createDurableNonceAccount`, msg: `await connection.getLatestBlockhash`, end: true});
    const tx = new web3.VersionedTransaction(
      new web3.TransactionMessage({
        payerKey: this.payerKey,
        instructions,
        recentBlockhash,
      }).compileToLegacyMessage()
    );
    const signedTx = await (async () => {
      try {
        const signedTx = await signerFn(tx);
        opts.userSignedFn();
        return signedTx;
      } catch {
        opts.userDidntSignedFn();
        return false;
      }
    })();
    if (signedTx === false) {
      return false;
    }
    const status = await (async () => {
      try {
        benchmark({ name: `createDurableNonceAccount`, msg: `await sendSigned(signedTx, lastValidBlockHeight)`});
        const txid = await sendSigned(signedTx, lastValidBlockHeight);
        benchmark({ name: `createDurableNonceAccount`, msg: `await sendSigned(signedTx, lastValidBlockHeight)`, end: true});
        opts.successFn(txid);
        benchmark({ name: `createDurableNonceAccount`, msg: `await this.hasAvailableNonce(connection)`});
        const status = await this.hasAvailableNonce(connection);
        benchmark({ name: `createDurableNonceAccount`, msg: `await this.hasAvailableNonce(connection)`, end: true});
        if (status === false) {
          opts.failedFn(`Nonce account has been created, but we cannot fetch the account yet on blockchain. Please refresh your browser. Transaction ID: ${txid}`, false)
        }
        return true;
      } catch {
        opts.failedFn(`Failed to create nonce account.`, true);
        return false;
      }
    })();
    return status;
  }

  async signAndSend(
    connection: web3.Connection,
    priorityLevel: client.PriorityLevel,
    priorityFeeMaxCap: number,
    signMultipleTransactions: SignerPlugin2,
    sendSignedTx: SendSignedTx,
    opts: SignAndSendOpts
  ) {
    benchmark({ name: `signAndSend`, msg: `await connection.getLatestBlockhash()`});
    const latestBlockhash = await connection.getLatestBlockhash();
    benchmark({ name: `signAndSend`, msg: `await connection.getLatestBlockhash()`, end: true});
    const txs = await (async () => {
      try {
        const txs = await signMultipleTransactions(
          await this.generateTransasctions(connection, priorityLevel, priorityFeeMaxCap, latestBlockhash)
        );
        opts.userSignedFn();
        return txs;
      } catch {
        opts.userDidntSignedFn();
        return false;
      }
    })();

    // If false, then return
    if (!!!txs) return;

    // Otherwise continue
    const promises: Promise<string>[] = [];
    let i = -1;
    for (const tx of txs) {
      i++;
      const _tx = this.transactionInstance(this.txs[i][0], this.txs[i][1], latestBlockhash);
      if (!_tx.hasNonceAdvanceIx) {
        promises.push(sendSignedTx(tx, latestBlockhash.lastValidBlockHeight));
      } else {
        // Wait for transactions without nonce to succeed first.
        try {
          const txids = await Promise.all(promises);
          opts.successFn(txids);
          promises.splice(0, promises.length);
          const latestBlockhash = await connection.getLatestBlockhash();
          await sendSignedTx(tx, latestBlockhash.lastValidBlockHeight);
        } catch {
          opts.failedFn(`Transaction #${i} failed.`, true);
          return;
        }
      }
    }
    const txids = await Promise.all(promises);
    opts.successFn(txids);
  }

  private async generateTransasctions(connection: web3.Connection, priorityLevel: client.PriorityLevel, priorityFeeMaxCap: number, latestBlockhash: web3.BlockhashWithExpiryBlockHeight): Promise<web3.VersionedTransaction[]> {
    benchmark({ name: `generateTransasctions`, msg: `entire function`});
    const estimate = await this.getFeeEstimate(priorityLevel);
    const txs: web3.VersionedTransaction[] = [];
    let nonceIndex = 0;
    for (const tuple of this.txs) {
      const tx = this.transactionInstance(tuple[0], tuple[1], latestBlockhash);
      const simulation = await tx.simulateTransaction(connection);
      const computeUnitLimit = Math.round(simulation.unitsConsumed * 1.15) + 100_000; // + 15% + 100,000 additional CU to prevent exceeding CU.
      tx.feeEstimate = estimate;
      await tx.addPriorityFeeIx(connection, computeUnitLimit, false, priorityLevel, priorityFeeMaxCap);
      if (tx.hasNonceAdvanceIx) {
        const nonceAccount = this.nonceAccounts[nonceIndex++];
        const blockhash = nonceAccount.data.nonce;
        const lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
        tx.setBlockhash(blockhash, lastValidBlockHeight);
      } else {
        const { blockhash, lastValidBlockHeight } = latestBlockhash;
        tx.setBlockhash(blockhash, lastValidBlockHeight);
      }
      txs.push(tx.versionedTransaction);
    }
    benchmark({ name: `generateTransasctions`, msg: ``, end: true});
    return txs;
  }

  private transactionInstance(alts: any, ixs: any, latestBlockhash: web3.BlockhashWithExpiryBlockHeight) {
    return Transaction2.new(
      this.payerKey,
      alts,
      this.generalUtility,
      ixs,
      latestBlockhash,
    );
  }

  /**
   * Generate nonde advance instruction (dummy instruction)
   */
  private nonceAdvanceIx(noncePubkey: web3.PublicKey): web3.TransactionInstruction {
    // Generate dummy nonce ix
    return web3.SystemProgram.nonceAdvance({
      /** Nonce account */
      noncePubkey,
      /** Public key of the nonce authority */
      authorizedPubkey: this.payerKey,
    });
  }

  /**
   * Get nonce index
   *
   * @returns
   */
  private getNonceIndex(index: number) {
    const referenceIx = this.nonceAdvanceIx(web3.Keypair.generate().publicKey);
    const i = this.txs[index][1].findIndex(ix => {
      const isNonceAdvanceIx =
        ix.data.toString("base64") == referenceIx.data.toString("base64") &&
        ix.programId.toString() == referenceIx.programId.toString();
      return isNonceAdvanceIx;
    });
    return i;
  }

  /**
   * Get fee estimate
   *
   * @param priorityLevel
   * @returns
   */
  private async getFeeEstimate(priorityLevel: client.PriorityLevel): Promise<number> {
    return await this.getFeeEstimate2(
      priorityLevel,
      Transaction2.new(
        this.payerKey,
        this.txs[0][0],
        this.generalUtility,
        this.txs[0][1],
      ).txMetadataResponse
    );
  }

  private async getFeeEstimate2(
    priorityLevel: client.PriorityLevel,
    txMetadataResponse: TransactionMetadataResponse, // todo: figure out how to skip requiring tx
  ) {
    // Get fee estimate by simulating the transaction
    const startTime = new Date().getTime() / 1000;
    Log(`addPriorityFeeIx: Starting getFeeEstimate function`);
    let estimate = await getFeeEstimate(
      this.generalUtility,
      priorityLevel,
      txMetadataResponse
    );
    Log(`addPriorityFeeIx: Starting getFeeEstimate function: Elapsed Time: ${(new Date().getTime() / 1000) - startTime}`);

    return estimate;
  }
}