import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import { Transaction as TransactionClass } from "./classes/Transaction";

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

export type Distribution = "SPOT" | "CURVE" | "BID-ASK";

export type MeteoraCreatePositionAndDeposit = {
  position: web3.PublicKey,
  pool: string,
  userWallet: web3.PublicKey,
  totalXAmount: BN,
  totalYAmount: BN,
  binRange: BinRange,
  distribution: Distribution,
};

export type MeteoraDeposit = {
  position: web3.PublicKey,
  pool: string,
  userWallet: web3.PublicKey,
  totalXAmount: BN,
  totalYAmount: BN,
  distribution: Distribution,
};

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
  Stable = "stable",
  Volatile = "volatile",
  LiquidStaking = "liquid_staking",
  Stablecoin = "stablecoins",
  Deprecated = "deprecated",
}

export enum Protocol {
  Saber = "saber",
  Orca = "orca",
  Meteora = "meteora",
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
  name: string,
  mint_x: string,
  mint_y: string,
  reserve_x: string,
  reserve_y: string,
  reward_mint_x: string,
  reward_mint_y: string,
  bin_step: number,
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
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

export type PoolOut = UserPositionBalances & {
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

export type TransactionMetadataResponse = {
  description: string;
  estimatedFeeInSOL: string,
  addressLookupTableAddresses: string[]; // "alts" is confusing, copied jup's naming
  computeBudgetInstructions: Instruction[]; // this enables for ease of access while also making them optional
  mainInstructions: Instruction[];
}

export type TransactionMetadata = {
  description: string,
  estimatedFeeInSOL: string,
  transaction: TransactionClass,
}

export type SimulatedTransactionResponse = {
  err: web3.TransactionError | string | null,
  logs: Array<string> | null,
  accounts?: (web3.SimulatedTransactionAccountInfo | null)[] | null,
  unitsConsumed: number,
  returnData?: web3.TransactionReturnData | null,
};