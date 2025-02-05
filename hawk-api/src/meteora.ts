import DLMM, { calculateSpotDistribution, calculateNormalDistribution, calculateBidAskDistribution, ClmmProgram, LbPosition, StrategyType, PositionV2, Position, LbPairAccount, LbPair } from '@meteora-ag/dlmm';
import BN from "bn.js";
import * as web3 from "@solana/web3.js";
import { AppError } from './errors';
import {
  METEORA_DLMM_PROGRAM,
  METEORA_EVENT_AUTHORITY,
  SOME_METEORA_DLMM_POOL,
  TOKEN_PROGRAM_ID,
} from './addresses';
import { createAtaIdempotentIxs, getIxs, getMintsFromInstruction, wrapSolIfMintIsWsol, unwrapSolIfMintIsWsol, inputTokenExists, sighashMatch, sighash, generateUserPdaStorageAccount, generateAta } from './functions';
import { depositMultipleToken, withdrawMultipleToken } from './hawksight';
import { MeteoraToHawksightFn } from './types';
import { Anchor } from './anchor';
import { Log } from './classes/Logging';
import bs58 from "bs58";

export class MeteoraDLMM {
  private constructor(public readonly dlmm: DLMM) {}

  readonly pubkey = this.dlmm.pubkey;

  private static _program: ClmmProgram;
  private static _instance: MeteoraDLMM;
  private static _poolAddress: web3.PublicKey;
  private static _connection: web3.Connection;

  static async create(
    connection: web3.Connection,
    poolAddress: web3.PublicKey
  ): Promise<MeteoraDLMM> {
    if (this._instance == undefined || this._poolAddress !== poolAddress || this._connection.rpcEndpoint !== connection.rpcEndpoint) {
      const dlmm = await DLMM.create(connection, poolAddress);
      this._poolAddress = poolAddress;
      this._instance = new MeteoraDLMM(dlmm);
      this._program = dlmm.program;
    }
    return this._instance;
  }

  /**
   * Meteora DLMM Program
   *
   * @param connection
   */
  static async program(connection: web3.Connection): Promise<ClmmProgram> {
    if (this._program == undefined) {
      const dlmm = await DLMM.create(connection, SOME_METEORA_DLMM_POOL);
      this._program = dlmm.program;
    }
    return this._program;
  }

  getXYAmountDistribution(
    distribution: "SPOT" | "CURVE" | "BID-ASK",
    activeBin: { binId: number; price: string },
    lowerRange: number,
    upperRange: number
  ) {
    let xYAmountDistribution;
    const bins = [];
    if (lowerRange >= upperRange) {
      throw new AppError(
        `Lower range (${lowerRange}) cannot be greater than or less than upper range ((${upperRange})).`
      );
    }
    for (let i = lowerRange; i <= upperRange; i++) {
      bins.push(i);
    }
    if (distribution === "SPOT") {
      xYAmountDistribution = calculateSpotDistribution(activeBin.binId, bins);
    } else if (distribution === "CURVE") {
      xYAmountDistribution = calculateNormalDistribution(activeBin.binId, bins);
    } else if (distribution === "BID-ASK") {
      xYAmountDistribution = calculateBidAskDistribution(activeBin.binId, bins);
    } else {
      throw new AppError(
        `Invalid strategy ${distribution}. Can only be SPOT, CURVE, or BID-ASK.`
      );
    }
    return xYAmountDistribution;
  }

  async getActiveBin() {
    return await this.dlmm.getActiveBin();
  }

  async getPositionsByUserAndLbPair(userPubKey: web3.PublicKey) {
    return await this.dlmm.getPositionsByUserAndLbPair(userPubKey);
  }

  /**
   * Initializes a position and adds liquidity to the specified strategy, with various steps including
   * handling wrapped SOL tokens, depositing tokens, adding liquidity, and handling dust withdrawals.
   *
   * @param {web3.PublicKey} userWallet - The public key of the user's wallet executing the transaction.
   * @param {web3.PublicKey} payer - The public key of the transaction payer.
   * @param {Object} params - The parameters for initializing the position and adding liquidity.
   * @param {web3.PublicKey} params.positionPubKey - The public key of the position to be initialized.
   * @param {BN} params.totalXAmount - The total amount of X tokens to be used for liquidity.
   * @param {BN} params.totalYAmount - The total amount of Y tokens to be used for liquidity.
   * @param {Object} params.strategy - The strategy details for adding liquidity.
   * @param {number} params.strategy.maxBinId - The maximum bin ID for the strategy.
   * @param {number} params.strategy.minBinId - The minimum bin ID for the strategy.
   * @param {StrategyType} params.strategy.strategyType - The type of strategy to be applied.
   * @param {web3.PublicKey} params.user - The public key of the user executing the transaction.
   * @param {number} [params.slippage] - Optional slippage tolerance for the transaction.
   *
   * @returns {Promise<web3.TransactionInstruction[]>} - A promise that resolves to an array of transaction instructions.
   *
   * @throws {Error} - Throws an error if input token(s) do not exist on the blockchain.
   */
  async initializePositionAndAddLiquidityByStrategy(
    userWallet: web3.PublicKey,
    payer: web3.PublicKey,
    params: {
      positionPubKey: web3.PublicKey;
      totalXAmount: BN;
      totalYAmount: BN;
      strategy: {
        maxBinId: number;
        minBinId: number;
        strategyType: StrategyType;
      };
      user: web3.PublicKey;
      slippage?: number;
      skipInputTokenCheck?: boolean;
    },
    meteoraToHawksight: MeteoraToHawksightFn
  ): Promise<InitializePositionAndAddLiquidityByStrategyBuilder> {
    if (!!!params.skipInputTokenCheck) {
      // Throw error if input token(s) do not exist on blockchain
      await inputTokenExists(
        Anchor.instance().connection,
        userWallet, [
        this.dlmm.tokenX.publicKey,
        this.dlmm.tokenY.publicKey,
      ]);
    }

    // Generate InitializePosition and AddLiquidityByStrategy instruction from Meteora API
    const txn = await this.dlmm.initializePositionAndAddLiquidityByStrategy(
      params
    );

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        AddLiquidityByStrategy: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [7, 8],
        },
        AddLiquidityByStrategyOneSide: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [5],
        },
      },
    });

    return new InitializePositionAndAddLiquidityByStrategyBuilder(
      // Step 1: Init wSOL token account for user wallet (if X or Y token is wSOL)
      wrapSolIfMintIsWsol(userWallet, payer, [
        { mint: this.dlmm.tokenX.publicKey, amount: params.totalXAmount },
        { mint: this.dlmm.tokenY.publicKey, amount: params.totalYAmount },
      ]),

      // Step 2: Deposit X and Y token to UserPDA
      await depositMultipleToken({
        payer: userWallet,
        deposit: [
          { mint: this.dlmm.tokenX.publicKey, amount: params.totalXAmount },
          { mint: this.dlmm.tokenY.publicKey, amount: params.totalYAmount },
        ],
      }),

      // Step 3: Initialize position and add liquidity by strategy
      await meteoraToHawksight({
        ixs,
        userPda: params.user,
        authority: userWallet,
      }),

      // Step 4: Withdraw dust to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 5: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  /**
   * Adds liquidity to an existing position according to a specified strategy.
   *
   * This method involves multiple steps including checking for token existence, handling wrapped SOL (wSOL), depositing tokens,
   * adding liquidity, and handling dust withdrawals. It ensures that all necessary preparations and operations are performed
   * to add liquidity based on the provided strategy.
   *
   * @param {web3.PublicKey} userWallet - The public key of the user's wallet executing the transaction.
   * @param {web3.PublicKey} payer - The public key of the transaction payer.
   * @param {Object} params - The parameters for adding liquidity to the position.
   * @param {web3.PublicKey} params.positionPubKey - The public key of the position to add liquidity to.
   * @param {BN} params.totalXAmount - The total amount of X tokens to be used for liquidity.
   * @param {BN} params.totalYAmount - The total amount of Y tokens to be used for liquidity.
   * @param {Object} params.strategy - The strategy details for adding liquidity.
   * @param {number} params.strategy.maxBinId - The maximum bin ID for the strategy.
   * @param {number} params.strategy.minBinId - The minimum bin ID for the strategy.
   * @param {StrategyType} params.strategy.strategyType - The type of strategy to be applied.
   * @param {web3.PublicKey} params.user - The public key of the user executing the transaction.
   *
   * @returns {Promise<web3.TransactionInstruction[]>} - A promise that resolves to an array of transaction instructions.
   *
   * @throws {Error} - Throws an error if input token(s) do not exist on the blockchain.
   */
  async addLiquidityByStrategy(
    userWallet: web3.PublicKey,
    payer: web3.PublicKey,
    params: {
      positionPubKey: web3.PublicKey;
      totalXAmount: BN;
      totalYAmount: BN;
      strategy: {
        maxBinId: number;
        minBinId: number;
        strategyType: StrategyType;
      };
      user: web3.PublicKey;
      slippage?: number;
      skipInputTokenCheck: boolean;
    },
    meteoraToHawksight: MeteoraToHawksightFn
  ): Promise<AddLiquidityByStrategyBuilder> {
    if (!!!params.skipInputTokenCheck) {
      // Throw error if input token(s) do not exist on blockchain
      await inputTokenExists(
        Anchor.instance().connection,
        userWallet, [
        this.dlmm.tokenX.publicKey,
        this.dlmm.tokenY.publicKey,
      ]);
    }

    // AddLiquidityByStrategy instruction from Meteora API
    const txn = await this.dlmm.addLiquidityByStrategy(params);

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        AddLiquidityByStrategy: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [7, 8],
        },
        AddLiquidityByStrategyOneSide: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [5],
        },
      },
    });
    return new AddLiquidityByStrategyBuilder(
      // Step 1: Init wSOL token account for user wallet (if X or Y token is wSOL)
      wrapSolIfMintIsWsol(userWallet, payer, [
        { mint: this.dlmm.tokenX.publicKey, amount: params.totalXAmount },
        { mint: this.dlmm.tokenY.publicKey, amount: params.totalYAmount },
      ]),

      // Step 2: Deposit X and Y token to UserPDA
      await depositMultipleToken({
        payer: userWallet,
        deposit: [
          { mint: this.dlmm.tokenX.publicKey, amount: params.totalXAmount },
          { mint: this.dlmm.tokenY.publicKey, amount: params.totalYAmount },
        ],
      }),

      // Step 3: Add liquidity by strategy
      await meteoraToHawksight({
        ixs,
        userPda: params.user,
        authority: userWallet,
      }),

      // Step 4: Withdraw dust to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 5: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  /**
   * Removes liquidity from an existing position.
   *
   * This method communicates with the DLMM (Dynamic Liquidity Market Maker) to remove liquidity
   * from a specified trading position. It filters the transaction instructions to include only those
   * relevant to the Meteora DLMM program.
   *
   * @param {web3.PublicKey} userWallet - The public key of the user's wallet executing the transaction.
   * @param {web3.PublicKey} payer - The public key of the transaction payer.
   * @param {Object} params - The parameters for removing liquidity from the position.
   * @param {web3.PublicKey} params.user - The public key of the user executing the transaction.
   * @param {web3.PublicKey} params.position - The public key of the position from which liquidity is being removed.
   * @param {number[]} params.binIds - An array of bin IDs indicating which bins to remove liquidity from.
   * @param {BN} params.bps - The basis points (in BN) indicating the proportion of liquidity to remove.
   * @param {boolean} [params.shouldClaimAndClose] - Optional flag to indicate whether the position should be claimed and closed after removing liquidity.
   *
   * @returns {Promise<web3.TransactionInstruction[]>} - A promise that resolves to an array of transaction instructions relevant to the Meteora DLMM program.
   */
  async removeLiquidity(
    userWallet: web3.PublicKey,
    payer: web3.PublicKey,
    params: {
      user: web3.PublicKey;
      position: web3.PublicKey;
      binIds: number[];
      bps: BN;
      shouldClaimAndClose?: boolean;
    },
    meteoraToHawksight: MeteoraToHawksightFn
  ): Promise<RemoveLiquidityBuilder> {
    // Claim fees and/or rewards, remove liquidity, and possibly close position from Meteora API (if set)
    const txn = await this.dlmm.removeLiquidity(params);

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        RemoveLiquidity: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [7, 8],
        },
        RemoveLiquidityByRange: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [7, 8],
        },
        ClaimFee: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [9, 10],
        },
        ClaimReward: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [6],
        },
      },
    });
    return new RemoveLiquidityBuilder(
      // Step 1: Init ATA prior to withdrawal
      createAtaIdempotentIxs({
        accounts: mints.map((mint) => {
          return { owner: params.user, payer, mint };
        }),
      }),

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      await meteoraToHawksight({
        ixs,
        userPda: params.user,
        authority: userWallet,
      }),

      // Step 3: Withdraw tokens to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 4: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  /**
   * Claims all rewards for a specified position.
   *
   * This method communicates with the DLMM (Dynamic Liquidity Market Maker) to claim all rewards
   * for a given position. It filters the transaction instructions to include only those relevant
   * to the Meteora DLMM program. The method returns a `ClaimAllRewardsByPositionBuilder` object
   * which provides a structured way to build the necessary transaction instructions for the reward
   * claiming process.
   *
   * @param {web3.PublicKey} userWallet - The public key of the user's wallet executing the transaction.
   * @param {web3.PublicKey} payer - The public key of the transaction payer.
   * @param {Object} params - The parameters for claiming rewards.
   * @param {web3.PublicKey} params.owner - The public key of the owner of the position.
   * @param {LbPosition} params.position - The position object representing the liquidity position.
   * @param {Function} meteoraToHawksight - A function to convert Meteora instructions to Hawksight instructions.
   *
   * @returns {Promise<ClaimAllRewardsByPositionBuilder>} - A promise that resolves to a `ClaimAllRewardsByPositionBuilder` object.
   */
  async claimAllRewardsByPosition(
    userWallet: web3.PublicKey,
    payer: web3.PublicKey,
    params: {
      owner: web3.PublicKey;
      position: LbPosition;
    },
    meteoraToHawksight: MeteoraToHawksightFn
  ): Promise<ClaimAllRewardsByPositionBuilder> {
    // Claim all fees and rewards instruction from Meteora API
    const txn = await this.dlmm.claimAllRewardsByPosition(params);

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        ClaimFee: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [9, 10],
        },
        ClaimReward: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [6],
        },
      },
    });
    return new ClaimAllRewardsByPositionBuilder(
      // Step 1: Init ATA prior to withdrawal
      createAtaIdempotentIxs({
        accounts: mints.map((mint) => {
          return { owner: params.owner, payer, mint };
        }),
      }),

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      await meteoraToHawksight({
        ixs,
        userPda: params.owner,
        authority: userWallet,
      }),

      // Step 3: Withdraw tokens to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 4: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  /**
   * Closes a specified liquidity position.
   *
   * This method communicates with the DLMM (Dynamic Liquidity Market Maker) to close a given liquidity
   * position. It filters the transaction instructions to include only those relevant to the Meteora DLMM program.
   *
   * @param {Object} params - The parameters for closing the position.
   * @param {web3.PublicKey} params.owner - The public key of the owner of the position.
   * @param {LbPosition} params.position - The position object representing the liquidity position.
   *
   * @returns {Promise<web3.TransactionInstruction[]>} - A promise that resolves to an array of transaction instructions relevant to the Meteora DLMM program.
   */
  async closePosition(
    userWallet: web3.PublicKey,
    params: {
      owner: web3.PublicKey;
      position: LbPosition;
    },
    meteoraToHawksight: MeteoraToHawksightFn
  ): Promise<web3.TransactionInstruction[]> {
    // Close position from Meteora API
    const txn = await this.dlmm.closePosition(params);

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    return [
      // Step 1: Close meteora position
      ...(await meteoraToHawksight({
        ixs,
        userPda: params.owner,
        authority: userWallet,
      })),
    ];
    return ixs;
  }
}

/**
 * Meteora functions / transaction generators that we re-written for performance improvement purposes
 */
export class MeteoraFunctions {

  /**
   * Position cache (v1)
   */
  readonly positions_v1: Record<string, Position> = {};

  /**
   * Position cache (v2)
   */
  readonly positions_v2: Record<string, PositionV2> = {};

  /**
   * Pool cache
   */
  readonly pools: Record<string, LbPair> = {};

  /**
   * Claims all rewards for a specified position.
   *
   * This method communicates with the DLMM (Dynamic Liquidity Market Maker) to claim all rewards
   * for a given position. It filters the transaction instructions to include only those relevant
   * to the Meteora DLMM program. The method returns a `ClaimAllRewardsByPositionBuilder` object
   * which provides a structured way to build the necessary transaction instructions for the reward
   * claiming process.
   *
   * @param {web3.PublicKey} userWallet - The public key of the user's wallet executing the transaction.
   * @param {web3.PublicKey} payer - The public key of the transaction payer.
   * @param {Object} params - The parameters for claiming rewards.
   * @param {web3.PublicKey} params.owner - The public key of the owner of the position.
   * @param {LbPosition} params.position - The position object representing the liquidity position.
   * @param {Function} meteoraToHawksight - A function to convert Meteora instructions to Hawksight instructions.
   *
   * @returns {Promise<ClaimAllRewardsByPositionBuilder>} - A promise that resolves to a `ClaimAllRewardsByPositionBuilder` object.
   */
  async claimAllRewardsByPosition(
    connection: web3.Connection,
    userWallet: web3.PublicKey,
    payer: web3.PublicKey,
    params: {
      owner: web3.PublicKey,
      lbPair: web3.PublicKey,
      position: web3.PublicKey,
    },
    meteoraToHawksight: MeteoraToHawksightFn,
  ): Promise<ClaimAllRewardsByPositionBuilder> {

    // Generate claim fee and reward instruction (fast generator)
    const ixs = await this.claimFeeAndRewardIxs(
      connection,
      params.lbPair,
      params.position,
      params.owner,
    );

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        ClaimFee: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [9, 10],
        },
        ClaimReward: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [6],
        },
      },
    });
    return new ClaimAllRewardsByPositionBuilder(
      // Step 1: Init ATA prior to withdrawal
      createAtaIdempotentIxs({
        accounts: mints.map((mint) => {
          return { owner: params.owner, payer, mint };
        }),
      }),

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      await meteoraToHawksight({
        ixs,
        userPda: params.owner,
        authority: userWallet,
      }),

      // Step 3: Withdraw tokens to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 4: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  constants(program: ClmmProgram) {
    const CONSTANTS = Object.entries(program.idl.constants);
    const MAX_BIN_ARRAY_SIZE = new BN(
      (CONSTANTS.find(([k, v]) => (v as any).name == "MAX_BIN_PER_ARRAY")?.[1] as any).value ?? 0
    );
    const MAX_BIN_PER_POSITION = new BN(
      (CONSTANTS.find(([k, v]) => (v as any).name == "MAX_BIN_PER_POSITION")?.[1] as any).value ?? 0
    );
    const BIN_ARRAY_BITMAP_SIZE = new BN(
      (CONSTANTS.find(([k, v]) => (v as any).name == "BIN_ARRAY_BITMAP_SIZE")?.[1] as any).value ?? 0
    );
    const EXTENSION_BINARRAY_BITMAP_SIZE = new BN(
      (CONSTANTS.find(([k, v]) => (v as any).name == "EXTENSION_BINARRAY_BITMAP_SIZE")?.[1] as any)
        .value ?? 0
    );
    return {
      MAX_BIN_ARRAY_SIZE,
      MAX_BIN_PER_POSITION,
      BIN_ARRAY_BITMAP_SIZE,
      EXTENSION_BINARRAY_BITMAP_SIZE,
    }
  }

  deriveReserve(token: web3.PublicKey, lbPair: web3.PublicKey) {
    const [reserve] = web3.PublicKey.findProgramAddressSync([
      lbPair.toBuffer(),
      token.toBuffer(),
    ], METEORA_DLMM_PROGRAM);
    return reserve;
  }

  deriveBinArray(lbPair: web3.PublicKey, index: BN): web3.PublicKey {
    let binArrayBytes;
    if (index.isNeg()) {
      binArrayBytes = new Uint8Array(
        index.toTwos(64).toArrayLike(Buffer, "le", 8)
      );
    } else {
      binArrayBytes = new Uint8Array(index.toArrayLike(Buffer, "le", 8));
    }
    const [binArray] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("bin_array"), lbPair.toBytes(), binArrayBytes],
      METEORA_DLMM_PROGRAM
    );
    return binArray;
  }

  binIdToBinArrayIndex(MAX_BIN_ARRAY_SIZE: BN, binId: BN) {
    const { div: idx, mod } = binId.divmod(MAX_BIN_ARRAY_SIZE);
    return binId.isNeg() && !mod.isZero() ? idx.sub(new BN(1)) : idx;
  }

  async getPositionAndLbPair(
    connection: web3.Connection,
    lbPair: web3.PublicKey,
    position: web3.PublicKey,
  ): Promise<{
    lbPairAccount: any,
    positionAccount: any,
    constants: any
  }> {
    const program = await MeteoraDLMM.program(connection);
    const constants = this.constants(program);
    const [lbPairInfo, positionInfo] = await connection.getMultipleAccountsInfo([lbPair, position]);
    const lbPairAccount = program.coder.accounts.decode('lbPair', lbPairInfo!.data);
    const positionAccount = program.coder.accounts.decode('positionV2', positionInfo!.data);
    return {
      lbPairAccount,
      positionAccount,
      constants,
    }
  }

  /**
   * Returns all position of user
   *
   * @param connection
   * @param userPda
   */
  async getAllUserPosition(connection: web3.Connection, userPda: web3.PublicKey) {
    const program = await MeteoraDLMM.program(connection);

    // Returns all position owned by user.
    // What is not sure is whether these positions are closed already.
    const promiseResult = await Promise.all([
      userPda && program.account.position.all([
        {
          memcmp: {
            bytes: bs58.encode(userPda.toBuffer()),
            offset: 8 + 32
          }
        }
      ]),
      userPda && program.account.positionV2.all([
        {
          memcmp: {
            bytes: bs58.encode(userPda.toBuffer()),
            offset: 8 + 32
          }
        }
      ])
    ]);
    const [_positions, _positionsV2] = promiseResult;
    const positions = [..._positions, ..._positionsV2];

    // Remember v1 positions
    for (const position of _positions) {
      this.positions_v1[position.publicKey.toString()] = position.account;
    }

    // Remember v2 positions
    for (const position of _positionsV2) {
      this.positions_v2[position.publicKey.toString()] = position.account;
    }

    // Get all pools (lbPair)
    const temp = positions.map(position => position.account.lbPair);
    const pools: web3.PublicKey[] = [];

    // Trim repeat pool (ensure that pools are unique)
    const unique: Record<string, web3.PublicKey> = {};
    for (const pool of temp) {
      if (unique[pool.toString()] === undefined) {
        pools.push(pool);
        unique[pool.toString()] = pool;
      }
    }

    // Download all pools and update cache
    const lbPairs = await program.account.lbPair.fetchMultiple(pools);
    lbPairs.map((lbPair, index) => {
      const key = pools[index].toString();
      if (lbPair !== undefined && lbPair !== null) {
        this.pools[key] = lbPair;
      }
    });

    return positions.map(position => position.publicKey);
  }


  /**
   * Generate instruction that claims all fees and rewards by user
   *
   * @param connection
   * @param lbPair
   * @param positions
   * @param userPda
   * @returns
   */
  async claimFeeAndRewardIxs2(
    connection: web3.Connection,
    positions: web3.PublicKey[],
    userWallet: web3.PublicKey,
    userPda: web3.PublicKey,
    meteoraToHawksight: MeteoraToHawksightFn,
  ): Promise<ClaimAllRewardsByPositionBuilder> {
    // const result = await this.getPositionAndLbPair(connection, lbPair, position);
    const program = await MeteoraDLMM.program(connection);
    const constants = this.constants(program);
    const ixs: web3.TransactionInstruction[] = [];
    for (const position of positions) {
      const positionAccountV1 = this.positions_v1[position.toString()];
      const positionAccountV2 = this.positions_v2[position.toString()];
      let positionAccount;
      if (positionAccountV1 !== undefined) {
        positionAccount = positionAccountV1;
      } else if (positionAccountV2 !== undefined) {
        positionAccount = positionAccountV2;
      } else {
        throw new Error(`Unexpected error: Position ${position.toString()} does not exist.`);
      }
      const lbPair = positionAccount!.lbPair;
      const lbPairAccount = this.pools[lbPair.toString()];
      const result = {
        lbPairAccount,
        positionAccount,
        constants
      };
      const claimFeeIx = this.claimFeeIx(lbPair, position, userPda, result);
      const claimRewardIxs = this.claimRewardIxs(lbPair, position, userPda, result);
      ixs.push(claimFeeIx, ...claimRewardIxs);
    }

    // Find mint from meteora instructions
    const mints = getMintsFromInstruction({
      instructions: ixs,
      find: {
        ClaimFee: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [9, 10],
        },
        ClaimReward: {
          programId: METEORA_DLMM_PROGRAM.toBase58(),
          mintIndices: [6],
        },
      },
    });

    return new ClaimAllRewardsByPositionBuilder(
      // Step 1: Init ATA prior to withdrawal
      createAtaIdempotentIxs({
        accounts: mints.map((mint) => {
          return { owner: userPda, payer: userWallet, mint };
        }),
      }),

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      await meteoraToHawksight({
        ixs,
        userPda,
        authority: userWallet,
      }),

      // Step 3: Withdraw tokens to user wallet
      await withdrawMultipleToken({
        payer: userWallet,
        withdraw: mints.map((mint) => {
          return { mint };
        }),
      }),

      // Step 4: Close wSOL account (if there's any)
      unwrapSolIfMintIsWsol(userWallet, mints)
    );
  }

  async claimFeeAndRewardIxs(
    connection: web3.Connection,
    lbPair: web3.PublicKey,
    position: web3.PublicKey,
    userPda: web3.PublicKey,
  ): Promise<web3.TransactionInstruction[]> {
    const result = await this.getPositionAndLbPair(connection, lbPair, position);
    const claimFeeIx = this.claimFeeIx(lbPair, position, userPda, result);
    const claimRewardIxs = this.claimRewardIxs(lbPair, position, userPda, result);
    return [
      claimFeeIx,
      ...claimRewardIxs
    ]
  }

  claimFeeIx(
    lbPair: web3.PublicKey,
    position: web3.PublicKey,
    userPda: web3.PublicKey,
    getPositionAndLbPairResult: {
      lbPairAccount: any,
      positionAccount: any
      constants: any,
    }
  ): web3.TransactionInstruction {
    const tokenMintX = getPositionAndLbPairResult.lbPairAccount.tokenXMint;
    const tokenMintY = getPositionAndLbPairResult.lbPairAccount.tokenYMint;
    const { lowerBinId } = getPositionAndLbPairResult.positionAccount;
    const MAX_BIN_ARRAY_SIZE = getPositionAndLbPairResult.constants.MAX_BIN_ARRAY_SIZE;
    const lowerBinArrayIndex = this.binIdToBinArrayIndex(MAX_BIN_ARRAY_SIZE, new BN(lowerBinId));
    const binArrayLower = this.deriveBinArray(
      lbPair,
      lowerBinArrayIndex,
    );
    const upperBinArrayIndex = lowerBinArrayIndex.add(new BN(1));
    const binArrayUpper = this.deriveBinArray(
      lbPair,
      upperBinArrayIndex,
    );
    const userTokenX = generateAta(userPda, tokenMintX);
    const userTokenY = generateAta(userPda, tokenMintY);
    const reserveX = this.deriveReserve(tokenMintX, lbPair);
    const reserveY = this.deriveReserve(tokenMintY, lbPair);
    const ix = new web3.TransactionInstruction({
      programId: METEORA_DLMM_PROGRAM,
      keys: [
        { pubkey: lbPair, isSigner: false, isWritable: true },
        { pubkey: position, isSigner: false, isWritable: true },
        { pubkey: binArrayLower, isSigner: false, isWritable: true },
        { pubkey: binArrayUpper, isSigner: false, isWritable: true },
        { pubkey: userPda, isSigner: false, isWritable: false},
        { pubkey: reserveX, isSigner: false, isWritable: true },
        { pubkey: reserveY, isSigner: false, isWritable: true },
        { pubkey: userTokenX, isSigner: false, isWritable: true },
        { pubkey: userTokenY, isSigner: false, isWritable: true },
        { pubkey: tokenMintX, isSigner: false, isWritable: false },
        { pubkey: tokenMintY, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: METEORA_EVENT_AUTHORITY, isSigner: false, isWritable: false },
        { pubkey: METEORA_DLMM_PROGRAM, isSigner: false, isWritable: false },
      ],
      data: Buffer.concat([
        sighash('ClaimFee')
      ]),
    });
    return ix;
  }

  claimRewardIxs(
    lbPair: web3.PublicKey,
    position: web3.PublicKey,
    userPda: web3.PublicKey,
    getPositionAndLbPairResult: {
      lbPairAccount: any,
      positionAccount: any
      constants: any,
    }
  ): web3.TransactionInstruction[] {
    const { lowerBinId } = getPositionAndLbPairResult.positionAccount;
    const MAX_BIN_ARRAY_SIZE = getPositionAndLbPairResult.constants.MAX_BIN_ARRAY_SIZE;
    const lowerBinArrayIndex = this.binIdToBinArrayIndex(MAX_BIN_ARRAY_SIZE, new BN(lowerBinId));
    const binArrayLower = this.deriveBinArray(
      lbPair,
      lowerBinArrayIndex,
    );
    const upperBinArrayIndex = lowerBinArrayIndex.add(new BN(1));
    const binArrayUpper = this.deriveBinArray(
      lbPair,
      upperBinArrayIndex,
    );

    const ixs: web3.TransactionInstruction[] = [];
    for (let i = 0; i < 2; i++) {
      const rewardInfo = getPositionAndLbPairResult.lbPairAccount.rewardInfos[i];
      if (!rewardInfo || rewardInfo.mint.equals(web3.PublicKey.default))
        continue;

      const userTokenAccount = generateAta(userPda, rewardInfo.mint);
      const ix = new web3.TransactionInstruction({
        programId: METEORA_DLMM_PROGRAM,
        keys: [
          { pubkey: lbPair, isSigner: false, isWritable: true },
          { pubkey: position, isSigner: false, isWritable: true },
          { pubkey: binArrayLower, isSigner: false, isWritable: true },
          { pubkey: binArrayUpper, isSigner: false, isWritable: true },
          { pubkey: userPda, isSigner: false, isWritable: false},
          { pubkey: rewardInfo.vault, isSigner: false, isWritable: true },
          { pubkey: rewardInfo.mint, isSigner: false, isWritable: true },
          { pubkey: userTokenAccount, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: METEORA_EVENT_AUTHORITY, isSigner: false, isWritable: false },
          { pubkey: METEORA_DLMM_PROGRAM, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat([
          sighash('ClaimReward'),
          (new BN(i)).toArrayLike(Buffer, 'le', 8),
        ]),
      });
      ixs.push(ix);
    }

    Log(`Reward ixs count: ` + ixs.length);
    return ixs;
  }
}

/**
 * A builder class for constructing transaction instructions to claim all rewards by position.
 *
 * This class provides a structured way to build the necessary transaction instructions for claiming
 * rewards, removing liquidity, and managing wrapped SOL (wSOL) accounts.
 */
export class ClaimAllRewardsByPositionBuilder {

  /**
   * Constructs an instance of the ClaimAllRewardsByPositionBuilder class.
   *
   * @param {web3.TransactionInstruction[]} createAtaIxs - Instructions to create associated token accounts (ATAs) prior to withdrawal.
   * @param {web3.TransactionInstruction[]} mainIxs - Main instructions for claiming fees and/or rewards.
   * @param {web3.TransactionInstruction} withdrawMultipleTokenIx - Instruction to withdraw multiple tokens to the user wallet.
   * @param {web3.TransactionInstruction[]} unwrapWsolIxs - Instructions to close wSOL accounts, if any.
   */
  constructor(
    readonly createAtaIxs: web3.TransactionInstruction[],
    readonly mainIxs: web3.TransactionInstruction[],
    readonly withdrawMultipleTokenIx: web3.TransactionInstruction,
    readonly unwrapWsolIxs: web3.TransactionInstruction[]
  ) {}

  /**
   * Builds the default sequence of transaction instructions for claiming all rewards by position.
   *
   * This method returns an array of transaction instructions that includes:
   * - Initializing ATAs prior to withdrawal
   * - Claiming fees and/or rewards
   * - Withdrawing tokens to the user wallet
   * - Closing wSOL accounts, if any
   *
   * @returns {web3.TransactionInstruction[]} - An array of transaction instructions in the required order.
   */
  default(): web3.TransactionInstruction[] {
    return [
      // Step 1: Init ATA prior to withdrawal
      ...this.createAtaIxs,

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      ...this.mainIxs,

      // Step 3: Withdraw tokens to user wallet
      this.withdrawMultipleTokenIx,

      // Step 4: Close wSOL account (if there's any)
      ...this.unwrapWsolIxs,
    ];
  }

  /**
   * Replaces claim fee token ixs into storage token account
   */
  replaceClaimFeeTokenToSTA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimFeeAutomation");
    });

    // Should never be empty
    if (index === -1) {
      // Throw error instead?
      console.warn(`Warn: claim fee instruction not found! This should not happen.`);
      return;
    }
    
    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenXMint = this.mainIxs[index].keys[14].pubkey;
    const tokenYMint = this.mainIxs[index].keys[15].pubkey;
    const staTokenX = generateUserPdaStorageAccount(userPda, tokenXMint);
    const staTokenY = generateUserPdaStorageAccount(userPda, tokenYMint);
    this.mainIxs[index].keys[12].pubkey = staTokenX;
    this.mainIxs[index].keys[13].pubkey = staTokenY;
  }

  /**
   * Replaces reward token into storage token account
   */
  replaceClaimRewardToSTA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimRewardAutomation");
    })

    if (index === -1) {
      console.warn(`Warn: Reward instruction not found! This may happen if pool has no rewards`);
      return;
    }

    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenMint = this.mainIxs[index].keys[10].pubkey;
    const staToken = generateUserPdaStorageAccount(userPda, tokenMint);
    this.mainIxs[index].keys[11].pubkey = staToken;
  }
}

/**
 * A builder class for constructing transaction instructions to add liquidity according to a specified strategy.
 *
 * This class provides a structured way to build the necessary transaction instructions for adding liquidity to a position
 * based on a strategy, handling operations such as wrapping SOL, depositing tokens, adding liquidity, refunding dust, and
 * managing wrapped SOL (wSOL) accounts.
 */
export class AddLiquidityByStrategyBuilder {

  /**
   * Constructs an instance of the AddLiquidityByStrategyBuilder class.
   *
   * @param {web3.TransactionInstruction[]} wrapSolIxs - Instructions to wrap SOL to wSOL if needed.
   * @param {web3.TransactionInstruction} depositToPdaIxs - Instruction to deposit X and Y tokens to the UserPDA.
   * @param {web3.TransactionInstruction[]} mainIxs - Main instructions for adding liquidity by strategy.
   * @param {web3.TransactionInstruction} refundDustIxs - Instruction to refund dust tokens to the user wallet.
   * @param {web3.TransactionInstruction[]} unwrapWsolIxs - Instructions to unwrap wSOL to SOL if any.
   */
  constructor(
    readonly wrapSolIxs: web3.TransactionInstruction[],
    readonly depositToPdaIxs: web3.TransactionInstruction,
    readonly mainIxs: web3.TransactionInstruction[],
    readonly refundDustIxs: web3.TransactionInstruction,
    readonly unwrapWsolIxs: web3.TransactionInstruction[],
  ) {}

  /**
   * Builds the default sequence of transaction instructions for adding liquidity by strategy.
   *
   * This method returns an array of transaction instructions that includes:
   * - Initializing wSOL token accounts if needed
   * - Depositing X and Y tokens to the UserPDA
   * - Adding liquidity according to the strategy
   * - Refunding dust tokens to the user wallet
   * - Closing wSOL accounts if any
   *
   * @returns {web3.TransactionInstruction[]} - An array of transaction instructions in the required order.
   */
  default(): web3.TransactionInstruction[] {
    return [
      // Step 1: Init wSOL token account for user wallet (if X or Y token is wSOL)
      ...this.wrapSolIxs,

      // Step 2: Deposit X and Y token to UserPDA
      this.depositToPdaIxs,

      // Step 3: Add liquidity by strategy
      ...this.mainIxs,

      // Step 4: Refund dust to user wallet
      this.refundDustIxs,

      // Step 5: Close wSOL account (if there's any)
      ...this.unwrapWsolIxs,
    ];
  }
}

/**
 * A builder class for constructing transaction instructions to remove liquidity from a position.
 *
 * This class provides a structured way to build the necessary transaction instructions for removing liquidity
 * from a position, handling operations such as creating associated token accounts (ATAs), claiming rewards,
 * withdrawing tokens, and managing wrapped SOL (wSOL) accounts.
 */
export class RemoveLiquidityBuilder {

  /**
   * Constructs an instance of the RemoveLiquidityBuilder class.
   *
   * @param {web3.TransactionInstruction[]} createAtaIxs - Instructions to create associated token accounts (ATAs) prior to withdrawal.
   * @param {web3.TransactionInstruction[]} mainIxs - Main instructions for claiming fees/rewards, removing liquidity, and possibly closing the position.
   * @param {web3.TransactionInstruction} withdrawMultipleTokenIx - Instruction to withdraw multiple tokens to the user wallet.
   * @param {web3.TransactionInstruction[]} unwrapWsolIxs - Instructions to close wSOL accounts, if any.
   */
  constructor(
    readonly createAtaIxs: web3.TransactionInstruction[],
    readonly mainIxs: web3.TransactionInstruction[],
    readonly withdrawMultipleTokenIx: web3.TransactionInstruction,
    readonly unwrapWsolIxs: web3.TransactionInstruction[]
  ) {}

  /**
   * Builds the default sequence of transaction instructions for removing liquidity from a position.
   *
   * This method returns an array of transaction instructions that includes:
   * - Initializing associated token accounts (ATAs) prior to withdrawal
   * - Claiming fees and/or rewards, removing liquidity, and possibly closing the position
   * - Withdrawing tokens to the user wallet
   * - Closing wSOL accounts, if any
   *
   * @returns {web3.TransactionInstruction[]} - An array of transaction instructions in the required order.
   */
  default(): web3.TransactionInstruction[] {
    return [
      // Step 1: Init ATA prior to withdrawal
      ...this.createAtaIxs,

      // Step 2: Claim fees and/or rewards, remove liquidity, and possibly close position (if set)
      ...this.mainIxs,

      // Step 3: Withdraw tokens to user wallet
      this.withdrawMultipleTokenIx,

      // Step 4: Close wSOL account (if there's any)
      ...this.unwrapWsolIxs,
    ];
  }

  /**
   * Replaces claim fee token ixs into storage token account
   */
  replaceClaimFeeTokenToSTA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimFeeAutomation");
    });
    if (index === -1) {
      console.warn(`Warn: claim fee instruction not found! This should not happen if \`shouldClaimAndClose\` is set to true.`);
      return;
    }
    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenXMint = this.mainIxs[index].keys[14].pubkey;
    const tokenYMint = this.mainIxs[index].keys[15].pubkey;
    const staTokenX = generateUserPdaStorageAccount(userPda, tokenXMint);
    const staTokenY = generateUserPdaStorageAccount(userPda, tokenYMint);
    this.mainIxs[index].keys[12].pubkey = staTokenX;
    this.mainIxs[index].keys[13].pubkey = staTokenY;
  }

  /**
   * Replaces reward token into storage token account
   */
  replaceClaimRewardToSTA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimRewardAutomation");
    })
    if (index === -1) {
      console.warn(`Warn: Reward instruction not found! This may happen if pool has no rewards`);
      return;
    }
    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenMint = this.mainIxs[index].keys[10].pubkey;
    const staToken = generateUserPdaStorageAccount(userPda, tokenMint);
    this.mainIxs[index].keys[11].pubkey = staToken;
  }

  /**
   * Replaces claim fee token ixs into associated token account
   */
  replaceClaimFeeTokenToATA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimFeeAutomation");
    });
    if (index === -1) {
      console.warn(`Warn: claim fee instruction not found! This should not happen if \`shouldClaimAndClose\` is set to true.`);
      return;
    }
    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenXMint = this.mainIxs[index].keys[14].pubkey;
    const tokenYMint = this.mainIxs[index].keys[15].pubkey;
    const ataTokenX = generateAta(userPda, tokenXMint);
    const ataTokenY = generateAta(userPda, tokenYMint);
    this.mainIxs[index].keys[12].pubkey = ataTokenX;
    this.mainIxs[index].keys[13].pubkey = ataTokenY;
  }

  /**
   * Replaces reward token into associated token account
   */
  replaceClaimRewardToATA() {
    const index = this.mainIxs.findIndex(mainIx => {
      const dataWithoutIyfExtensionExecute = mainIx.data.subarray(12);
      return sighashMatch(dataWithoutIyfExtensionExecute, "MeteoraDlmmClaimRewardAutomation");
    })
    if (index === -1) {
      console.warn(`Warn: Reward instruction not found! This may happen if pool has no rewards`);
      return;
    }
    const userPda = this.mainIxs[index].keys[1].pubkey;
    const tokenMint = this.mainIxs[index].keys[10].pubkey;
    const ataToken = generateAta(userPda, tokenMint);
    this.mainIxs[index].keys[11].pubkey = ataToken;
  }
}

/**
 * A builder class for constructing transaction instructions to remove liquidity from a position.
 *
 * This class provides a structured way to build the necessary transaction instructions for removing liquidity
 * from a position, handling operations such as creating associated token accounts (ATAs), claiming rewards,
 * withdrawing tokens, and managing wrapped SOL (wSOL) accounts.
 */
export class InitializePositionAndAddLiquidityByStrategyBuilder {

  /**
   * Constructs an instance of the InitializePositionAndAddLiquidityByStrategyBuilder class.
   *
   * @param {web3.TransactionInstruction[]} wrapSolIxs - Instructions to wrap SOL to wSOL if needed.
   * @param {web3.TransactionInstruction} depositToPdaIxs - Instruction to deposit X and Y tokens to the UserPDA.
   * @param {web3.TransactionInstruction[]} mainIxs - Main instructions for adding liquidity by strategy.
   * @param {web3.TransactionInstruction} refundDustIxs - Instruction to refund dust tokens to the user wallet.
   * @param {web3.TransactionInstruction[]} unwrapWsolIxs - Instructions to unwrap wSOL to SOL if any.
   */
  constructor(
    readonly wrapSolIxs: web3.TransactionInstruction[],
    readonly depositToPdaIxs: web3.TransactionInstruction,
    readonly mainIxs: web3.TransactionInstruction[],
    readonly refundDustIxs: web3.TransactionInstruction,
    readonly unwrapWsolIxs: web3.TransactionInstruction[],
  ) {}

  /**
   * Builds the default sequence of transaction instructions for removing liquidity from a position.
   *
   * This method returns an array of transaction instructions that includes:
   * - Initializing associated token accounts (ATAs) prior to withdrawal
   * - Claiming fees and/or rewards, removing liquidity, and possibly closing the position
   * - Withdrawing tokens to the user wallet
   * - Closing wSOL accounts, if any
   *
   * @returns {web3.TransactionInstruction[]} - An array of transaction instructions in the required order.
   */
  default(): web3.TransactionInstruction[] {
    return [
      // Step 1: Init wSOL token account for user wallet (if X or Y token is wSOL)
      ...this.wrapSolIxs,

      // Step 2: Deposit X and Y token to UserPDA
      this.depositToPdaIxs,

      // Step 3: Add liquidity by strategy
      ...this.mainIxs,

      // // Step 4: Refund dust to user wallet
      // this.refundDustIxs,

      // // Step 5: Close wSOL account (if there's any)
      // ...this.unwrapWsolIxs,
    ];
  }
}
