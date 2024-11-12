export type IyfExtension = {
  "version": "0.1.0",
  "name": "iyf_extension",
  "instructions": [
    {
      "name": "swapOrca",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapPartialOrca",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountPctBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "franciumDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaPayer",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lending_pool_share_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FranciumUncheckedLendingRewardAccount",
                "path": "farming_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "user_pda_pool_share_token"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "francium_lending_reward_program"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "farmingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolStakeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolShareMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingRewardProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "franciumWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaPayer",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lending_pool_share_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FranciumUncheckedLendingRewardAccount",
                "path": "farming_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "user_pda_pool_share_token"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "francium_lending_reward_program"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "farmingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolStakeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolShareMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingRewardProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaOpenPosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "orcaClosePosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        }
      ]
    },
    {
      "name": "orcaClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "kaminoDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userLpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "scopePrices",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenInfos",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "kaminoProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "kaminoWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userLpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "scopePrices",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenInfos",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "kaminoProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "kaminoClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "fraktCompound",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaLamport",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "liquidityPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deposit",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "deposit"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_lamport"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "frakt_program"
            }
          }
        },
        {
          "name": "liqOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fraktProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompound",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompoundFees",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "swapAmount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "orcaCompoundFeesOnchain",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaCompoundReward",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "whirlpoolUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardOwner",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "reward_owner.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultAUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultBUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleUsdc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool_usdc"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "whirlpoolPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultAPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultBPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oraclePos",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool_pos"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "orcaRebalance",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintSrc",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionSrc",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountSrc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "positionMintDst",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        },
        {
          "name": "swapAmount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "orcaRebalanceOnchain",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintSrc",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionSrc",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountSrc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "positionMintDst",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        },
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaSweepDust",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintDst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaAutoOpenPosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "orcaAutoClosePosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        }
      ]
    },
    {
      "name": "orcaAutoClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "saberCompound1",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintWrapper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "MintWrapperMinter"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "mint_wrapper"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Rewarder",
                "path": "rewarder"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "mint_wrapper_program"
            }
          }
        },
        {
          "name": "rewardsTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaSbrIouToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimFeeTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "miner",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "Miner"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "quarry_mine_program"
            }
          }
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redeemer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaSbrToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintProxyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proxyMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minterInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaSbrVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaUsdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userpdaUsdcToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintWrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberRedeemerProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberMintProxyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "saberCompoundUsdc2",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputAReserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputBReserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "otherUserToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaUsdcToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "saberSwapAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swapAmmId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberPoolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "miner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "Miner"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "quarry_mine_program"
            }
          }
        },
        {
          "name": "minerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrapperMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrapperUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmInitializePositionAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmClaimFee",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimReward",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "meteoraDlmmClaimFeeAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimRewardAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "meteoraDlmmDepositAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmOneSideDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmWithdrawAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmClosePositionAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmLimitCloseAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        },
        {
          "name": "minBinId",
          "type": "i32"
        },
        {
          "name": "maxBinId",
          "type": "i32"
        }
      ]
    },
    {
      "name": "moveToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "destination_token.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "storage-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "source_token.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "types": [
    {
      "name": "FarmAccountMulti",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discriminator",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stableMint",
            "type": "publicKey"
          },
          {
            "name": "assetCount",
            "type": "u8"
          },
          {
            "name": "totalWeight",
            "type": "u128"
          },
          {
            "name": "assetInfos",
            "type": {
              "vec": {
                "defined": "FarmAssetInfo"
              }
            }
          },
          {
            "name": "rewardInfos",
            "type": {
              "vec": {
                "defined": "FarmRewardInfo"
              }
            }
          },
          {
            "name": "userCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "FarmAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weight",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "FarmRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenPerSecond",
            "type": "u128"
          },
          {
            "name": "accRewardPerShare",
            "type": "u128"
          },
          {
            "name": "lastRewardTime",
            "type": "i64"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LendingPoolInfo",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "UserAccountMulti",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farm",
            "type": "publicKey"
          },
          {
            "name": "txLength",
            "type": "u8"
          },
          {
            "name": "slot",
            "type": "u64"
          },
          {
            "name": "atomicityHash",
            "type": {
              "array": [
                "publicKey",
                10
              ]
            }
          },
          {
            "name": "assetInfo",
            "type": {
              "defined": "UserAssetInfo"
            }
          },
          {
            "name": "padding",
            "type": {
              "defined": "UserAccountMultiPadding"
            }
          }
        ]
      }
    },
    {
      "name": "UserAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lastAmount",
            "type": "u64"
          },
          {
            "name": "lastAction",
            "type": "u8"
          },
          {
            "name": "rewardAmount",
            "type": "u128"
          },
          {
            "name": "rewardDebt",
            "type": "u128"
          },
          {
            "name": "lastStakeTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Action",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FundAction"
          },
          {
            "name": "SwapAction"
          },
          {
            "name": "SupplyAction"
          },
          {
            "name": "StakeAction"
          },
          {
            "name": "UnstakeAction"
          },
          {
            "name": "UnsupplyActionOneSide"
          },
          {
            "name": "UnsupplyAction"
          },
          {
            "name": "HarvestAction"
          },
          {
            "name": "FinishAction"
          },
          {
            "name": "SwapFromAction"
          },
          {
            "name": "SwapStableAction"
          },
          {
            "name": "SwapFromStableAction"
          },
          {
            "name": "WithdrawAction"
          },
          {
            "name": "FundLamportAction"
          },
          {
            "name": "MarinadeWithdrawAction"
          },
          {
            "name": "PortWithdrawAction"
          },
          {
            "name": "FraktWithdrawAction"
          },
          {
            "name": "FranciumWithdrawAction"
          }
        ]
      }
    },
    {
      "name": "Swap",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "StableToStable"
          },
          {
            "name": "StableToAsset"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidIndexFarmAddress",
      "msg": "Invalid Index Farm address"
    },
    {
      "code": 6001,
      "name": "InvalidUserPdaAccount",
      "msg": "Invalid User PDA Account"
    },
    {
      "code": 6002,
      "name": "InvalidAuthorityAccount",
      "msg": "Invalid authority account"
    },
    {
      "code": 6003,
      "name": "InvalidOperationOrder",
      "msg": "Invalid operation order"
    },
    {
      "code": 6004,
      "name": "UserPdaMustBeSigner",
      "msg": "User PDA must be a signer"
    },
    {
      "code": 6005,
      "name": "UserPdaPayerMustBeSigner",
      "msg": "User PDA payer must be a signer"
    },
    {
      "code": 6006,
      "name": "InvalidTokenOwner",
      "msg": "Invalid token owner"
    },
    {
      "code": 6007,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6008,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6009,
      "name": "AccountCannotBeSame",
      "msg": "Account cannot be same"
    },
    {
      "code": 6010,
      "name": "MissingAccounts",
      "msg": "Missing accounts"
    },
    {
      "code": 6011,
      "name": "InvalidProgramOwner",
      "msg": "Invalid program owner"
    },
    {
      "code": 6012,
      "name": "OrcaLowerTickIsHigherThanHigherTick",
      "msg": "Orca lower tick account cannot be higher than higher tick"
    },
    {
      "code": 6013,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6014,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6015,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6016,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6017,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6018,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6019,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6020,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6021,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6022,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6023,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6024,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6025,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6026,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6027,
      "name": "AmountPercentageOutOfRange",
      "msg": "Amount percentage must be within 1 to 100 only"
    },
    {
      "code": 6028,
      "name": "ProgramError",
      "msg": "Generic program error."
    },
    {
      "code": 6029,
      "name": "FarmMustBeUserPdaFarm",
      "msg": ""
    },
    {
      "code": 6030,
      "name": "ShouldUseDefaultFarm",
      "msg": "Farm must be 7jLQhREMxXjKdpwVuN6gwsWt3BNfAg9WqbepffPbi4ww"
    },
    {
      "code": 6031,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6032,
      "name": "MinBinCannotExceedMaxBin",
      "msg": "Min bin cannot exceed max bin"
    },
    {
      "code": 6033,
      "name": "ActiveBinOutsideSpecified",
      "msg": "Active bin is outside specified min and max bin areas."
    },
    {
      "code": 6034,
      "name": "MeteoraLbPairDiscriminatorDoNotMatch",
      "msg": "Meteora LbPair discriminator do not match."
    }
  ]
};

export const IDL: IyfExtension = {
  "version": "0.1.0",
  "name": "iyf_extension",
  "instructions": [
    {
      "name": "swapOrca",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapPartialOrca",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountPctBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "franciumDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaPayer",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lending_pool_share_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FranciumUncheckedLendingRewardAccount",
                "path": "farming_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "user_pda_pool_share_token"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "francium_lending_reward_program"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "farmingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolStakeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolShareMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingRewardProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "franciumWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaPayer",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "deposit_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lending_pool_share_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_payer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FranciumUncheckedLendingRewardAccount",
                "path": "farming_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "user_pda_pool_share_token"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "francium_lending_reward_program"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "farming_pool_rewards_token_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "farmingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolStakeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolShareMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "franciumLendingRewardProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaOpenPosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "orcaClosePosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        }
      ]
    },
    {
      "name": "orcaClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_b.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "kaminoDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userLpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "scopePrices",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenInfos",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "kaminoProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "kaminoWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_a"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "source_mint_b"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destTokenAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userLpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeTokenBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "scopePrices",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenInfos",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "kaminoProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "kaminoClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "fraktCompound",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaLamport",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-pda-lamport"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "liquidityPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deposit",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "deposit"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_pda_lamport"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "frakt_program"
            }
          }
        },
        {
          "name": "liqOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fraktProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompound",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompoundFees",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "swapAmount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "orcaCompoundFeesOnchain",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaCompoundReward",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "token_vault_a.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "whirlpoolUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardOwner",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "reward_owner.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultAUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultBUsdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2Usdc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleUsdc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool_usdc"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "whirlpoolPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultAPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultBPos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2Pos",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oraclePos",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool_pos"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "orcaRebalance",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintSrc",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionSrc",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountSrc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "positionMintDst",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Whirlpool",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        },
        {
          "name": "swapAmount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "orcaRebalanceOnchain",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintSrc",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionSrc",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperSrc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountSrc",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_src"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "positionMintDst",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        },
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaSweepDust",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMintDst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionDst",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpperDst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccountDst",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint_dst"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "oracle"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "WhirlpoolStruct",
                "path": "whirlpool"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "slippage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaAutoOpenPosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "orcaAutoClosePosition",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        }
      ]
    },
    {
      "name": "orcaAutoClaimRewards",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rebalanceAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "position"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "orca_whirlpool_program"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "position_mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "saberCompound1",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintWrapper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "MintWrapperMinter"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "mint_wrapper"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Rewarder",
                "path": "rewarder"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "mint_wrapper_program"
            }
          }
        },
        {
          "name": "rewardsTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaSbrIouToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimFeeTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "miner",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "Miner"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "quarry_mine_program"
            }
          }
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redeemer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaSbrToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintProxyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proxyMintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minterInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaSbrVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orcaUsdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userpdaUsdcToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintWrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberRedeemerProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberMintProxyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "saberCompoundUsdc2",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputAReserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputBReserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "otherUserToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaUsdcToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "saberSwapAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swapAmmId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberPoolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userpdaLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "miner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "Miner"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "quarry_mine_program"
            }
          }
        },
        {
          "name": "minerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrapperMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrapperUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmInitializePositionAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmClaimFee",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimReward",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "meteoraDlmmClaimFeeAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimRewardAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "meteoraDlmmDepositAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmOneSideDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmWithdrawAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "meteoraDlmmClosePositionAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmLimitCloseAutomation",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenXMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenXProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenYProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "binArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraDlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerFeeX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeY",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "bytes"
        },
        {
          "name": "minBinId",
          "type": "i32"
        },
        {
          "name": "maxBinId",
          "type": "i32"
        }
      ]
    },
    {
      "name": "moveToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPda",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "multi-user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "authority"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hawksightAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "token_program"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "destination_token.mint"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "associated_token_program"
            }
          }
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "storage-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "TokenAccount",
                "path": "source_token.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "iyf_program"
            }
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "types": [
    {
      "name": "FarmAccountMulti",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discriminator",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stableMint",
            "type": "publicKey"
          },
          {
            "name": "assetCount",
            "type": "u8"
          },
          {
            "name": "totalWeight",
            "type": "u128"
          },
          {
            "name": "assetInfos",
            "type": {
              "vec": {
                "defined": "FarmAssetInfo"
              }
            }
          },
          {
            "name": "rewardInfos",
            "type": {
              "vec": {
                "defined": "FarmRewardInfo"
              }
            }
          },
          {
            "name": "userCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "FarmAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weight",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "FarmRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenPerSecond",
            "type": "u128"
          },
          {
            "name": "accRewardPerShare",
            "type": "u128"
          },
          {
            "name": "lastRewardTime",
            "type": "i64"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LendingPoolInfo",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "UserAccountMulti",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farm",
            "type": "publicKey"
          },
          {
            "name": "txLength",
            "type": "u8"
          },
          {
            "name": "slot",
            "type": "u64"
          },
          {
            "name": "atomicityHash",
            "type": {
              "array": [
                "publicKey",
                10
              ]
            }
          },
          {
            "name": "assetInfo",
            "type": {
              "defined": "UserAssetInfo"
            }
          },
          {
            "name": "padding",
            "type": {
              "defined": "UserAccountMultiPadding"
            }
          }
        ]
      }
    },
    {
      "name": "UserAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lastAmount",
            "type": "u64"
          },
          {
            "name": "lastAction",
            "type": "u8"
          },
          {
            "name": "rewardAmount",
            "type": "u128"
          },
          {
            "name": "rewardDebt",
            "type": "u128"
          },
          {
            "name": "lastStakeTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Action",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FundAction"
          },
          {
            "name": "SwapAction"
          },
          {
            "name": "SupplyAction"
          },
          {
            "name": "StakeAction"
          },
          {
            "name": "UnstakeAction"
          },
          {
            "name": "UnsupplyActionOneSide"
          },
          {
            "name": "UnsupplyAction"
          },
          {
            "name": "HarvestAction"
          },
          {
            "name": "FinishAction"
          },
          {
            "name": "SwapFromAction"
          },
          {
            "name": "SwapStableAction"
          },
          {
            "name": "SwapFromStableAction"
          },
          {
            "name": "WithdrawAction"
          },
          {
            "name": "FundLamportAction"
          },
          {
            "name": "MarinadeWithdrawAction"
          },
          {
            "name": "PortWithdrawAction"
          },
          {
            "name": "FraktWithdrawAction"
          },
          {
            "name": "FranciumWithdrawAction"
          }
        ]
      }
    },
    {
      "name": "Swap",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "StableToStable"
          },
          {
            "name": "StableToAsset"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidIndexFarmAddress",
      "msg": "Invalid Index Farm address"
    },
    {
      "code": 6001,
      "name": "InvalidUserPdaAccount",
      "msg": "Invalid User PDA Account"
    },
    {
      "code": 6002,
      "name": "InvalidAuthorityAccount",
      "msg": "Invalid authority account"
    },
    {
      "code": 6003,
      "name": "InvalidOperationOrder",
      "msg": "Invalid operation order"
    },
    {
      "code": 6004,
      "name": "UserPdaMustBeSigner",
      "msg": "User PDA must be a signer"
    },
    {
      "code": 6005,
      "name": "UserPdaPayerMustBeSigner",
      "msg": "User PDA payer must be a signer"
    },
    {
      "code": 6006,
      "name": "InvalidTokenOwner",
      "msg": "Invalid token owner"
    },
    {
      "code": 6007,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6008,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6009,
      "name": "AccountCannotBeSame",
      "msg": "Account cannot be same"
    },
    {
      "code": 6010,
      "name": "MissingAccounts",
      "msg": "Missing accounts"
    },
    {
      "code": 6011,
      "name": "InvalidProgramOwner",
      "msg": "Invalid program owner"
    },
    {
      "code": 6012,
      "name": "OrcaLowerTickIsHigherThanHigherTick",
      "msg": "Orca lower tick account cannot be higher than higher tick"
    },
    {
      "code": 6013,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6014,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6015,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6016,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6017,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6018,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6019,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6020,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6021,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6022,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6023,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6024,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6025,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6026,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6027,
      "name": "AmountPercentageOutOfRange",
      "msg": "Amount percentage must be within 1 to 100 only"
    },
    {
      "code": 6028,
      "name": "ProgramError",
      "msg": "Generic program error."
    },
    {
      "code": 6029,
      "name": "FarmMustBeUserPdaFarm",
      "msg": ""
    },
    {
      "code": 6030,
      "name": "ShouldUseDefaultFarm",
      "msg": "Farm must be 7jLQhREMxXjKdpwVuN6gwsWt3BNfAg9WqbepffPbi4ww"
    },
    {
      "code": 6031,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6032,
      "name": "MinBinCannotExceedMaxBin",
      "msg": "Min bin cannot exceed max bin"
    },
    {
      "code": 6033,
      "name": "ActiveBinOutsideSpecified",
      "msg": "Active bin is outside specified min and max bin areas."
    },
    {
      "code": 6034,
      "name": "MeteoraLbPairDiscriminatorDoNotMatch",
      "msg": "Meteora LbPair discriminator do not match."
    }
  ]
};
