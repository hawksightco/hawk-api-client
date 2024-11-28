import * as client from "@hawksightco/swagger-client";
import * as web3 from "@solana/web3.js";
import axios from "axios";
import {
  MeteoraPoolInfo,
  ResponseWithStatus,
  TransactionMetadata,
  TransactionMetadataResponse,
  TokenAccountData,
  CreateAtaIdempotentParams,
  GetMintsFromInstructionParams,
  Instruction,
} from "./types";
import { GeneralUtility } from "./classes/GeneralUtility";
import { CreateTxMetadata } from "./classes/CreateTxMetadata";
import { IYF_MAIN, ORCA_WHIRLPOOL_PROGRAM, WSOL_MINT } from "./addresses";
import { AppError } from "./errors";
import { snakeCase } from "lodash";
import { sha256 } from "js-sha256";
import BN from "bn.js";
import { createAssociatedTokenAccountIdempotentInstruction, createCloseAccountInstruction, createSyncNativeInstruction } from "@solana/spl-token";

export const METEORA_API_URL = "https://dlmm-api.meteora.ag";

/**
 * Asynchronously creates transaction metadata based on the provided transaction parameters and network state.
 * This includes constructing a transaction with given instructions, calculating fees, and optionally handling priority fees.
 *
 * @param connection The active Solana blockchain connection used to fetch state and simulate the transaction.
 * @param payer The public key (as a string) of the payer for the transaction, responsible for fees.
 * @param data An object containing necessary information to construct the transaction, such as:
 *        - addressLookupTableAddresses: Array of addresses for lookup tables.
 *        - computeBudgetInstructions: Array of instructions for setting compute budget.
 *        - description: Description of the transaction.
 *        - estimatedFeeInSOL: Estimated fee in SOL units.
 * @returns A promise resolving to an object containing the transaction metadata including the description,
 *          estimated fee, and the transaction object itself.
 * @throws Error if there is an issue in constructing the transaction or during simulation which includes logs of errors.
 */
export async function createTxMetadata(
  generalUtility: GeneralUtility,
  connection: web3.Connection,
  payer: string,
  data: TransactionMetadataResponse,
): Promise<TransactionMetadata> {
  return await CreateTxMetadata.instance().createTxMetadata(
    generalUtility,
    connection,
    payer,
    data,
  )
}

/**
 * Wraps the result of an API call or operation in an object containing status information.
 * If the result status is 200, applies a success function to the data.
 * @param result The result object containing the HTTP status code and response data.
 * @param successFn A function to be applied to the response data in case of success.
 * @returns A promise that resolves to an object containing status information and the transformed or original response data.
 * The response data may be of type Out if the success function is applied, or type Response if not.
 */
export async function resultOrError<Response, Out>(
  result: { status: number, data: Response },
  successFn: (data: Response) => Promise<Out>
): Promise<ResponseWithStatus<Out>> {
  if (result.status === 200) {
    // If the status is 200, apply the success function to the data
    return {
      status: result.status,
      data: await successFn(result.data),
    };
  } else {
    console.error(`Error:`)
    console.error(result.data);
    throw new Error();
  }
}

/**
 * Retrieves an estimate of the priority fee for a transaction using the provided connection.
 *
 * @param connection The web3 connection object used for interacting with the blockchain.
 * @param priorityLevel The priority level of the transaction.
 * @param versionedTransaction The versioned transaction object for which the fee estimate is needed.
 * @returns A Promise resolving to the estimated priority fee for the transaction.
 */
export async function getFeeEstimate(
  generalUtility: GeneralUtility,
  priority: client.PriorityLevel,
  transaction: TransactionMetadataResponse
): Promise<number> {
  const response = await generalUtility.getPriorityFeeEstimate({
    priority,
    transaction,
  });
  return (await resultOrError<client.PriorityFeeEstimate, number>(
    response,
    async (result) => {
      let priorityFee: number;
      if (priority === client.PriorityLevel.Default || priority === client.PriorityLevel.Medium) {
        priorityFee = result.feeLevels!._default as number;
      } else if (priority === client.PriorityLevel.High) {
        priorityFee = result.feeLevels!.high as number;
      } else if (priority === client.PriorityLevel.VeryHigh) {
        priorityFee = result.feeLevels!.high as number;
      } else {
        const max = result.feeLevels!._default as number;
        const min = result.feeLevels!.low as number;
        priorityFee = min + ((max - min) / 2);

      }
      return result.priorityFeeEstimate as number
    },
  )).data
}

/**
 * Returns a meteora pool
 *
 * @param poolAddress Address of the meteora pool
 * @returns {Promise<MeteoraPoolInfo>}A promise that resolves to an object of Meteora pool information.
 */
export async function getMeteoraPool(poolAddress: string): Promise<MeteoraPoolInfo> {
  try {
    const response = await axios.get<MeteoraPoolInfo>(`${METEORA_API_URL}/pair/${poolAddress}`);
    const poolInfo = response.data;

    return poolInfo;
  } catch (error) {
    console.error(`Failed to fetch Meteora pool info for address ${poolAddress}:`, error);
    throw new Error('Could not retrieve Meteora pool information.');
  }
}

/**
 * Generate transaction meta object
 *
 * @param params
 * @returns
 */
export async function createTransactionMeta(params: {
  payer: web3.PublicKey;
  description: string;
  addressLookupTableAddresses: string[];
  mainInstructions: web3.TransactionInstruction[];
}): Promise<TransactionMetadataResponse> {
  const addressLookupTableAddresses = [];
  const pubkeys: string[] = [];
  const mainInstructions = params.mainInstructions.map((ix) => {
    return {
      accounts: ix.keys.map((account) => {
        const pubkey = account.pubkey.toString();
        pubkeys.push(pubkey);
        return {
          isSigner: account.isSigner,
          isWritable: account.isWritable,
          pubkey,
        };
      }),
      data: ix.data.toString("base64"),
      programId: ix.programId.toString(),
    };
  });

  addressLookupTableAddresses.push(...params.addressLookupTableAddresses);
  const signature = "";
  return {
    description: params.description,
    estimatedFeeInSOL: "",
    addressLookupTableAddresses,
    computeBudgetInstructions: [],
    mainInstructions,
    payer: params.payer.toString(),
    signature,
  };
}

/**
 * Generate UserPDA
 *
 * @param userWallet
 * @param farm
 * @returns
 */
export function generateUserPda(
  userWallet: web3.PublicKey,
  farm: web3.PublicKey = new web3.PublicKey(
    "7jLQhREMxXjKdpwVuN6gwsWt3BNfAg9WqbepffPbi4ww"
  )
): web3.PublicKey {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("multi-user"), farm.toBuffer(), userWallet.toBuffer()],
    new web3.PublicKey("FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P")
  );
  return pda;
}

export function generateAta(owner: web3.PublicKey, mint: web3.PublicKey) {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [
      owner.toBuffer(),
      new web3.PublicKey(
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      ).toBuffer(),
      mint.toBuffer(),
    ],
    new web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
  );
  return pda;
}

/**
 * Generate Orca Position PDA
 *
 * @param userWallet
 * @param farm
 * @returns
 */
export function generateOrcaPositionPDA(
  positionMint: web3.PublicKey
): web3.PublicKey {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("position", "utf-8"), positionMint.toBuffer()],
    ORCA_WHIRLPOOL_PROGRAM
  );
  return pda;
}

/**
 * Generate the PDA for the userPda's storage account
 *
 * @param userPda
 * @param mint
 * @returns Storage Account owned by the user pda
 */
export function generateUserPdaStorageAccount(
  userPda: web3.PublicKey,
  mint: web3.PublicKey
) {
  const [storageAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("storage-token"), mint.toBuffer(), userPda.toBuffer()],
    IYF_MAIN
  );
  return storageAccount;
}

/**
 * Convert transaction to instructions
 *
 * @param txns
 * @returns
 */
export function getIxs(txns: web3.Transaction | web3.Transaction[]) {
  const ixs: web3.TransactionInstruction[] = [];
  if (typeof (txns as web3.Transaction[]).length === "number") {
    const txs = txns as web3.Transaction[];
    for (const tx of txs) {
      ixs.push(...tx.instructions);
    }
  } else {
    const txs = txns as web3.Transaction;
    ixs.push(...txs.instructions);
  }
  return ixs;
}

/**
 * Check if anchor instruction matches
 *
 * @param data
 * @param compareTo
 */
export function sighashMatch(
  data: Buffer,
  compareTo: string,
  prefix?: string
): boolean;

/**
 * Check if anchor instruction matches
 *
 * @param data
 * @param compareTo
 */
export function sighashMatch(
  data: Buffer,
  compareTo: Buffer,
  prefix?: string
): boolean;

/**
 * Check if anchor instruction matches
 *
 * @param data
 * @param compareTo
 */
export function sighashMatch(
  data: Buffer,
  compareTo: Buffer | string,
  prefix?: string
): boolean {
  if (typeof compareTo === "string") {
    compareTo = sighash(compareTo, prefix);
  }

  if (data.length < 8) {
    throw new AppError(`Data is not an anchor instruction`);
  }
  if (compareTo.length < 8) {
    throw new AppError(`compareTo is not a valid sighash`);
  }
  for (let i = 0; i < 8; i++) {
    if (data[i] !== compareTo[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Anchor sighash function
 *
 * @param ixName
 * @returns
 */
export function sighash(ixName: string, prefix: string = "global"): Buffer {
  const name = snakeCase(ixName);
  const preimage = `${prefix}:${name}`;
  return Buffer.from(sha256.digest(preimage)).subarray(0, 8);
}

/**
 * Determine whether given token account exists
 * @param publicKeys
 */
export async function tokenAccountExists(
  connection: web3.Connection,
  params: {
    owner: web3.PublicKey;
    mint: web3.PublicKey;
  }[]
): Promise<
  {
    tokenKey: web3.PublicKey;
    exists: boolean;
  }[]
> {
  const tokenKeys = params.map((p) => generateAta(p.owner, p.mint));
  const accountInfos = await connection.getMultipleAccountsInfo(tokenKeys);
  const result = accountInfos.map((accountInfo, index) => {
    if (accountInfo === null || accountInfo.data.length !== 165) {
      return { tokenKey: tokenKeys[index], exists: false };
    }
    const tokenInfo = parseTokenAccountData(accountInfo.data);
    const tokenKey = generateAta(tokenInfo.owner, tokenInfo.mint);
    return {
      tokenKey: tokenKeys[index],
      exists: tokenKeys[index].equals(tokenKey),
    };
  });
  return result;
}

/**
 * Decodes a buffer into an object describing the token account.
 * @param data - The buffer containing raw account data.
 * @returns An object with mint, owner, and amount properties.
 */
export function parseTokenAccountData(data: Buffer): TokenAccountData {
  return {
    mint: new web3.PublicKey(data.subarray(0, 32)),
    owner: new web3.PublicKey(data.subarray(32, 64)),
    amount: new BN(data.subarray(64, 72), "le"),
  };
}

/**
 * Creates an array of idempotent associated token account creation instructions.
 *
 * This function generates instructions to create associated token accounts (ATAs) for the provided accounts.
 * The instructions are idempotent, meaning they can be safely executed multiple times without changing the result beyond the initial application.
 *
 * @param {CreateAtaIdempotentParams} params - The parameters for creating ATA instructions.
 * @param {Array<{ payer: web3.PublicKey, owner: web3.PublicKey, mint: web3.PublicKey }>} params.accounts - An array of objects containing:
 *    - `payer`: The public key of the account paying for the transaction.
 *    - `owner`: The public key of the account owner.
 *    - `mint`: The public key of the mint (token) for which the ATA is being created.
 *
 * @returns {web3.TransactionInstruction[]} An array of transaction instructions for creating the associated token accounts.
 *
 * @example
 * const accounts = [
 *   { payer: payerPublicKey, owner: ownerPublicKey, mint: mintPublicKey },
 *   { payer: anotherPayerPublicKey, owner: anotherOwnerPublicKey, mint: anotherMintPublicKey }
 * ];
 * const instructions = createAtaIdempotent({ accounts });
 * console.log(instructions); // Logs an array of TransactionInstruction objects.
 */
export function createAtaIdempotentIxs({
  accounts,
}: CreateAtaIdempotentParams): web3.TransactionInstruction[] {
  const result: web3.TransactionInstruction[] = [];
  for (const account of accounts) {
    const { payer, owner, mint } = account;
    const ata = generateAta(owner, mint);
    const ataIx = createAssociatedTokenAccountIdempotentInstruction(
      payer,
      ata,
      owner,
      mint
    );
    result.push(ataIx);
  }
  return result;
}

/**
 * Extracts unique mint addresses from a list of Solana instructions based on specific criteria.
 *
 * @param {GetMintsFromInstructionParams} params - The parameters for extracting mint addresses.
 * @param {web3.TransactionInstruction[]} params.instructions - An array of Solana instructions to search through.
 * @param {Record<string, { programId: string, mintIndices: number[] }>} params.find - A record where each key is a string identifier and the value is an object containing:
 *    - programId: The program ID to match against the instruction's program ID.
 *    - mintIndices: An array of indices that point to the mint addresses within the instruction's keys.
 *
 * @returns {web3.PublicKey[]} An array of unique mint addresses (as PublicKey objects) found in the provided instructions.
 *
 * @example
 * const instructions = [/* array of web3.TransactionInstruction objects * /];
 * const findCriteria = {
 *   "exampleProgram": {
 *     programId: "ExampleProgramId123456789",
 *     mintIndices: [0, 2]
 *   }
 * };
 * const mints = getMintsFromInstruction({ instructions, find: findCriteria });
 * console.log(mints); // Logs an array of unique PublicKey objects.
 */
export function getMintsFromInstruction({
  instructions,
  find,
}: GetMintsFromInstructionParams): web3.PublicKey[] {
  const mints: Record<string, true> = {};

  // Iterate through each instruction
  for (const ix of instructions) {
    // Iterate through each key in the find record
    for (const id in find) {
      // Check if the instruction data matches the sighash and the program ID matches
      try {
        if (
          sighashMatch(ix.data, sighash(id)) &&
          ix.programId.toBase58() == find[id].programId
        ) {
          // Iterate through each mint index specified in the find record
          for (const index of find[id].mintIndices) {
            const address = ix.keys[index].pubkey.toString();
            mints[address] = true; // Mark the address as found
          }
        }
      } catch {}
    }
  }

  // Convert the unique mint addresses to web3.PublicKey objects
  const result: web3.PublicKey[] = [];
  for (const mint in mints) {
    result.push(new web3.PublicKey(mint));
  }

  return result;
}

/**
 * Creates instructions to wrap SOL to wSOL if the provided mint matches the wrapped SOL mint.
 *
 * This function takes a user's wallet public key and an array of mint-amount pairs. It filters the pairs to find those
 * where the mint is the wrapped SOL mint (`So11111111111111111111111111111111111111112`). For each of these pairs, it
 * generates instructions to wrap SOL to wSOL, owned by the target wallet.
 *
 * If no pairs match the wrapped SOL mint, the function will return an empty array.
 *
 * @param {web3.PublicKey} userWallet - The public key of the user's wallet.
 * @param {web3.PublicKey} payer - The public key of transaction payer.
 * @param {Array<{mint: web3.PublicKey, amount: BN}>} params - An array of objects, each containing:
 *    - `mint`: The public key of the mint.
 *    - `amount`: The amount of the token to be wrapped.
 *
 * @returns {Array<web3.TransactionInstruction>} - An array of transaction instructions to wrap SOL to wSOL.
 *    If no mint matches the wrapped SOL mint, the function returns an empty array.
 */
export function wrapSolIfMintIsWsol(
  userWallet: web3.PublicKey,
  payer: web3.PublicKey,
  params: { mint: web3.PublicKey; amount: BN }[]
): web3.TransactionInstruction[] {
  return params
    .filter(
      (v) => v.mint.toBase58() === "So11111111111111111111111111111111111111112"
    )
    .map((v) => wrapSolToWsol({ payer, owner: userWallet, amount: v.amount }))
    .flat();
}

export function wrapSolToWsol({
  payer,
  owner,
  amount,
}: {
  payer: web3.PublicKey,
  owner: web3.PublicKey,
  amount?: BN,
}): web3.TransactionInstruction[] {
  const wSolAccount = generateAta(owner, WSOL_MINT);

  // Step 1: Create ATA account IX
  const ataIx = createAssociatedTokenAccountIdempotentInstruction(
    payer,
    wSolAccount,
    owner,
    WSOL_MINT,
  );

  if (amount !== undefined) {
    // Step 1: Transfer lamports from authority to wSolAccount
    const transferIx = web3.SystemProgram.transfer({
      /** Account that will transfer lamports */
      fromPubkey: payer,
      /** Account that will receive transferred lamports */
      toPubkey: wSolAccount,
      /** Amount of lamports to transfer */
      lamports: BigInt(amount.toString()),
    });

    // Step 2: Convert wSolAccount into wrapped sol account
    const wrapSolIx = createSyncNativeInstruction(wSolAccount);

    // Return instructions
    return [ataIx, transferIx, wrapSolIx];
  }

  // Just return ATA creation
  return [ataIx]
}

/**
 * Creates instructions to unwrap wSOL to SOL if the provided mint matches the wrapped SOL mint.
 *
 * This function takes a user's wallet public key and an array of mint public keys. It filters the array to find mints
 * that match the wrapped SOL mint (`So11111111111111111111111111111111111111112`). For each of these mints, it
 * generates instructions to unwrap wSOL to SOL, with the user's wallet as the authority.
 *
 * If no mints match the wrapped SOL mint, the function will return an empty array.
 *
 * @param {web3.PublicKey} userWallet - The public key of the user's wallet.
 * @param {web3.PublicKey[]} mints - An array of public keys representing the mints.
 *
 * @returns {web3.TransactionInstruction[]} - An array of transaction instructions to unwrap wSOL to SOL.
 *    If no mint matches the wrapped SOL mint, the function returns an empty array.
 */
export function unwrapSolIfMintIsWsol(
  userWallet: web3.PublicKey,
  mints: web3.PublicKey[]
): web3.TransactionInstruction[] {
  return mints
    .filter(
      (mint) =>
        mint.toBase58() === "So11111111111111111111111111111111111111112"
    )
    .map(() => unwrapWsolToSol({ authority: userWallet }))
    .flat();
}

export function unwrapWsolToSol({
  authority,
}: {
  authority: web3.PublicKey,
}): web3.TransactionInstruction {
  const wSolAccount = generateAta(authority, WSOL_MINT);

  // account: PublicKey,
  // destination: PublicKey,
  // authority: PublicKey,
  // multiSigners: (Signer | PublicKey)[] = [],
  // programId = TOKEN_PROGRAM_ID

  // Create close account instruction (transfers native SOL to authority)
  const closeIx = createCloseAccountInstruction(
    wSolAccount,
    authority,
    authority,
  );

  // Return instructions
  return closeIx;
}

/**
 * Checks if token accounts for specified mints exist for a given user wallet.
 *
 * This function takes a user's wallet public key and an array of mint public keys. It maps these mints to token seeds
 * (objects containing mint and owner information) and checks if the token accounts exist using the `tokenAccountExists` function.
 *
 * If a mint corresponds to wrapped SOL (`So11111111111111111111111111111111111111112`) and the token account does not exist,
 * it will not throw an error. For other mints, if the token account does not exist, the function will throw an error.
 *
 * @param {web3.PublicKey} userWallet - The public key of the user's wallet.
 * @param {web3.PublicKey[]} mints - An array of public keys representing the mints.
 *
 * @returns {Promise<void>} - A promise that resolves if all non-wrapped SOL token accounts exist, otherwise it throws an error.
 *
 * @throws {Error} - Throws an error if a token account for a mint (other than wrapped SOL) does not exist.
 */
export async function inputTokenExists(
  connection: web3.Connection,
  userWallet: web3.PublicKey,
  mints: web3.PublicKey[]
): Promise<void> {
  const tokenSeeds = mints.map((mint) => {
    return { mint, owner: userWallet };
  });
  const resultMap = await tokenAccountExists(connection, tokenSeeds);
  resultMap.map((result, index) => {
    const tokenKey = result.tokenKey;
    const token = tokenSeeds[index];
    const tokenIsWsol =
      token.mint.toString() === "So11111111111111111111111111111111111111112";
    if (tokenIsWsol && !result.exists) {
    } else if (!result.exists) {
      throw new Error(
        `Token: ${tokenKey} owned by ${token.owner} does not exist. Mint: ${token.mint}`
      );
    }
  });
}

type JupiterRouteIxParams = {
  routePlan: Buffer,
  quotedOutAmount: BN,
  slippageBps: number,
  platformFeeBps: number,
}

/**
 * Get Jupiter route ix parameters
 *
 * @param data
 */
export function getJupiterRouteIxParams(data: Buffer): JupiterRouteIxParams {
  const boolIndices = [8, 17, 18, 21, 23, 58];
  const sideIndices = [12, 15, 16, 24, 27, 28, 39];

  const vecSize = new BN(data.subarray(8, 12), 10, 'le').toNumber();
  let lastIndex = 0;
  for (let i = 0; i < vecSize; i++) {
    if (lastIndex === 0) lastIndex = 12;
    const swapEnumId = data[lastIndex];

    if (boolIndices.includes(swapEnumId) || sideIndices.includes(swapEnumId))
      lastIndex += 4 + 1;

    // Swap is "Symmetry"
    else if (swapEnumId == 29)
      lastIndex += 4 + 16;

    // Swap is "StakeDexSwapViaStake" or "StakeDexPrefundWithdrawStakeAndDepositStake"
    else if (swapEnumId == 33 || swapEnumId == 41)
      lastIndex += 4 + 4;

    // Swap is "Clone"
    else if (swapEnumId == 42)
      lastIndex += 4 + 3

    // Swap is "SanctumS"
    else if (swapEnumId == 43)
      lastIndex += 4 + 10

    // Swap is "SanctumSAddLiquidity" or "SanctumSRemoveLiquidity"
    else if (swapEnumId == 44 || swapEnumId == 45)
      lastIndex += 4 + 5;

    // Swap is "WhirlpoolSwapV2"
    else if (swapEnumId == 47) {
      const vecSize = new BN(data.subarray(lastIndex + 1, lastIndex + 1 + 4), 10, 'le').toNumber();
      lastIndex = 17 + 1 + 4 + (vecSize * 2);

    // Rest of the swaps have the standard 4-bytes
    } else
      lastIndex += 4;
  }

  const routePlan = data.subarray(8, lastIndex);
  const quotedOutAmount = new BN(data.subarray(lastIndex + 8, lastIndex + 16), 10, 'le');
  const slippageBps = new BN(data.subarray(lastIndex + 16, lastIndex + 18), 10, 'le').toNumber();
  const platformFeeBps = data[lastIndex + 18];

  return {
    routePlan,
    quotedOutAmount,
    slippageBps,
    platformFeeBps,
  }
}

/**
 * Converts tx metadata to versioned transaction
 *
 * @param txMessage
 */
export async function toVersionedTransaction(connection: web3.Connection, txMessage: TransactionMetadataResponse) {
  const alts = await stringToAlt(connection, txMessage.addressLookupTableAddresses);
  const result = new web3.VersionedTransaction(
    new web3.TransactionMessage({
      instructions: txMessage.mainInstructions.map((ix) => ixStrToWeb3Ix(ix)),
      payerKey: new web3.PublicKey(txMessage.payer),
      recentBlockhash: web3.PublicKey.default.toString(),
    }).compileToV0Message(alts)
  );
  return result;
}

export function ixStrToWeb3Ix(ix: Instruction) {
  return {
    keys: ix.accounts.map((account) => {
      return {
        isSigner: account.isSigner,
        isWritable: account.isWritable,
        pubkey: new web3.PublicKey(account.pubkey),
      };
    }),
    data: Buffer.from(ix.data, "base64"),
    programId: new web3.PublicKey(ix.programId),
  };
}

export async function stringToAlt(
  connection: web3.Connection,
  alts: string[]
): Promise<web3.AddressLookupTableAccount[]> {
  const c = CreateTxMetadata.instance();
  c.setConnection(connection);
  return await c.stringToAlt(alts);
}
