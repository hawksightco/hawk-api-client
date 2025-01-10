import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import { Transaction as TransactionClass } from "./classes/Transaction";
export { Transaction as TransactionClass } from "./classes/Transaction";
import { StrategyType } from "@meteora-ag/dlmm";

export type AccountMeta = {
  isSigner: boolean,
  isWritable: boolean,
  pubkey: string,
}

export type TransactionInstruction = {
  programId: string,
  keys: AccountMeta[],
  data: string
};

export type Transaction = TransactionInstruction[];

export type Web3Transaction = web3.TransactionInstruction[];

export type BinRange = {
  lowerRange: number,
  upperRange: number,
}

export type Distribution =
  | "SPOT"
  | "CURVE"
  | "BID-ASK"
  | "SPOT-IMBALANCED"
  | "CURVE-IMBALANCED"
  | "BID-ASK-IMBALANCED"
  | "SPOT-ONE-SIDE"
  | "CURVE-ONE-SIDE"
  | "BID-ASK-ONE-SIDE";

export type MeteoraPoolInfo = {
  address: string,
  name: string,
  mint_x: string,
  mint_y: string,
  reserve_x: string,
  reserve_y: string,
  reserve_x_amount: number,
  reserve_y_amount: number,
  bin_step: number,
  base_fee_percentage: string,
  max_fee_percentage: string,
  protocol_fee_percentage: string,
  liquidity: string,
  reward_mint_x: string,
  reward_mint_y: string,
  fees_24h: number,
  today_fees: number,
  trade_volume_24h: number,
  cumulative_trade_volume: string,
  cumulative_fee_volume: string,
  current_price: number,
  apr: number,
  apy: number,
  hide: boolean
}

export enum Tags {
  Memecoin = "memecoin",
  Ecosystem = "ecosystem",
  Bluechip = "bluechip",
  Stablecoin = "stablecoin",
  SOL = "sol",
}

export enum Protocol {
  Saber = "saber",
  Orca = "orca",
  Meteora = "meteora",
  Raydium = "raydium",
}

interface BasePool {
  id: string;
  name: string;
  url: string;
  tags: Tags[];
  hidden: boolean;
}

export type Pool =
  | (BasePool & {
      protocol: Protocol.Saber;
      config: SaberPoolConfig; // contains all the related accounts to this strategy
    })
  | (BasePool & {
      protocol: Protocol.Orca;
      config: OrcaPoolConfig; // contains all the related accounts to this strategy
    })
  | (BasePool & {
      protocol: Protocol.Meteora;
      config: MeteoraPoolConfig; // contains all the related accounts to this strategy
    });

export type SaberPoolConfig = {};
export type OrcaPoolConfig = OrcaPoolInfo;
export type MeteoraPoolConfig = {
  address: string,
  mint_a: string,
  mint_b: string,
  reserve_a: string,
  reserve_b: string,
  reward_mint_a: string,
  reward_mint_b: string,
  bin_step: number,
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  verified: boolean;
};

// This should be serializable to web3.TransactionInstruction
export type Instruction = {
  accounts: {
    isSigner: boolean;
    isWritable: boolean;
    pubkey: string;
  }[];
  data: string;
  programId: string;
};

export type TransactionPriority = "Default" | "Low" | "Medium" | "High" | "VeryHigh" | "UnsafeMax" | "None";

export type Balance = {
  amount: string;
  mint: string;
};

export type UserPositionBalances = {
  balances: Balance[],
  fees: Balance[],
  rewards: Balance[],
};

export type UserPositionInfo = UserPositionBalances & ({
  protocol: Protocol.Meteora,
  info: {
    lowerBinId: number,
    upperBinId: number,
  }
} | {
  protocol: Protocol.Orca,
  info: null
} | {
  protocol: Protocol.Saber,
  info: null
});

export type UserPools = Record<string, UserPositionInfo>; // position, balances / rewards

export type UserPortfolio = {
  wallet: string,
  userPda: string,
  pools: Record<string, UserPools>, // pool, positions
}

export type PoolOut = UserPositionInfo & {
  positionAddress: string,
}

export type UserPortfolioOut = {
  wallet: string,
  userPda: string,
  pools: Record<string, PoolOut[]>,
}

export type OrcaPoolInfo = {
  address: string,
  feeApr: {
    day: number,
    month: number,
    week: number,
  }
  lpFeeRate: number,
  modifiedTimeMs: number,
  price: number,
  priceRange: {
    day: { min: number, max: number },
    month: { min: number, max: number },
    week: { min: number, max: number },
  },
  protocolFeeRate: number,
  reward0Apr: { day: number, week: number, month: number },
  reward1Apr: { day: number, week: number, month: number },
  reward2Apr: { day: number, week: number, month: number },
  tickSpacing: number,
  tokenA: {
    coingeckoId: string,
    decimals: number,
    logoURI: string,
    mint: string,
    name: string,
    poolToken: boolean,
    symbol: string,
    whitelisted: boolean,
  }
  tokenB: {
    coingeckoId: string,
    decimals: number,
    logoURI: string,
    mint: string,
    name: string,
    poolToken: boolean,
    symbol: string,
    whitelisted: boolean,
  },
  totalApr: { day: number, week: number, month: number },
  tvl: number,
  volume: { day: number, week: number, month: number },
  volumeDenominatedA: { day: number, week: number, month: number },
  volumeDemonimatedB: { day: number, week: number, month: number },
  whirlpoolsConfig: string,
  whitelisted: boolean,
}

export type OrcaPoolResponse = {
  whirlpools: OrcaPoolInfo[],
};

export type OrcaPoolInfoIndexed = Record<string, OrcaPoolInfo>;

export type TokenAccountInfo = {
  address: web3.PublicKey,
  owner: web3.PublicKey,
  mint: web3.PublicKey,
  amount: BN,
}

export type ResponseWithStatus<T> = {
  status: number,
  data: T
}

export type HealthResponse = Record<string, "OK" | "NOT OK">;

export type MeteoraDlmmActiveBin = Record<string, number>;

export type BadRequestError = {
  code: string,
  message: string,
  path: string,
};

export type TransactionMetadataResponse = {
  description: string;
  estimatedFeeInSOL: string,
  addressLookupTableAddresses: string[], // "alts" is confusing, copied jup's naming
  computeBudgetInstructions: Instruction[], // this enables for ease of access while also making them optional
  mainInstructions: Instruction[],
  payer: string,
  signature: string,
}

export type TransactionMetadata = {
  description: string,
  estimatedFeeInSOL: string,
  transaction: TransactionClass,
}

/**
 * Type definition for search indices and their associated hash.
 */
export type SearchIndices = {
  hash: string,
  indices: Record<string, Record<number, 1>>,
}

export interface SearchTokenStore {
  tokenIndices: SearchIndices;
  tokens: Token[];
};

export type LoadFromPersistenceFn = () => Promise<[SearchIndices | undefined, Token[] | undefined]>;
export type StoreToPersistenceFn = (tokenIndices: SearchIndices, tokens: Token[]) => Promise<void>;

export type TxgenParams<T> = {
  connection: web3.Connection;
  params: T;
};

export type Register = {
  authority: web3.PublicKey;
};

export type InitializeStorageTokenAccount = {
  userWallet: web3.PublicKey;
  mints: web3.PublicKey[];
  protocol?: string;
  pool?: string;
};

export type MeteoraCreatePositionAndDeposit = {
  position: web3.PublicKey;
  pool: web3.PublicKey;
  userWallet: web3.PublicKey;
  totalXAmount: BN;
  totalYAmount: BN;
  slippage?: number;
  binRange: BinRange;
  distribution: Distribution;
  skipInputTokenCheck: boolean;
};

export type MeteoraInitializeBinArrays = {
  pool: web3.PublicKey;
  userWallet: web3.PublicKey;
  minBinId: number;
  maxBinId: number;
};

export type MeteoraDeposit = {
  position: web3.PublicKey;
  userWallet: web3.PublicKey;
  totalXAmount: BN;
  totalYAmount: BN;
  distribution: Distribution;
  slippage?: number;
  skipInputTokenCheck: boolean;
  fastGeneration?: {
    pool: web3.PublicKey;
    upperBinId: number;
    lowerBinId: number;
  };
};

export type MeteoraWithdraw = {
  position: web3.PublicKey;
  userWallet: web3.PublicKey;
  amountBps: BN;
  shouldClaimAndClose: boolean;
  fastGeneration?: {
    pool: web3.PublicKey;
    binIdsToRemove: number[];
  };
};

export type MeteoraClaim = {
  userWallet: web3.PublicKey;
  position: web3.PublicKey;
  fastGeneration?: {
    pool: web3.PublicKey;
  };
};

export type MeteoraClaimAll = {
  userWallet: web3.PublicKey,
};

export type MeteoraClose = {
  userWallet: web3.PublicKey;
  position: web3.PublicKey;
};

export type MeteoraCompound = {
  userWallet: web3.PublicKey;
  position: web3.PublicKey;
};

export type MeteoraRebalance = {
  userWallet: web3.PublicKey;
  currentPosition: web3.PublicKey;
  newPosition: web3.PublicKey;
  binRange: BinRange;
  distribution: Distribution;
  useAta?: boolean;
};

export type MeteoraRebalance2 = {
  userWallet: web3.PublicKey;
  currentPosition: web3.PublicKey;
  newPosition: web3.PublicKey;
  relativeBinRange: BinRange;
  checkRange?: BinRange;
  distribution: Distribution;
  useAta?: boolean;
};

export type MeteoraLimitCloseAutomation = {
  userWallet: web3.PublicKey;
  position: web3.PublicKey;
  minBinId: number;
  maxBinId: number;
  useAta?: boolean;
};

export type OrcaOpenPosition = {
  userWallet: web3.PublicKey,
  positionMint: web3.PublicKey,
  whirlpool: web3.PublicKey,
  tickLowerIndex: number,
  tickUpperIndex: number,
}

export type OrcaClosePosition = {
  userWallet: web3.PublicKey,
  positionMint: web3.PublicKey,
}

export type OrcaDeposit = {
  userWallet: web3.PublicKey,
  positionMint: web3.PublicKey,
  totalXAmount: BN,
  totalYAmount: BN,
}

export type OrcaWithdraw = {
  userWallet: web3.PublicKey,
  positionMint: web3.PublicKey,
  liquidityAmount: BN,
}

export type OrcaClaimRewards = {
  userWallet: web3.PublicKey,
  positionMint: web3.PublicKey,
}

export const StrategyTypeMap: Record<Distribution, StrategyType> = {
  SPOT: StrategyType.SpotBalanced,
  CURVE: StrategyType.CurveBalanced,
  "BID-ASK": StrategyType.BidAskBalanced,
  "SPOT-IMBALANCED": StrategyType.SpotImBalanced,
  "CURVE-IMBALANCED": StrategyType.CurveImBalanced,
  "BID-ASK-IMBALANCED": StrategyType.BidAskImBalanced,
  "SPOT-ONE-SIDE": StrategyType.SpotOneSide,
  "CURVE-ONE-SIDE": StrategyType.CurveOneSide,
  "BID-ASK-ONE-SIDE": StrategyType.BidAskOneSide,
};

export interface TokenAccountData {
  mint: web3.PublicKey;
  owner: web3.PublicKey;
  amount: BN;
}

export interface MeteoraToHawksightParams {
  ixs: web3.TransactionInstruction[];
  userPda: web3.PublicKey;
  authority: web3.PublicKey;
}

export type MeteoraToHawksightFn = ({
  ixs,
  userPda,
  authority,
}: MeteoraToHawksightParams) => Promise<web3.TransactionInstruction[]>;

export type CreateAtaIdempotentParams = {
  accounts: {
    payer: web3.PublicKey;
    mint: web3.PublicKey;
    owner: web3.PublicKey;
  }[];
};

export type GetMintsFromInstructionParams = {
  instructions: web3.TransactionInstruction[];
  find: Record<
    string,
    {
      programId: string;
      mintIndices: number[];
    }
  >;
};

export type HawkApiOptions = {
  disableTokenLoad?: boolean,
  disableTxMetadataLoad?: boolean,
}

export type PriorityFeeEstimate = {
  priorityFeeEstimate: number;
  feeLevels: Record<string, number>;
};

export type InsertNonceAtOpt = {
  onlyEndOfTx?: boolean,
}

export type SignerPlugin = (transaction: web3.VersionedTransaction) => Promise<web3.VersionedTransaction>;
export type SignerPlugin2 = (transaction: web3.VersionedTransaction[]) => Promise<web3.VersionedTransaction[]>;
export type SendSignedTx = (signedTx: web3.VersionedTransaction, lastValidBlockHeight: number) => Promise<string>;
