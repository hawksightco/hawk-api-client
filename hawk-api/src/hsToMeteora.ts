import * as web3 from "@solana/web3.js";
import { MeteoraToHawksightParams } from "./types";
import {
  ASSOCIATED_TOKEN_PROGRAM,
  HS_AUTHORITY,
  IYF_EXTENSION,
  IYF_MAIN,
  METEORA_DLMM_PROGRAM,
  SITE_FEE_OWNER,
  USDC_FARM
} from "./addresses";
import { Anchor } from "./anchor";
import { BN } from "bn.js";
import * as util from "./functions";

/**
 * Convert listed meteora instruction to generalized hawksight meteora cpi
 *
 * @param params
 * @returns
 */
export async function meteoraToHawksight({ixs, userPda, authority}: MeteoraToHawksightParams): Promise<web3.TransactionInstruction[]> {
  const _ixs: web3.TransactionInstruction[] = [];
  for (const ix of ixs) {
    const _ix = await HawksightMeteoraCpi.factory(ix, userPda, authority).getInstruction();
    if (ix.programId.toString() === ASSOCIATED_TOKEN_PROGRAM.toString() && ix.keys.length === 6) {
      ix.keys[0] = { ...ix.keys[0], pubkey: authority };
    }
    _ixs.push(_ix);
  }
  return _ixs;
}

/**
 * Convert listed meteora instruction to hawksight meteora automation cpi
 *
 * @param params
 * @returns
 */
export async function meteoraToHawksightAutomationIxs({ixs, userPda, authority}: MeteoraToHawksightParams): Promise<web3.TransactionInstruction[]> {
  const _ixs: web3.TransactionInstruction[] = [];
  for (const ix of ixs) {
    const _ix = await HawksightMeteoraAutomationCpi.factory(ix, userPda, authority).getInstruction();
    if (ix.programId.toString() === ASSOCIATED_TOKEN_PROGRAM.toString() && ix.keys.length === 6) {
      ix.keys[0] = { ...ix.keys[0], pubkey: HS_AUTHORITY };
    }
    _ixs.push(_ix);
  }
  return _ixs;
}

/**
 * Abstract base class `HawksightMeteoraCpi` for handling and chaining transaction instructions.
 * This class provides a framework for creating and linking complex transaction processes in a blockchain environment.
 *
 * Attributes:
 * - `ix`: web3.TransactionInstruction - The transaction instruction associated with this CPI.
 * - `userPda`: web3.PublicKey - The public key of the user's program-derived address (PDA).
 * - `authority`: web3.PublicKey - The public key of the authority that can sign transactions.
 * - `_next`: HawksightMeteoraCpi | undefined - Pointer to the next CPI in the chain.
 * - `sighash`: Buffer - A buffer representing the signature hash used for identifying and validating instructions.
 *
 * Methods:
 * - `constructor(ix, userPda, authority, sighash)`: Constructs an instance of the HawksightMeteoraCpi.
 * - `factory(ix, userPda, authority)`: Static factory method to create a chain of CPIs starting with `InitializePosition` and linking subsequent operations.
 * - `getInstruction()`: Returns the modified transaction instruction after processing by matching CPIs in the chain.
 * - `replace()`: Abstract method to be implemented by subclasses to modify the transaction keys or other properties.
 * - `next(next)`: Chains the current CPI instance to the next one.
 * - `sighashMatch()`: Checks if the current transaction instruction matches the provided sighash and recurses through the chain if not.
 * - `programIdMatch()`: Checks if the program ID of the transaction matches the expected ID.
 * - `addHawksightCpi()`: Modifies the transaction instruction to include specific Hawksight CPI details.
 *
 * Usage:
 * This class is intended to be extended by specific CPI implementations like `InitializePosition`, each implementing their own `replace()` method to handle specific transaction modifications.
 */
abstract class HawksightMeteoraCpi {

  private _next?: HawksightMeteoraCpi;

  /**
   * Constructs an instance of HawksightMeteoraCpi with the necessary transaction parameters.
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   * @param sighash A Buffer containing the sighash used for matching the transaction instruction.
   */
  constructor(
    protected readonly ix: web3.TransactionInstruction,
    protected readonly userPda: web3.PublicKey,
    protected readonly authority: web3.PublicKey,
    protected readonly sighash: Buffer,
  ) {}

  /**
   * Factory method to create and link a chain of CPIs starting from `InitializePosition`.
   * Subsequent CPIs include operations like adding liquidity, removing liquidity, claiming fees, and rewards, and closing the position.
   * @param ix The initial transaction instruction.
   * @param userPda The user's public key.
   * @param authority The authority public key.
   * @returns The first CPI in the chain.
   */
  static factory(ix: web3.TransactionInstruction, userPda: web3.PublicKey, authority: web3.PublicKey): HawksightMeteoraCpi {
    const chain = new InitializePosition(ix, userPda, authority);
    chain
      .next(new AddLiquidityByWeight(ix, userPda, authority))
      .next(new AddLiquidityOneSide(ix, userPda, authority))
      .next(new AddLiquidityByStrategy(ix, userPda, authority))
      .next(new AddLiquidityByStrategyOneSide(ix, userPda, authority))
      .next(new RemoveLiquidity(ix, userPda, authority))
      .next(new RemoveLiquidityByRange(ix, userPda, authority))
      .next(new ClaimFee(ix, userPda, authority))
      .next(new ClaimReward(ix, userPda, authority))
      .next(new ClosePosition(ix, userPda, authority));
    return chain;
  }

  /**
   * Retrieves and possibly modifies the transaction instruction based on matching conditions.
   * If a matching CPI is found in the chain, it performs modifications and returns the updated instruction.
   * @returns The (possibly modified) transaction instruction.
   */
  async getInstruction(): Promise<web3.TransactionInstruction> {
    const matchInstance = this.sighashMatch();
    if (this.programIdMatch() && matchInstance !== undefined) {
      matchInstance.replace();
      await matchInstance.addHawksightCpi();
      return this.ix;
    }
    return this.ix;
  }

  /**
   * Modifies the transaction instruction to include specific Hawksight CPI details.
   * Prepares the instruction for execution by adjusting its program ID and data based on Hawksight criteria.
   */
  protected async addHawksightCpi(): Promise<void> {
    const METEORA_PROGRAM = METEORA_DLMM_PROGRAM;
    const size = Buffer.alloc(4);
    size.writeUint32LE(this.ix.data.length);
    const data = Buffer.concat([util.sighash('meteora_dynamic_cpi'), size, this.ix.data]);
    this.ix.programId = IYF_MAIN;
    this.ix.data = data;
    this.ix.keys.unshift(...[
      { pubkey: this.userPda, isSigner: false, isWritable: false },
      { pubkey: this.authority, isSigner: true, isWritable: true },
      { pubkey: METEORA_PROGRAM, isSigner: false, isWritable: false },
    ]);
  }

  /**
   * Abstract method to be implemented by subclasses for replacing specific parts of the transaction.
   * This method should handle specific adjustments to the transaction keys or other properties.
   */
  protected abstract replace(): void;

  /**
   * Adds a subsequent CPI to the chain.
   * @param next The next CPI object to link.
   * @returns The added CPI object, allowing for method chaining.
   */
  private next(next: HawksightMeteoraCpi): HawksightMeteoraCpi {
    this._next = next;
    return this._next;
  }

  /**
   * Recursively checks this CPI and subsequent ones for a sighash match in the transaction data.
   * @returns The first CPI instance in the chain that matches the sighash, or undefined if no match is found.
   */
  private sighashMatch(): HawksightMeteoraCpi | undefined {
    try {
      const match = util.sighashMatch(this.ix.data, this.sighash);
      if (match) {
        return this;
      } else if (this._next !== undefined) {
        return this._next?.sighashMatch();
      }
    } catch {
      if (this._next !== undefined) {
        return this._next?.sighashMatch();
      }
    }
    return undefined;
  }

  /**
   * Checks if the program ID of the transaction instruction matches the expected program ID.
   * @returns True if the program ID matches, otherwise false.
   */
  private programIdMatch(): boolean {
    return this.ix.programId.equals(METEORA_DLMM_PROGRAM);
  }
}

/**
 * Handles the initialization of a position in a blockchain transaction.
 * This class extends the HawksightMeteoraCpi and provides specific logic to modify the transaction instruction for position initialization.
 */
class InitializePosition extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("InitializePosition"))
  }

  /**
   * Modifies the transaction keys to set the correct public keys for an initial position setup.
   */
  protected replace(): void {
    this.ix.keys[0].pubkey = this.authority;
    this.ix.keys[3].pubkey = this.userPda;
    this.ix.keys[3].isSigner = false;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityByWeight extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityByWeight"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this.ix.keys[11].pubkey = this.userPda;
    this.ix.keys[11].isSigner = false;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityByStrategy extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityByStrategy"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this.ix.keys[11].pubkey = this.userPda;
    this.ix.keys[11].isSigner = false;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityOneSide extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityOneSide"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this.ix.keys[8].pubkey = this.userPda;
    this.ix.keys[8].isSigner = false;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityByStrategyOneSide extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityByStrategyOneSide"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this.ix.keys[8].pubkey = this.userPda;
    this.ix.keys[8].isSigner = false;
  }
}

/**
 * Facilitates the removal of liquidity from a blockchain-based financial system.
 */
class RemoveLiquidity extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
    sighash: Buffer = util.sighash("RemoveLiquidity")
  ) {
    super(ix, userPda, authority, sighash)
  }

  /**
   * Customizes the transaction keys to correctly handle the removal of liquidity.
   */
  protected replace(): void {
    this.ix.keys[11].pubkey = this.userPda;
    this.ix.keys[11].isSigner = false;
  }
}

/**
 * Facilitates the removal of liquidity from a blockchain-based financial system.
 */
class RemoveLiquidityByRange extends RemoveLiquidity {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("RemoveLiquidityByRange"))
  }
}

/**
 * Enables the claiming of fees generated from transactions within a blockchain protocol.
 */
class ClaimFee extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClaimFee"))
  }

  /**
   * Modifies transaction keys for the purpose of claiming transaction fees.
   */
  protected replace(): void {
    this.ix.keys[4].pubkey = this.userPda;
    this.ix.keys[4].isSigner = false;
  }

  /**
   * Overrides default add hawksight cpi to use meteoraDlmmClaimFee instead of meteoraDynamicCpi
   */
  protected async addHawksightCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;

    // Get token mints X and Y
    const tokenXMint = this.ix.keys[9].pubkey;
    const tokenYMint = this.ix.keys[10].pubkey;

    // Generate owner fee X and Y ATA
    const ownerFeeX = util.generateAta(SITE_FEE_OWNER, tokenXMint);
    const ownerFeeY = util.generateAta(SITE_FEE_OWNER, tokenYMint);

    // Generate IX via extension contract
    const claimFeeIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmClaimFee()
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        lbPair: this.ix.keys[0].pubkey,
        position: this.ix.keys[1].pubkey,
        binArrayLower: this.ix.keys[2].pubkey,
        binArrayUpper: this.ix.keys[3].pubkey,
        reserveX: this.ix.keys[5].pubkey,
        reserveY: this.ix.keys[6].pubkey,
        userTokenX: this.ix.keys[7].pubkey,
        userTokenY: this.ix.keys[8].pubkey,
        tokenXMint: this.ix.keys[9].pubkey,
        tokenYMint: this.ix.keys[10].pubkey,
        tokenProgram: this.ix.keys[11].pubkey,
        eventAuthority: this.ix.keys[12].pubkey,
        meteoraDlmmProgram: this.ix.keys[13].pubkey,
        ownerFeeX,
        ownerFeeY,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(claimFeeIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        claimFeeIx.keys[4],
        claimFeeIx.keys[5],
        claimFeeIx.keys[6],
        claimFeeIx.keys[7],
        claimFeeIx.keys[8],
        claimFeeIx.keys[9],
        claimFeeIx.keys[10],
        claimFeeIx.keys[11],
        claimFeeIx.keys[12],
        claimFeeIx.keys[13],
        claimFeeIx.keys[14],
        claimFeeIx.keys[15],
        claimFeeIx.keys[16],
        claimFeeIx.keys[17],
        claimFeeIx.keys[18],
      ])
      .instruction();

    // Override the instruction
    this.ix.programId = ix.programId;
    this.ix.data = ix.data;
    this.ix.keys = ix.keys;
  }
}

/**
 * Manages the claiming of rewards in blockchain operations, typically associated with staking or similar activities.
 */
class ClaimReward extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClaimReward"))
  }

  /**
   * Adjusts transaction keys to facilitate the claiming of rewards.
   */
  protected replace(): void {
    this.ix.keys[4].pubkey = this.userPda;
    this.ix.keys[4].isSigner = false;
  }

  /**
   * Overrides default add hawksight cpi to use meteoraDlmmClaimReward instead of meteoraDynamicCpi
   */
  protected async addHawksightCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;

    // Get token mint
    const rewardMint = this.ix.keys[6].pubkey;

    // Generate owner fee X and Y ATA
    const ownerFee = util.generateAta(SITE_FEE_OWNER, rewardMint);

    // Get reward index from parameter
    const rewardIndex = new BN(this.ix.data.readBigInt64LE(8).toString());

    // Generate IX via extension contract
    const claimReward = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmClaimReward(rewardIndex)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        lbPair: this.ix.keys[0].pubkey,
        position: this.ix.keys[1].pubkey,
        binArrayLower: this.ix.keys[2].pubkey,
        binArrayUpper: this.ix.keys[3].pubkey,
        rewardVault: this.ix.keys[5].pubkey,
        rewardMint: this.ix.keys[6].pubkey,
        userTokenAccount: this.ix.keys[7].pubkey,
        tokenProgram: this.ix.keys[8].pubkey,
        eventAuthority: this.ix.keys[9].pubkey,
        meteoraDlmmProgram: this.ix.keys[10].pubkey,
        ownerFee,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(claimReward.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        claimReward.keys[4],
        claimReward.keys[5],
        claimReward.keys[6],
        claimReward.keys[7],
        claimReward.keys[8],
        claimReward.keys[9],
        claimReward.keys[10],
        claimReward.keys[11],
        claimReward.keys[12],
        claimReward.keys[13],
        claimReward.keys[14],
      ])
      .instruction();

    // Override the instruction
    this.ix.programId = ix.programId;
    this.ix.data = ix.data;
    this.ix.keys = ix.keys;
  }
}

/**
 * Handles the closure of a position within a blockchain transaction.
 */
class ClosePosition extends HawksightMeteoraCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClosePosition"))
  }

  /**
   * Customizes the transaction keys to properly close a position, ensuring all relevant keys are set correctly.
   */
  protected replace(): void {
    this.ix.keys[4].pubkey = this.userPda;
    this.ix.keys[4].isSigner = false;
    this.ix.keys[5].pubkey = this.authority;
  }
}


abstract class HawksightMeteoraAutomationCpi {

  private _next?: HawksightMeteoraAutomationCpi;

  /**
   * Instruction
   */
  get ix() { return this._ix }

  /**
   * Constructs an instance of HawksightMeteoraCpi with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   * @param sighash A Buffer containing the sighash used for matching the transaction instruction.
   */
  constructor(
    protected _ix: web3.TransactionInstruction,
    protected readonly userPda: web3.PublicKey,
    protected readonly authority: web3.PublicKey,
    protected readonly sighash: Buffer,
  ) {}

  /**
   * Factory method to create and link a chain of CPIs starting from `InitializePosition`.
   * Subsequent CPIs include operations like adding liquidity, removing liquidity, claiming fees, and rewards, and closing the position.
   * @param ix The initial transaction instruction.
   * @param userPda The user's public key.
   * @param authority The authority public key.
   * @returns The first CPI in the chain.
   */
  static factory(ix: web3.TransactionInstruction, userPda: web3.PublicKey, authority: web3.PublicKey): HawksightMeteoraAutomationCpi {
    const chain = new InitializePositionAutomation(ix, userPda, authority);
    chain
      .next(new AddLiquidityByWeightAutomation(ix, userPda, authority))
      .next(new AddLiquidityOneSideAutomation(ix, userPda, authority))
      .next(new RemoveLiquidityAutomation(ix, userPda, authority))
      .next(new RemoveLiquidityByRangeAutomation(ix, userPda, authority))
      .next(new ClaimFeeAutomation(ix, userPda, authority))
      .next(new ClaimRewardAutomation(ix, userPda, authority))
      .next(new ClosePositionAutomation(ix, userPda, authority));
    return chain;
  }

  /**
   * Retrieves and possibly modifies the transaction instruction based on matching conditions.
   * If a matching CPI is found in the chain, it performs modifications and returns the updated instruction.
   * @returns The (possibly modified) transaction instruction.
   */
  async getInstruction(): Promise<web3.TransactionInstruction> {
    const matchInstance = this.sighashMatch();
    if (this.programIdMatch() && matchInstance !== undefined) {
      matchInstance.replace();
      await matchInstance.replaceCpi();
      return matchInstance.ix;
    }
    return this.ix;
  }

  /**
   * Abstract method to be implemented by subclasses for replacing specific parts of the transaction.
   * This method should handle specific adjustments to the transaction keys or other properties.
   */
  protected abstract replace(): void;

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected abstract replaceCpi(): Promise<void>;

  /**
   * Adds a subsequent CPI to the chain.
   * @param next The next CPI object to link.
   * @returns The added CPI object, allowing for method chaining.
   */
  private next(next: HawksightMeteoraAutomationCpi): HawksightMeteoraAutomationCpi {
    this._next = next;
    return this._next;
  }

  /**
   * Recursively checks this CPI and subsequent ones for a sighash match in the transaction data.
   * @returns The first CPI instance in the chain that matches the sighash, or undefined if no match is found.
   */
  private sighashMatch(): HawksightMeteoraAutomationCpi | undefined {
    try {
      const match = util.sighashMatch(this.ix.data, this.sighash);
      if (match) {
        return this;
      } else if (this._next !== undefined) {
        return this._next.sighashMatch();
      }
    } catch {
      if (this._next !== undefined) {
        return this._next.sighashMatch();
      }
    }
    return undefined;
  }

  /**
   * Checks if the program ID of the transaction instruction matches the expected program ID.
   * @returns True if the program ID matches, otherwise false.
   */
  private programIdMatch(): boolean {
    return this.ix.programId.equals(METEORA_DLMM_PROGRAM);
  }
}

/**
 * Handles the initialization of a position in a blockchain transaction.
 * This class extends the HawksightMeteoraCpi and provides specific logic to modify the transaction instruction for position initialization.
 */
class InitializePositionAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("InitializePosition"))
  }

  /**
   * Modifies the transaction keys to set the correct public keys for an initial position setup.
   */
  protected replace(): void {
    this._ix.keys[0].pubkey = this.authority;
    this._ix.keys[3].pubkey = this.userPda;
    this._ix.keys[3].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Generate IX via extension contract
    const data = this.ix.data.subarray(8);
    const lowerBinId = data.subarray(0, 4).readInt32LE();
    const width = data.subarray(4).readInt32LE();
    const initializePositionIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmInitializePositionAutomation(
        lowerBinId,
        width,
      )
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: this.ix.keys[1].pubkey,
        lbPair: this.ix.keys[2].pubkey,
        systemProgram: this.ix.keys[4].pubkey,
        rent: this.ix.keys[5].pubkey,
        eventAuthority: this.ix.keys[6].pubkey,
        meteoraDlmmProgram: this.ix.keys[7].pubkey,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(initializePositionIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        initializePositionIx.keys[4],
        initializePositionIx.keys[5],
        initializePositionIx.keys[6],
        initializePositionIx.keys[7],
        initializePositionIx.keys[8],
        initializePositionIx.keys[9],
        initializePositionIx.keys[10],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityByWeightAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityByStrategy"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this._ix.keys[11].pubkey = this.userPda;
    this._ix.keys[11].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Get token mints X and Y
    const tokenXMint = this.ix.keys[7].pubkey;
    const tokenYMint = this.ix.keys[8].pubkey;

    // Generate IX via extension contract
    const data = this.ix.data.subarray(8);
    const activeId = data.subarray(16, 20).readInt32LE();
    const maxActiveBinSlippage = data.subarray(20, 24).readInt32LE();
    const strategyParametersMinBinId = data.subarray(24, 28).readInt32LE();
    const strategyParametersMaxBinId = data.subarray(28, 32).readInt32LE();
    const strategyParametersStrategyType = data[32];
    const strategyParametersParameters = Array.from(data.subarray(33));
    const depositIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmDepositAutomation(
        activeId,
        maxActiveBinSlippage,
        strategyParametersMinBinId,
        strategyParametersMaxBinId,
        strategyParametersStrategyType,
        strategyParametersParameters,
      )
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: this.ix.keys[0].pubkey,
        lbPair: this.ix.keys[1].pubkey,
        binArrayBitmapExtension: this.ix.keys[2].pubkey,
        userTokenX: this.ix.keys[3].pubkey,
        userTokenY: this.ix.keys[4].pubkey,
        reserveX: this.ix.keys[5].pubkey,
        reserveY: this.ix.keys[6].pubkey,
        tokenXMint,
        tokenYMint,
        binArrayLower: this.ix.keys[9].pubkey,
        binArrayUpper: this.ix.keys[10].pubkey,
        tokenXProgram: this.ix.keys[12].pubkey,
        tokenYProgram: this.ix.keys[13].pubkey,
        eventAuthority: this.ix.keys[14].pubkey,
        meteoraDlmmProgram: this.ix.keys[15].pubkey,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(depositIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        depositIx.keys[4],
        depositIx.keys[5],
        depositIx.keys[6],
        depositIx.keys[7],
        depositIx.keys[8],
        depositIx.keys[9],
        depositIx.keys[10],
        depositIx.keys[11],
        depositIx.keys[12],
        depositIx.keys[13],
        depositIx.keys[14],
        depositIx.keys[15],
        depositIx.keys[16],
        depositIx.keys[17],
        depositIx.keys[18],
        depositIx.keys[19],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Adjusts transaction instructions to add liquidity based on a specific weight in a financial application.
 * This class is designed for blockchain operations that manage liquidity pools.
 */
class AddLiquidityOneSideAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("AddLiquidityByStrategyOneSide"))
  }

  /**
   * Alters the transaction keys for adding liquidity, ensuring the user's PDA is correctly configured.
   */
  protected replace(): void {
    this._ix.keys[8].pubkey = this.userPda;
    this._ix.keys[8].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Generate IX via extension contract
    const depositIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmOneSideDeposit(this.ix.data.subarray(8))
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: this.ix.keys[0].pubkey,
        lbPair: this.ix.keys[1].pubkey,
        binArrayBitmapExtension: this.ix.keys[2].pubkey,
        userToken: this.ix.keys[3].pubkey,
        reserve: this.ix.keys[4].pubkey,
        tokenMint: this.ix.keys[5].pubkey,
        binArrayLower: this.ix.keys[6].pubkey,
        binArrayUpper: this.ix.keys[7].pubkey,
        tokenProgram: this.ix.keys[9].pubkey,
        eventAuthority: this.ix.keys[10].pubkey,
        meteoraDlmmProgram: this.ix.keys[11].pubkey,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(depositIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        depositIx.keys[4],
        depositIx.keys[5],
        depositIx.keys[6],
        depositIx.keys[7],
        depositIx.keys[8],
        depositIx.keys[9],
        depositIx.keys[10],
        depositIx.keys[11],
        depositIx.keys[12],
        depositIx.keys[13],
        depositIx.keys[14],
        depositIx.keys[15],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Facilitates the removal of liquidity from a blockchain-based financial system.
 */
class RemoveLiquidityAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
    sighash: Buffer = util.sighash("RemoveLiquidity")
  ) {
    super(ix, userPda, authority, sighash)
  }

  /**
   * Customizes the transaction keys to correctly handle the removal of liquidity.
   */
  protected replace(): void {
    this._ix.keys[11].pubkey = this.userPda;
    this._ix.keys[11].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {
    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Get token mints X and Y
    const tokenXMint = this.ix.keys[7].pubkey;
    const tokenYMint = this.ix.keys[8].pubkey;

    // Generate IX via extension contract
    const withdrawIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmWithdrawAutomation(this.ix.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: this.ix.keys[0].pubkey,
        lbPair: this.ix.keys[1].pubkey,
        binArrayBitmapExtension: this.ix.keys[2].pubkey,
        userTokenX: this.ix.keys[3].pubkey,
        userTokenY: this.ix.keys[4].pubkey,
        reserveX: this.ix.keys[5].pubkey,
        reserveY: this.ix.keys[6].pubkey,
        tokenXMint,
        tokenYMint,
        binArrayLower: this.ix.keys[9].pubkey,
        binArrayUpper: this.ix.keys[10].pubkey,
        tokenXProgram: this.ix.keys[12].pubkey,
        tokenYProgram: this.ix.keys[13].pubkey,
        eventAuthority: this.ix.keys[14].pubkey,
        meteoraDlmmProgram: this.ix.keys[15].pubkey,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(withdrawIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        withdrawIx.keys[4],
        withdrawIx.keys[5],
        withdrawIx.keys[6],
        withdrawIx.keys[7],
        withdrawIx.keys[8],
        withdrawIx.keys[9],
        withdrawIx.keys[10],
        withdrawIx.keys[11],
        withdrawIx.keys[12],
        withdrawIx.keys[13],
        withdrawIx.keys[14],
        withdrawIx.keys[15],
        withdrawIx.keys[16],
        withdrawIx.keys[17],
        withdrawIx.keys[18],
        withdrawIx.keys[19],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Facilitates the removal of liquidity from a blockchain-based financial system.
 */
class RemoveLiquidityByRangeAutomation extends RemoveLiquidityAutomation {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("RemoveLiquidityByRange"))
  }
}

/**
 * Enables the claiming of fees generated from transactions within a blockchain protocol.
 */
class ClaimFeeAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClaimFee"))
  }

  /**
   * Modifies transaction keys for the purpose of claiming transaction fees.
   */
  protected replace(): void {
    this._ix.keys[4].pubkey = this.userPda;
    this._ix.keys[4].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {

    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Get token mints X and Y
    const tokenXMint = this.ix.keys[9].pubkey;
    const tokenYMint = this.ix.keys[10].pubkey;

    // Generate owner fee X and Y ATA
    const ownerFeeX = util.generateAta(SITE_FEE_OWNER, tokenXMint);
    const ownerFeeY = util.generateAta(SITE_FEE_OWNER, tokenYMint);

    // Generate IX via extension contract
    const claimFeeIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmClaimFeeAutomation()
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        lbPair: this.ix.keys[0].pubkey,
        position: this.ix.keys[1].pubkey,
        binArrayLower: this.ix.keys[2].pubkey,
        binArrayUpper: this.ix.keys[3].pubkey,
        reserveX: this.ix.keys[5].pubkey,
        reserveY: this.ix.keys[6].pubkey,
        userTokenX: this.ix.keys[7].pubkey,
        userTokenY: this.ix.keys[8].pubkey,
        tokenXMint: this.ix.keys[9].pubkey,
        tokenYMint: this.ix.keys[10].pubkey,
        tokenProgram: this.ix.keys[11].pubkey,
        eventAuthority: this.ix.keys[12].pubkey,
        meteoraDlmmProgram: this.ix.keys[13].pubkey,
        ownerFeeX,
        ownerFeeY,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(claimFeeIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        claimFeeIx.keys[4],
        claimFeeIx.keys[5],
        claimFeeIx.keys[6],
        claimFeeIx.keys[7],
        claimFeeIx.keys[8],
        claimFeeIx.keys[9],
        claimFeeIx.keys[10],
        claimFeeIx.keys[11],
        claimFeeIx.keys[12],
        claimFeeIx.keys[13],
        claimFeeIx.keys[14],
        claimFeeIx.keys[15],
        claimFeeIx.keys[16],
        claimFeeIx.keys[17],
        claimFeeIx.keys[18],
        claimFeeIx.keys[19],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Manages the claiming of rewards in blockchain operations, typically associated with staking or similar activities.
 */
class ClaimRewardAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClaimReward"))
  }

  /**
   * Adjusts transaction keys to facilitate the claiming of rewards.
   */
  protected replace(): void {
    this._ix.keys[4].pubkey = this.userPda;
    this._ix.keys[4].isSigner = false;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {

    // Get reward index from parameter
    const rewardIndex = new BN(this.ix.data.readBigInt64LE(8).toString());

    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Generate owner fee ATA
    const rewardMint = this.ix.keys[6].pubkey;
    const ownerFee = util.generateAta(SITE_FEE_OWNER, rewardMint);

    // Generate IX via extension contract
    const claimRewardIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmClaimRewardAutomation(rewardIndex)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        lbPair: this.ix.keys[0].pubkey,
        position: this.ix.keys[1].pubkey,
        binArrayLower: this.ix.keys[1].pubkey,
        binArrayUpper: this.ix.keys[2].pubkey,
        rewardVault: this.ix.keys[5].pubkey,
        rewardMint,
        userTokenAccount: this.ix.keys[7].pubkey,
        tokenProgram: this.ix.keys[8].pubkey,
        eventAuthority: this.ix.keys[9].pubkey,
        meteoraDlmmProgram: this.ix.keys[10].pubkey,
        ownerFee,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(claimRewardIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        claimRewardIx.keys[4],
        claimRewardIx.keys[5],
        claimRewardIx.keys[6],
        claimRewardIx.keys[7],
        claimRewardIx.keys[8],
        claimRewardIx.keys[9],
        claimRewardIx.keys[10],
        claimRewardIx.keys[11],
        claimRewardIx.keys[12],
        claimRewardIx.keys[13],
        claimRewardIx.keys[14],
        claimRewardIx.keys[15],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}

/**
 * Handles the closure of a position within a blockchain transaction.
 */
class ClosePositionAutomation extends HawksightMeteoraAutomationCpi {
  /**
   * Constructs an instance of InitializePosition with the necessary transaction parameters.
   *
   * @param ix The core transaction instruction.
   * @param userPda The user's program-derived address (PDA) as a public key.
   * @param authority The authority public key that has signing capabilities over the transaction.
   */
  constructor(
    ix: web3.TransactionInstruction,
    userPda: web3.PublicKey,
    authority: web3.PublicKey,
  ) {
    super(ix, userPda, authority, util.sighash("ClosePosition"))
  }

  /**
   * Customizes the transaction keys to properly close a position, ensuring all relevant keys are set correctly.
   */
  protected replace(): void {
    this._ix.keys[4].pubkey = this.userPda;
    this._ix.keys[4].isSigner = false;
    this._ix.keys[5].pubkey = this.authority;
  }

  /**
   * Replaces Meteora CPI with Hawksight CPI that calls the target Meteora CPI.
   */
  protected async replaceCpi(): Promise<void> {

    // Common parameters
    const farm = USDC_FARM;
    const userPda = this.userPda;
    const authority = this.authority;
    const iyfProgram = IYF_MAIN;
    const hawksightAuthority = HS_AUTHORITY;

    // Generate IX via extension contract
    const closePositionIx = await Anchor.instance().iyfExtension.methods
      .meteoraDlmmClosePositionAutomation()
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        hawksightAuthority,
        position: this.ix.keys[0].pubkey,
        lbPair: this.ix.keys[1].pubkey,
        binArrayLower: this.ix.keys[2].pubkey,
        binArrayUpper: this.ix.keys[3].pubkey,
        eventAuthority: this.ix.keys[6].pubkey,
        meteoraDlmmProgram: this.ix.keys[7].pubkey,
      }).instruction();

    // Instruction via main hawksight contract
    const ix = await Anchor.instance().iyfMain.methods
      .iyfExtensionExecute(closePositionIx.data)
      .accounts({
        farm,
        userPda,
        authority,
        iyfProgram,
        iyfExtensionProgram: IYF_EXTENSION,
      })
      .remainingAccounts([
        closePositionIx.keys[4],
        closePositionIx.keys[5],
        closePositionIx.keys[6],
        closePositionIx.keys[7],
        closePositionIx.keys[8],
        closePositionIx.keys[9],
        closePositionIx.keys[10],
      ])
      .instruction();

    // Override the instruction
    this._ix = ix;
  }
}
