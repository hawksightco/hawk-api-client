import * as web3 from "@solana/web3.js";
import * as _client from "@hawksightco/swagger-client";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse, TransactionPriority, Distribution } from "../types";
import { Client } from "./Client";
import { createTxMetadata, resultOrError } from "../functions";
import { GeneralUtility } from "./GeneralUtility";
import { Anchor } from "../anchor";
import { txgen } from "./Transactions";
import { BN } from "bn.js";

/**
 * The `TxGenerator` class encapsulates methods to generate transactions with various trading operations
 * on decentralized market making platforms like Meteora and Orca within the Solana ecosystem. It allows
 * setting custom transaction priority and fees to manage transaction processing speed and cost.
 */
export class TxGenerator {

  /**
   * Initializes a new instance of the TxGenerator class with a specified client.
   *
   * @param client An instance of Client used to interact with various APIs for transaction generation.
   */
  constructor(
    private readonly client: Client,
    protected readonly generalUtility: GeneralUtility,
  ) { }

  /**
   * Creates meteora instruction that creates new position and deposit.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async meteoraCreatePositionAndDeposit(connection: web3.Connection, payer: string, params: _client.TxCreatePositionAndDepositBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.meteoraCreatePositionAndDeposit({
        connection,
        params: {
          position: new web3.PublicKey(params.position!),
          pool: new web3.PublicKey(params.pool!),
          userWallet: new web3.PublicKey(params.userWallet!),
          totalXAmount: new BN(params.totalXAmount!),
          totalYAmount: new BN(params.totalYAmount!),
          binRange: {
            lowerRange: params.lowerBinRange!,
            upperRange: params.upperBinRange!,
          },
          slippage: params.slippage,
          distribution: params.distribution! as Distribution,
          skipInputTokenCheck: true,
        },
      });
      return {
        status: 200,
        data: await createTxMetadata(this.generalUtility, connection, payer, result),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates meteora instruction that deposits to position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async meteoraDeposit(connection: web3.Connection, payer: string, params: _client.TxDepositBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.meteoraDeposit({
        connection,
        params: {
          position: new web3.PublicKey(params.position!),
          userWallet: new web3.PublicKey(params.userWallet!),
          totalXAmount: new BN(params.totalXAmount!),
          totalYAmount: new BN(params.totalYAmount!),
          distribution: params.distribution! as Distribution,
          slippage: params.slippage,
          skipInputTokenCheck: params.skipInputTokenCheck!,
          fastGeneration: params.fastGeneration
            ? {
                ...params.fastGeneration,
                pool: new web3.PublicKey(params.fastGeneration.pool),
              }
            : undefined,
        },
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates meteora instruction withdraws from a position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async meteoraWithdraw(connection: web3.Connection, payer: string, params: _client.TxWithdrawBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.meteoraWithdraw({
        connection,
        params: {
          position: new web3.PublicKey(params.position!),
          userWallet: new web3.PublicKey(params.userWallet!),
          amountBps: new BN(params.amountBps!),
          shouldClaimAndClose: params.shouldClaimAndClose!,
          fastGeneration: params.fastGeneration
            ? {
                pool: new web3.PublicKey(params.fastGeneration.pool!),
                binIdsToRemove: params.fastGeneration.binIdsToRemove!,
              }
            : undefined,
        },
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates meteora instruction that claims fees and rewards.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async meteoraClaim(connection: web3.Connection, payer: string, params: _client.TxClaimBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const startTime = new Date().getTime() / 1000;
      const result = await txgen.meteoraClaim({
        connection,
        params: {
          position: new web3.PublicKey(params.position!),
          userWallet: new web3.PublicKey(params.userWallet!),
          fastGeneration: params.fastGeneration
            ? {
                pool: new web3.PublicKey(params.fastGeneration.pool!),
              }
            : undefined,
        },
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates meteora instruction that closes position.
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async meteoraClosePosition(connection: web3.Connection, payer: string, params: _client.TxClosePositionBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const startTime = new Date().getTime() / 1000;
      const result = await txgen.meteoraClosePosition({
        connection,
        params: {
          position: new web3.PublicKey(params.position!),
          userWallet: new web3.PublicKey(params.userWallet!),
        },
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates meteora instruction that initializes bin arrays
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
    async meteoraInitializeBinArrays(connection: web3.Connection, payer: string, params: _client.TxInitializeBinArraysBody): Promise<ResponseWithStatus<TransactionMetadata>> {
      // Initialize anchor
      Anchor.initialize(connection);
      try {
        const result = await txgen.meteoraInitializeBinArrays({
          connection,
          params: {
            pool: new web3.PublicKey(params.pool!),
            userWallet: new web3.PublicKey(params.userWallet!),
            minBinId: params.minBinId as number,
            maxBinId: params.maxBinId as number,
          },
        });
        return {
          status: 200,
          data: await createTxMetadata(
            this.generalUtility,
            connection,
            payer,
            result
          ),
        };
      } catch (e) {
        return {
          status: 400,
          data: {
            code: "custom",
            message: e,
            path: [],
          } as any,
        };
      }
    }

  /**
   * Creates orca instruction that opens new position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async orcaOpenPosition(connection: web3.Connection, payer: string, params: _client.TxOpenPositionBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.orcaOpenPosition({
        connection,
        params: {
          userWallet: new web3.PublicKey(params.userWallet!),
          positionMint: new web3.PublicKey(params.positionMint!),
          whirlpool: new web3.PublicKey(params.whirlpool!),
          tickLowerIndex: parseInt(params.tickLowerIndex!),
          tickUpperIndex: parseInt(params.tickUpperIndex!),
        }
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result,
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates orca instruction that closes position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async orcaClosePosition(connection: web3.Connection, payer: string, params: _client.TxClosePositionBody1): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.orcaClosePosition({
        connection,
        params: {
          userWallet: new web3.PublicKey(params.userWallet!),
          positionMint: new web3.PublicKey(params.positionMint!),
        }
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result,
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates orca instruction that deposits to a position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async orcaDeposit(connection: web3.Connection, payer: string, params: _client.TxDepositBody1): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.orcaDeposit({
        connection,
        params: {
          userWallet: new web3.PublicKey(params.userWallet!),
          positionMint: new web3.PublicKey(params.positionMint!),
          totalXAmount: new BN(params.totalXAmount!),
          totalYAmount: new BN(params.totalYAmount!),
        }
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result,
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates orca instruction that withdraws from a position
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async orcaWithdraw(connection: web3.Connection, payer: string, params: _client.TxWithdrawBody1): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.orcaWithdraw({
        connection,
        params: {
          userWallet: new web3.PublicKey(params.userWallet!),
          positionMint: new web3.PublicKey(params.positionMint!),
          liquidityAmount: new BN(params.liquidityAmount!),
        }
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result,
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }

  /**
   * Creates orca instruction that claims fees and rewards
   *
   * @param connection The Solana web3 connection object for blockchain interactions.
   * @param payer The public key of the payer for transaction fees.
   * @param params Parameters required
   * @returns A ResponseWithStatus containing either TransactionMetadataResponse or TransactionMetadata.
   */
  async orcaClaimRewards(connection: web3.Connection, payer: string, params: _client.TxClaimRewardsBody): Promise<ResponseWithStatus<TransactionMetadata>> {
    // Initialize anchor
    Anchor.initialize(connection);
    try {
      const result = await txgen.orcaClaimRewards({
        connection,
        params: {
          userWallet: new web3.PublicKey(params.userWallet!),
          positionMint: new web3.PublicKey(params.positionMint!),
        }
      });
      return {
        status: 200,
        data: await createTxMetadata(
          this.generalUtility,
          connection,
          payer,
          result,
        ),
      };
    } catch (e) {
      return {
        status: 400,
        data: {
          code: "custom",
          message: e,
          path: [],
        } as any,
      };
    }
  }
}
