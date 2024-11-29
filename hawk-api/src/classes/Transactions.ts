import { getBinArraysRequiredByPositionRange } from "@meteora-ag/dlmm";
import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import {
  GLOBAL_ALT,
  HS_AUTHORITY,
  IYF_EXTENSION,
  IYF_MAIN,
  METEORA_DLMM_PROGRAM,
  SITE_FEE_OWNER,
  STABLEMINT_1,
  STABLEMINT_2,
  TOKEN_PROGRAM_ID,
  USDC_FARM,
  ASSOCIATED_TOKEN_PROGRAM,
  ORCA_WHIRLPOOL_PROGRAM,
  METEORA_EVENT_AUTHORITY,
} from "../addresses";
import {
  MeteoraClaim,
  MeteoraClose,
  MeteoraCompound,
  MeteoraCreatePositionAndDeposit,
  MeteoraDeposit,
  MeteoraInitializeBinArrays,
  MeteoraRebalance,
  MeteoraWithdraw,
  Register,
  StrategyTypeMap,
  TxgenParams,
  InitializeStorageTokenAccount,
  MeteoraLimitCloseAutomation,
  OrcaOpenPosition,
  OrcaClosePosition,
  OrcaDeposit,
  OrcaWithdraw,
  OrcaClaimRewards,
  TransactionMetadataResponse
} from '../types';

import {
  createTransactionMeta,
  generateAta,
  generateUserPda,
  generateUserPdaStorageAccount,
  getIxs,
  sighashMatch,
  generateOrcaPositionPDA,
  tokenAccountExists,
  getMeteoraPool,
  wrapSolIfMintIsWsol,
} from "../functions";
import {
  getTickArrayFromTickIndex,
} from "../orca";
import {
  meteoraToHawksight,
  meteoraToHawksightAutomationIxs,
} from "../hsToMeteora";
import { MeteoraDLMM, MeteoraFunctions } from "../meteora";
import { Anchor } from "../anchor";
import axios from "axios";
import { depositMultipleToken, withdrawMultipleToken } from "../hawksight";
import { Protocol } from "../types";
import { Log } from "./Logging";

export class Transactions {
  /**
   * Generate UserPDA
   *
   * @param userWallet
   * @param farm
   * @returns
   */
  generateUserPda(
    userWallet: web3.PublicKey,
    farm: web3.PublicKey = USDC_FARM
  ): web3.PublicKey {
    return generateUserPda(userWallet, farm);
  }

  /**s
   * Registers a new entity or user with the necessary parameters, handling transaction creation and response.
   *
   * @param connection A Solana web3 connection for interacting with the blockchain.
   * @param payer The public key of the payer, responsible for transaction fees.
   * @param params Registration parameters required by the API.
   * @returns A Promise resolving to the transaction metadata or an error response, depending on the outcome of the registration.
   */
  async register({
    connection,
    params,
  }: TxgenParams<Register>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const user = generateUserPda(params.authority, farm);
    const [stableToken] = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("index-token", "utf-8"),
        STABLEMINT_1.toBuffer(),
        farm.toBuffer(),
        user.toBuffer(),
      ],
      Anchor.instance().iyfMain.programId
    );
    const [stableToken2] = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("index-token", "utf-8"),
        STABLEMINT_2.toBuffer(),
        farm.toBuffer(),
        user.toBuffer(),
      ],
      Anchor.instance().iyfMain.programId
    );
    // check if user pda is already registered:
    try {
      await Anchor.instance().iyfMain.account.userAccountMulti.fetch(user, "confirmed");
      throw new Error(
        `User PDA for wallet: ${params.authority} is already registered.`
      );
    } catch {
      return createTransactionMeta({
        payer: params.authority,
        description: "Register User",
        addressLookupTableAddresses: GLOBAL_ALT,
        mainInstructions: [
          await Anchor.instance().iyfMain.methods
            .newUser()
            .accounts({
              farm,
              user,
              authority: params.authority,
              stableToken: stableToken,
              stableMint: STABLEMINT_1,
              stableToken2: stableToken2,
              stableMint2: STABLEMINT_2,
              systemProgram: web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              rent: web3.SYSVAR_RENT_PUBKEY,
            })
            .instruction(),
        ],
      });
    }
  }

  /**
   * Creates meteora instruction that creates new position and deposit.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraCreatePositionAndDeposit({
    connection,
    params,
  }: TxgenParams<MeteoraCreatePositionAndDeposit>): Promise<TransactionMetadataResponse> {
    const dlmmPool = await MeteoraDLMM.create(
      connection,
      new web3.PublicKey(params.pool)
    );
    const userPda = generateUserPda(params.userWallet);
    const mainInstructions = (
      await dlmmPool.initializePositionAndAddLiquidityByStrategy(
        params.userWallet,
        params.userWallet,
        {
          positionPubKey: params.position,
          user: userPda,
          totalXAmount: params.totalXAmount,
          totalYAmount: params.totalYAmount,
          strategy: {
            maxBinId: params.binRange.upperRange,
            minBinId: params.binRange.lowerRange,
            strategyType: StrategyTypeMap[params.distribution],
          },
          slippage: params.slippage,
          skipInputTokenCheck: params.skipInputTokenCheck,
        },
        meteoraToHawksight
      )
    ).default();
    return createTransactionMeta({
      payer: params.userWallet,
      description: "Create position and deposit to Meteora DLMM",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates meteora instruction that initializes bin arrays.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraInitializeBinArrays({
    connection,
    params,
  }: TxgenParams<MeteoraInitializeBinArrays>): Promise<TransactionMetadataResponse> {
    const poolAddress = new web3.PublicKey(params.pool);
    const dlmmPool = await MeteoraDLMM.create(connection, poolAddress);

    const binArraysRequired = await getBinArraysRequiredByPositionRange(
      poolAddress,
      new BN(params.minBinId),
      new BN(params.maxBinId),
      dlmmPool.dlmm.program.programId
    );

    const mainInstructions = await dlmmPool.dlmm.initializeBinArrays(
      binArraysRequired.map((b) => b.index),
      new web3.PublicKey(params.userWallet)
    );

    return createTransactionMeta({
      payer: params.userWallet,
      description: "Initialize bin arrays for Meteora DLMM pool",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates meteora instruction that deposits to position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraDeposit({
    connection,
    params,
  }: TxgenParams<MeteoraDeposit>): Promise<TransactionMetadataResponse> {
    const program = await MeteoraDLMM.program(connection);
    let lbPair, maxBinId, minBinId;
    if (params.fastGeneration !== undefined) {
      lbPair = params.fastGeneration.pool;
      maxBinId = params.fastGeneration.upperBinId;
      minBinId = params.fastGeneration.lowerBinId;
    } else {
      const position = await program.account.positionV2.fetch(params.position);
      lbPair = position.lbPair;
      maxBinId = position.upperBinId;
      minBinId = position.lowerBinId;
    }

    const dlmmPool = await MeteoraDLMM.create(
      connection,
      new web3.PublicKey(lbPair)
    );
    const userPda = generateUserPda(params.userWallet);
    const mainInstructions = (
      await dlmmPool.addLiquidityByStrategy(
        params.userWallet,
        params.userWallet,
        {
          positionPubKey: params.position,
          user: userPda,
          totalXAmount: params.totalXAmount,
          totalYAmount: params.totalYAmount,
          strategy: {
            maxBinId,
            minBinId,
            strategyType: StrategyTypeMap[params.distribution],
          },
          slippage: params.slippage,
          skipInputTokenCheck: params.skipInputTokenCheck,
        },
        meteoraToHawksight
      )
    ).default();
    return createTransactionMeta({
      payer: params.userWallet,
      description: "Deposit to existing position in Meteora DLMM",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates meteora instruction withdraws from a position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraWithdraw({
    connection,
    params,
  }: TxgenParams<MeteoraWithdraw>): Promise<TransactionMetadataResponse> {
    const userPda = generateUserPda(params.userWallet);
    const program = await MeteoraDLMM.program(connection);
    let lbPair, binIdsToRemove;
    if (params.fastGeneration !== undefined) {
      lbPair = params.fastGeneration.pool;
    } else {
      const position = await program.account.positionV2.fetch(params.position);
      lbPair = position.lbPair;
    }
    const dlmmPool = await MeteoraDLMM.create(connection, lbPair);
    if (params.fastGeneration === undefined) {
      const { userPositions } = await dlmmPool.getPositionsByUserAndLbPair(
        userPda
      );
      const userPosition = userPositions.find(
        (userPosition) =>
          userPosition.publicKey.toString() === params.position.toString()
      );
      if (userPosition === undefined) {
        throw new Error("Position does not exist."); // this error should not happen...
      }
      binIdsToRemove = userPosition.positionData.positionBinData.map(
        (bin) => bin.binId
      );
    } else {
      binIdsToRemove = params.fastGeneration.binIdsToRemove;
    }
    const amountBps = params.shouldClaimAndClose
      ? new BN(10_000)
      : params.amountBps;
    const mainInstructions = (
      await dlmmPool.removeLiquidity(
        params.userWallet,
        params.userWallet,
        {
          user: userPda,
          position: params.position,
          binIds: binIdsToRemove,
          bps: amountBps,
          shouldClaimAndClose: params.shouldClaimAndClose,
        },
        meteoraToHawksight
      )
    ).default();
    let description: string;
    if (params.shouldClaimAndClose) {
      description =
        "Full position withdrawal with claim and close instructisons from Meteora DLMM";
    } else if (amountBps.eq(new BN(10_000))) {
      description =
        "Full position withdrawal without claim and close instructions from Meteora DLMM";
    } else {
      description = "Partial position withdrawal from Meteora DLMM";
    }
    return createTransactionMeta({
      payer: params.userWallet,
      description,
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates meteora instruction that claims fees and rewards.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraClaim({
    connection,
    params,
  }: TxgenParams<MeteoraClaim>): Promise<TransactionMetadataResponse> {
    let lbPair;
    if (params.fastGeneration !== undefined) {
      lbPair = params.fastGeneration.pool;
    } else {
      const program = await MeteoraDLMM.program(connection);
      const position = await program.account.positionV2.fetch(params.position);
      lbPair = position.lbPair;
    }
    const userPda = generateUserPda(params.userWallet);
    const fn = new MeteoraFunctions();
    const mainInstructions = (
      await fn.claimAllRewardsByPosition(
        connection,
        params.userWallet,
        params.userWallet,
        {
          owner: userPda,
          position: params.position,
          lbPair,
        },
        meteoraToHawksight,
      )
    ).default();
    const txMeta = createTransactionMeta({
      payer: params.userWallet,
      description: "Claim fees / rewards from Meteora DLMM Position",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
    return txMeta;
  }

  /**
   * Creates meteora instruction that closes position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async meteoraClosePosition({
    connection,
    params,
  }: TxgenParams<MeteoraClose>): Promise<TransactionMetadataResponse> {
    const program = await MeteoraDLMM.program(connection);
    const position = await program.account.positionV2.fetch(params.position);
    const dlmmPool = await MeteoraDLMM.create(connection, position.lbPair);
    const userPda = generateUserPda(params.userWallet);
    const { userPositions } = await dlmmPool.getPositionsByUserAndLbPair(
      userPda
    );
    const index = userPositions.findIndex((v) =>
      v.publicKey.equals(params.position)
    );
    await dlmmPool.getActiveBin();
    const mainInstructions = await dlmmPool.closePosition(
      params.userWallet,
      {
        owner: userPda,
        position: userPositions[index],
      },
      meteoraToHawksight
    );
    return createTransactionMeta({
      payer: params.userWallet,
      description: "Close Meteora DLMM Position",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  async compoundAutomationIx({
    connection,
    params,
  }: TxgenParams<MeteoraCompound>) {
    const program = await MeteoraDLMM.program(connection);
    const position = await program.account.positionV2.fetch(params.position);
    const dlmmPool = await MeteoraDLMM.create(connection, position.lbPair);
    const userPda = generateUserPda(params.userWallet);
    const { userPositions } = await dlmmPool.getPositionsByUserAndLbPair(userPda);
    const userPosition = userPositions.find(userPosition => userPosition.publicKey.equals(params.position));
    if (userPosition === undefined) {
      throw new Error(`Position: ${params.position} does not exist.`);
    }

    // Claim fee and claim reward ixs
    const claimBuilder = await dlmmPool.claimAllRewardsByPosition(
      params.userWallet,
      HS_AUTHORITY,
      {
        owner: userPda,
        position: userPosition,
      },
      meteoraToHawksightAutomationIxs
    );

    // Re-deposit fees (TODO: How to re-deposit reward tokens that is not X or Y token?)
    const addLiquidityBuilder = await dlmmPool.addLiquidityByStrategy(
      params.userWallet,
      HS_AUTHORITY,
      {
        positionPubKey: params.position,
        user: userPda,
        totalXAmount: new BN(100_000), // This is overriden on-chain, so value here do not matter
        totalYAmount: new BN(100_000), // This is overriden on-chain, so value here do not matter
        strategy: {
          maxBinId: position.upperBinId,
          minBinId: position.lowerBinId,
          strategyType: StrategyTypeMap["SPOT-IMBALANCED"], // TODO: how to get the right distribution from chain??
        },
        skipInputTokenCheck: true,
      },
      meteoraToHawksightAutomationIxs
    );

    const mainInstructions: web3.TransactionInstruction[] = [
      // Step 1: Initialize ATA
      ...claimBuilder.createAtaIxs,

      // Step 2: Claim rewards and fees
      ...claimBuilder.mainIxs,

      // Step 3: Re-deposit fees
      ...addLiquidityBuilder.mainIxs,
    ];
    return createTransactionMeta({
      payer: params.userWallet,
      description:
        "Automation IX: Meteora Auto-compound instructions (claim fee, reward, and deposit to position)",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  async rebalanceAutomationIx({
    connection,
    params,
  }: TxgenParams<MeteoraRebalance>) {
    const program = await MeteoraDLMM.program(connection);
    const position = await program.account.positionV2.fetch(
      params.currentPosition
    );
    const dlmmPool = await MeteoraDLMM.create(connection, position.lbPair);
    const userPda = generateUserPda(params.userWallet);

    // Step 1: Claim all fees/rewards, remove all liquidity and close current position
    const { userPositions } = await dlmmPool.getPositionsByUserAndLbPair(userPda);
    const userPosition = userPositions.find(userPosition => userPosition.publicKey.equals(params.currentPosition));
    if (userPosition === undefined) {
      throw new Error(`Position: ${params.currentPosition} does not exist.`);
    }
    const binIdsToRemove = userPosition.positionData.positionBinData.map(
      (bin) => bin.binId
    );
    const removeLiquidityBuilder = await dlmmPool.removeLiquidity(
      params.userWallet,
      HS_AUTHORITY,
      {
        user: userPda,
        position: params.currentPosition,
        binIds: binIdsToRemove,
        bps: new BN(10_000),
        shouldClaimAndClose: true,
      },
      meteoraToHawksightAutomationIxs
    );

    if (!!params.useAta) {
      removeLiquidityBuilder.replaceClaimFeeTokenToATA();
      removeLiquidityBuilder.replaceClaimRewardToATA();
    } else {
      removeLiquidityBuilder.replaceClaimFeeTokenToSTA();
      removeLiquidityBuilder.replaceClaimRewardToSTA();
    }

    // Re-deposit fees (TODO: How to re-deposit reward tokens that is not X or Y token?)
    const initPositionAndAddLiquidityBuilder =
      await dlmmPool.initializePositionAndAddLiquidityByStrategy(
        params.userWallet,
        HS_AUTHORITY,
        {
          positionPubKey: params.newPosition,
          user: userPda,
          totalXAmount: new BN(100_000), // This is overriden on-chain, so value here do not matter
          totalYAmount: new BN(100_000), // This is overriden on-chain, so value here do not matter
          strategy: {
            maxBinId: params.binRange.upperRange,
            minBinId: params.binRange.lowerRange,
            strategyType: StrategyTypeMap[params.distribution],
          },
          skipInputTokenCheck: true, // Rebalance should be independent of user wallet TA
        },
        meteoraToHawksightAutomationIxs
      );

    const mainInstructions = [
      // Initialize required ATA
      ...removeLiquidityBuilder.createAtaIxs,

      // Remove liquidity
      ...removeLiquidityBuilder.mainIxs,

      // Re-deposit liquidity
      ...initPositionAndAddLiquidityBuilder.mainIxs,
    ];

    return createTransactionMeta({
      payer: params.userWallet,
      description:
        "Automation IX: Meteora Auto-rebalance instructions (Close position and deposit to new position)",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates instructions to initialize storage token accounts
   *
   * @param connection A Solana web3 connection for interacting with the blockchain.
   * @param params Parameters required.
   * @returns A Promise resolving to the transaction metadata or an error response, depending on the outcome of the registration.
   */
  async initializeStorageTokenAccounts({
    connection,
    params,
  }: TxgenParams<InitializeStorageTokenAccount>): Promise<
    TransactionMetadataResponse | []
  > {
    const activePoolRewards: web3.PublicKey[] = [];
    const mainInstructions: web3.TransactionInstruction[] = [];

    const userPda = generateUserPda(params.userWallet);

    if (params.protocol === Protocol.Meteora && params.pool) {
      const poolInfo = await getMeteoraPool(params.pool);

      if (poolInfo.reward_mint_x !== "11111111111111111111111111111111") {
        activePoolRewards.push(new web3.PublicKey(poolInfo.reward_mint_x));
      }

      if (poolInfo.reward_mint_y !== "11111111111111111111111111111111") {
        activePoolRewards.push(new web3.PublicKey(poolInfo.reward_mint_y));
      }
    }

    const combinedMints = [...params.mints, ...activePoolRewards];
    const filteredMints = combinedMints.filter(
      (m, i) => combinedMints.findIndex((mint) => mint.equals(m)) === i
    );

    const storageAddresses = filteredMints.map((mint) =>
      generateUserPdaStorageAccount(userPda, mint)
    );

    const accountsData = await connection.getMultipleAccountsInfo(
      storageAddresses,
      "processed"
    );

    for (let i = 0; i < accountsData.length; i++) {
      if (!accountsData[i]) {
        Log(`initializing STA: ${filteredMints[i].toBase58()}`);
        mainInstructions.push(
          await Anchor.instance().iyfMain.methods
            .initializeStorageTokenAccount()
            .accounts({
              userPda: userPda,
              payer: params.userWallet,
              mint: filteredMints[i],
              storageTokenAccount: storageAddresses[i],
              rent: web3.SYSVAR_RENT_PUBKEY,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: web3.SystemProgram.programId,
            })
            .instruction()
        );
      }
    }

    if (mainInstructions.length) {
      return createTransactionMeta({
        payer: params.userWallet,
        description: "Initialize STAs",
        addressLookupTableAddresses: GLOBAL_ALT,
        mainInstructions,
      });
    }

    return [];
  }

  async limitCloseAutomationIx({
    connection,
    params,
  }: TxgenParams<MeteoraLimitCloseAutomation>) {
    const program = await MeteoraDLMM.program(connection);
    const position = await program.account.positionV2.fetch(params.position);
    const dlmmPool = await MeteoraDLMM.create(connection, position.lbPair);
    const userPda = generateUserPda(params.userWallet);

    // Step 1: Claim all fees/rewards, remove all liquidity and close current position
    const { userPositions } = await dlmmPool.getPositionsByUserAndLbPair(
      userPda
    );
    const binIdsToRemove = userPositions[0].positionData.positionBinData.map(
      (bin) => bin.binId
    );

    // Claim fees and/or rewards, remove liquidity, and possibly close position from Meteora API (if set)
    const txn = await dlmmPool.dlmm.removeLiquidity({
      user: userPda,
      position: params.position,
      binIds: binIdsToRemove,
      bps: new BN(10_000),
      shouldClaimAndClose: true,
    });

    // Filter out non-meteora instructions
    const ixs = getIxs(txn).filter((ix) =>
      ix.programId.equals(METEORA_DLMM_PROGRAM)
    );

    const farm = USDC_FARM;
    const authority = params.userWallet;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    const { params: _params, data } = this.removeLiquidityByRangeInfo(ixs);
    const {
      position: _position,
      lbPair,
      binArrayBitmapExtension,
      reserveX,
      reserveY,
      tokenXMint,
      tokenYMint,
      tokenXProgram,
      tokenYProgram,
      binArrayLower,
      binArrayUpper,
      eventAuthority,
      program: meteoraDlmmProgram,
    } = _params;

    let userTokenX = params.useAta ? generateAta(userPda, tokenXMint.pubkey) : generateUserPdaStorageAccount(userPda, tokenXMint.pubkey);
    let userTokenY = params.useAta ? generateAta(userPda, tokenYMint.pubkey) : generateUserPdaStorageAccount(userPda, tokenYMint.pubkey);

    const limitCloseAutomationIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmLimitCloseAutomation(data, params.minBinId, params.maxBinId)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: _position.pubkey,
        lbPair: lbPair.pubkey,
        binArrayBitmapExtension: binArrayBitmapExtension.pubkey,
        userTokenX,
        userTokenY,
        reserveX: reserveX.pubkey,
        reserveY: reserveY.pubkey,
        tokenXMint: tokenXMint.pubkey,
        tokenYMint: tokenYMint.pubkey,
        tokenXProgram: tokenXProgram.pubkey,
        tokenYProgram: tokenYProgram.pubkey,
        binArrayLower: binArrayLower.pubkey,
        binArrayUpper: binArrayUpper.pubkey,
        eventAuthority: eventAuthority.pubkey,
        meteoraDlmmProgram: meteoraDlmmProgram.pubkey,
        ownerFeeX: generateAta(SITE_FEE_OWNER, tokenXMint.pubkey),
        ownerFeeY: generateAta(SITE_FEE_OWNER, tokenYMint.pubkey),
      })
      .instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(limitCloseAutomationIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        limitCloseAutomationIx.keys[4],
        limitCloseAutomationIx.keys[5],
        limitCloseAutomationIx.keys[6],
        limitCloseAutomationIx.keys[7],
        limitCloseAutomationIx.keys[8],
        limitCloseAutomationIx.keys[9],
        limitCloseAutomationIx.keys[10],
        limitCloseAutomationIx.keys[11],
        limitCloseAutomationIx.keys[12],
        limitCloseAutomationIx.keys[13],
        limitCloseAutomationIx.keys[14],
        limitCloseAutomationIx.keys[15],
        limitCloseAutomationIx.keys[16],
        limitCloseAutomationIx.keys[17],
        limitCloseAutomationIx.keys[18],
        limitCloseAutomationIx.keys[19],
        limitCloseAutomationIx.keys[20],
        limitCloseAutomationIx.keys[21],
      ])
      .instruction();

    const mainInstructions = [
      // Limit Close Automation Instruction (Hawksight CPI)
      ix,
    ];

    return createTransactionMeta({
      payer: params.userWallet,
      description:
        "Automation IX: Meteora limit close instruction (Full withdraw and close on to specific bin id)",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  private removeLiquidityByRangeInfo(ixs: web3.TransactionInstruction[]) {
    for (const ix of ixs) {
      const programIdMatch = ix.programId.equals(METEORA_DLMM_PROGRAM);
      const _sighashMatch = sighashMatch(ix.data, "RemoveLiquidityByRange");
      if (programIdMatch && _sighashMatch) {
        return {
          data: ix.data,
          params: {
            position: ix.keys[0],
            lbPair: ix.keys[1],
            binArrayBitmapExtension: ix.keys[2],
            userTokenX: ix.keys[3],
            userTokenY: ix.keys[4],
            reserveX: ix.keys[5],
            reserveY: ix.keys[6],
            tokenXMint: ix.keys[7],
            tokenYMint: ix.keys[8],
            binArrayLower: ix.keys[9],
            binArrayUpper: ix.keys[10],
            sender: ix.keys[11],
            tokenXProgram: ix.keys[12],
            tokenYProgram: ix.keys[13],
            eventAuthority: ix.keys[14],
            program: ix.keys[15],
          },
        };
      }
    }
    throw new Error(
      `Unexpected error: Cannot find "RemoveLiquidityByRange" instruction from instructions`
    );
  }


  /**
   * Creates orca instruction that opens new position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async orcaOpenPosition({ connection, params }: TxgenParams<OrcaOpenPosition>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const userPda = generateUserPda(params.userWallet, farm);
    const position = generateOrcaPositionPDA(params.positionMint);
    const positionTokenAccount = generateAta(userPda, params.positionMint);
    const extensionIx = await Anchor.instance().iyfExtension.methods
      .orcaOpenPosition(
        params.tickLowerIndex,
        params.tickUpperIndex,
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        position,
        positionMint: params.positionMint,
        positionTokenAccount,
        whirlpool: params.whirlpool,
        rent: web3.SYSVAR_RENT_PUBKEY,
        orcaWhirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction()
    const orcaIx = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(
        extensionIx.data
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        extensionIx.keys[4],
        extensionIx.keys[5],
        extensionIx.keys[6],
        extensionIx.keys[7],
        extensionIx.keys[8],
        extensionIx.keys[9],
        extensionIx.keys[10],
        extensionIx.keys[11],
        extensionIx.keys[12],
      ])
      .instruction();
    orcaIx.keys[2].isSigner = true; // authority must be signer.
    const mainInstructions = [orcaIx];
    return createTransactionMeta({
      payer: params.userWallet,
      description: "Create new Orca Position",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates orca instruction that closes position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async orcaClosePosition({ connection, params }: TxgenParams<OrcaClosePosition>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const userPda = generateUserPda(params.userWallet, farm);
    const position = generateOrcaPositionPDA(params.positionMint);
    const positionTokenAccount = generateAta(userPda, params.positionMint);
    const extensionIx = await Anchor.instance().iyfExtension.methods
      .orcaClosePosition()
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        positionMint: params.positionMint,
        position,
        positionTokenAccount,
        orcaWhirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      })
      .instruction()
    const orcaIx = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(
        extensionIx.data
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        extensionIx.keys[4],
        extensionIx.keys[5],
        extensionIx.keys[6],
        extensionIx.keys[7],
        extensionIx.keys[8],
        extensionIx.keys[9],
      ])
      .instruction();
    orcaIx.keys[2].isSigner = true; // authority must be signer.
    const mainInstructions = [orcaIx];
    return createTransactionMeta({
      payer: params.userWallet,
      description: "Close Orca Position",
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates orca instruction that deposits to a position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async orcaDeposit({ connection, params }: TxgenParams<OrcaDeposit>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const userPda = generateUserPda(params.userWallet, farm);
    const position = generateOrcaPositionPDA(params.positionMint);
    const positionTokenAccount = generateAta(userPda, params.positionMint);
    const positionData = await Anchor.instance().orcaProgram.account.position.fetch(position);
    if (positionData === null) {
      throw new Error(`Position: ${position} does not exist or already closed. Position mint: ${params.positionMint}`);
    }
    const whirlpool = positionData.whirlpool;
    const whirlpoolData = await Anchor.instance().orcaProgram.account.whirlpool.fetch(whirlpool);
    const mintA = whirlpoolData!.tokenMintA;
    const mintB = whirlpoolData!.tokenMintB;
    const tokenSeeds = [
      { owner: params.userWallet, mint: mintA },
      { owner: params.userWallet, mint: mintB },
    ];
    const resultMap = await tokenAccountExists(connection, tokenSeeds);
    resultMap.map((result, index) => {
      const tokenKey = result.tokenKey;
      const token = tokenSeeds[index];
      if (!result.exists && `${token.mint}` !== 'So11111111111111111111111111111111111111112') {
        throw new Error(`Token: ${tokenKey} owned by ${token.owner} does not exist. Mint: ${token.mint}`);
      }
    });
    const tokenOwnerAccountA = generateAta(userPda, mintA);
    const tokenOwnerAccountB = generateAta(userPda, mintB);
    const { publicKey: tickArrayLower } = getTickArrayFromTickIndex(positionData.tickLowerIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const { publicKey: tickArrayUpper } = getTickArrayFromTickIndex(positionData.tickUpperIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const ownerFeeA = generateAta(SITE_FEE_OWNER, mintA);
    const ownerFeeB = generateAta(SITE_FEE_OWNER, mintB);
    // Step 1: Init wSOL token account for user wallet (if X or Y token is wSOL)
    const wrapSolIx = wrapSolIfMintIsWsol(params.userWallet, params.userWallet, [
      { mint: mintA, amount: params.totalXAmount },
      { mint: mintB, amount: params.totalYAmount },
    ]);
    const depositIx = await depositMultipleToken({
      payer: params.userWallet,
      deposit: [
        {
          mint: mintA,
          amount: params.totalXAmount,
        },
        {
          mint: mintB,
          amount: params.totalYAmount,
        },
      ]
    });
    const extensionIx = await Anchor.instance().iyfExtension.methods
      .orcaDeposit()
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        positionMint: params.positionMint,
        whirlpool,
        position,
        positionTokenAccount,
        tokenOwnerAccountA,
        tokenOwnerAccountB,
        tokenVaultA: whirlpoolData!.tokenVaultA,
        tokenVaultB: whirlpoolData!.tokenVaultB,
        tickArrayLower,
        tickArrayUpper,
        ownerFeeA,
        ownerFeeB,
        orcaWhirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      })
      .instruction()
    const orcaIx = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(
        extensionIx.data
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        extensionIx.keys[4],
        extensionIx.keys[5],
        extensionIx.keys[6],
        extensionIx.keys[7],
        extensionIx.keys[8],
        extensionIx.keys[9],
        extensionIx.keys[10],
        extensionIx.keys[11],
        extensionIx.keys[12],
        extensionIx.keys[13],
        extensionIx.keys[14],
        extensionIx.keys[15],
        extensionIx.keys[16],
        extensionIx.keys[17],
        extensionIx.keys[18],
      ])
      .instruction();
      const clearRemainingTokensIxs = await withdrawMultipleToken({
        payer: params.userWallet,
        withdraw: [
          { mint: mintA },
          { mint: mintB },
        ],
      });
    orcaIx.keys[2].isSigner = true; // authority must be signer.
    const mainInstructions = [...wrapSolIx, depositIx, orcaIx, clearRemainingTokensIxs];
    return createTransactionMeta({
      payer: params.userWallet,
      description: `Deposit to Orca Position: ${position}`,
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates orca instruction that withdraws from a position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async orcaWithdraw({ connection, params }: TxgenParams<OrcaWithdraw>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const userPda = generateUserPda(params.userWallet, farm);
    const position = generateOrcaPositionPDA(params.positionMint);
    const positionTokenAccount = generateAta(userPda, params.positionMint);
    const positionData = await Anchor.instance().orcaProgram.account.position.fetch(position);
    if (positionData === null) {
      throw new Error(`Position: ${position} does not exist or already closed. Position mint: ${params.positionMint}`);
    }
    const whirlpool = positionData.whirlpool;
    const whirlpoolData = await Anchor.instance().orcaProgram.account.whirlpool.fetch(whirlpool);
    const mintA = whirlpoolData!.tokenMintA;
    const mintB = whirlpoolData!.tokenMintB;
    const tokenOwnerAccountA = generateAta(userPda, mintA);
    const tokenOwnerAccountB = generateAta(userPda, mintB);
    const { publicKey: tickArrayLower } = getTickArrayFromTickIndex(positionData.tickLowerIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const { publicKey: tickArrayUpper } = getTickArrayFromTickIndex(positionData.tickUpperIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const ownerFeeA = generateAta(SITE_FEE_OWNER, mintA);
    const ownerFeeB = generateAta(SITE_FEE_OWNER, mintB);
    const extensionIx = await Anchor.instance().iyfExtension.methods
      .orcaWithdraw(params.liquidityAmount)
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        positionMint: params.positionMint,
        whirlpool,
        position,
        positionTokenAccount,
        tokenOwnerAccountA,
        tokenOwnerAccountB,
        tokenVaultA: whirlpoolData!.tokenVaultA,
        tokenVaultB: whirlpoolData!.tokenVaultB,
        tickArrayLower,
        tickArrayUpper,
        ownerFeeA,
        ownerFeeB,
        orcaWhirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      })
      .instruction()
    const orcaIx = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(
        extensionIx.data
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        extensionIx.keys[4],
        extensionIx.keys[5],
        extensionIx.keys[6],
        extensionIx.keys[7],
        extensionIx.keys[8],
        extensionIx.keys[9],
        extensionIx.keys[10],
        extensionIx.keys[11],
        extensionIx.keys[12],
        extensionIx.keys[13],
        extensionIx.keys[14],
        extensionIx.keys[15],
        extensionIx.keys[16],
        extensionIx.keys[17],
        extensionIx.keys[18],
      ])
      .instruction();
      const withdrawFromPda = await withdrawMultipleToken({
        payer: params.userWallet,
        withdraw: [
          { mint: mintA },
          { mint: mintB },
        ],
      });
    orcaIx.keys[2].isSigner = true; // authority must be signer.
    const mainInstructions = [orcaIx, withdrawFromPda];
    return createTransactionMeta({
      payer: params.userWallet,
      description: `Withdraw deposits from Orca Position: ${position}`,
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }

  /**
   * Creates orca instruction that claims fees and rewards
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse.
   */
  async orcaClaimRewards({ connection, params }: TxgenParams<OrcaClaimRewards>): Promise<TransactionMetadataResponse> {
    const farm = USDC_FARM;
    const userPda = generateUserPda(params.userWallet, farm);
    const position = generateOrcaPositionPDA(params.positionMint);
    const positionTokenAccount = generateAta(userPda, params.positionMint);
    const positionData = await Anchor.instance().orcaProgram.account.position.fetch(position);
    if (positionData === null) {
      throw new Error(`Position: ${position} does not exist or already closed. Position mint: ${params.positionMint}`);
    }
    const whirlpool = positionData.whirlpool;
    const whirlpoolData = await Anchor.instance().orcaProgram.account.whirlpool.fetch(whirlpool);
    const mintA = whirlpoolData!.tokenMintA;
    const mintB = whirlpoolData!.tokenMintB;
    const tokenOwnerAccountA = generateAta(userPda, mintA);
    const tokenOwnerAccountB = generateAta(userPda, mintB);
    const { publicKey: tickArrayLower } = getTickArrayFromTickIndex(positionData.tickLowerIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const { publicKey: tickArrayUpper } = getTickArrayFromTickIndex(positionData.tickUpperIndex, whirlpoolData!.tickSpacing, whirlpool, ORCA_WHIRLPOOL_PROGRAM);
    const ownerFeeA = generateAta(SITE_FEE_OWNER, mintA);
    const ownerFeeB = generateAta(SITE_FEE_OWNER, mintB);
    const remainingAccounts: web3.AccountMeta[] = [];
    for (const rewardInfo of whirlpoolData!.rewardInfos) {
      if (rewardInfo.mint.toString() !== web3.SystemProgram.programId.toString()) {
        const rewardOwnerAccount = generateAta(userPda, rewardInfo.mint);
        const rewardVault = rewardInfo.vault;
        const rewardFee = generateAta(SITE_FEE_OWNER, rewardInfo.mint);
        remainingAccounts.push({ pubkey: rewardOwnerAccount, isSigner: false, isWritable: true });
        remainingAccounts.push({ pubkey: rewardVault, isSigner: false, isWritable: true });
        remainingAccounts.push({ pubkey: rewardFee, isSigner: false, isWritable: true });
      }
    }
    whirlpoolData!.rewardInfos[0].mint
    const extensionIx = await Anchor.instance().iyfExtension.methods
      .orcaClaimRewards()
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        whirlpool,
        positionMint: params.positionMint,
        position,
        tickArrayLower,
        tickArrayUpper,
        positionTokenAccount,
        tokenVaultA: whirlpoolData!.tokenVaultA,
        tokenVaultB: whirlpoolData!.tokenVaultB,
        tokenOwnerAccountA,
        tokenOwnerAccountB,
        ownerFeeA,
        ownerFeeB,
        orcaWhirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      })
      .remainingAccounts(remainingAccounts)
      .instruction()
    const orcaIx = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(
        extensionIx.data
      )
      .accounts({
        farm,
        userPda,
        authority: params.userWallet,
        iyfProgram: IYF_MAIN,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        extensionIx.keys[4],
        extensionIx.keys[5],
        extensionIx.keys[6],
        extensionIx.keys[7],
        extensionIx.keys[8],
        extensionIx.keys[9],
        extensionIx.keys[10],
        extensionIx.keys[11],
        extensionIx.keys[12],
        extensionIx.keys[13],
        extensionIx.keys[14],
        extensionIx.keys[15],
        extensionIx.keys[16],
        extensionIx.keys[17],
        extensionIx.keys[18],
      ])
      .instruction();
      const withdrawFromPda = await withdrawMultipleToken({
        payer: params.userWallet,
        withdraw: [
          { mint: mintA },
          { mint: mintB },
        ],
      });
    orcaIx.keys[2].isSigner = true; // authority must be signer.
    const mainInstructions = [orcaIx, withdrawFromPda];
    return createTransactionMeta({
      payer: params.userWallet,
      description: `Claim rewards from Orca Position: ${position}`,
      addressLookupTableAddresses: GLOBAL_ALT,
      mainInstructions,
    });
  }
}

export const txgen = new Transactions();
