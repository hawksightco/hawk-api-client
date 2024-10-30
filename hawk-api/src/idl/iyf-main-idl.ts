export type IndexYieldFarming = {
  "version": "0.1.0",
  "name": "index_yield_farming",
  "instructions": [
    {
      "name": "createState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "fundRewardToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
    },
    {
      "name": "createMultiIndexFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
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
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "weights",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "changeMultiIndexFarmRate",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenPerSeconds",
          "type": {
            "vec": "u128"
          }
        }
      ]
    },
    {
      "name": "createSaberFarmStrategy",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "srcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createMultiIndexFarmUser",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "stableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stableToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint2"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "stableTokenBump",
          "type": "u8"
        },
        {
          "name": "stableToken2Bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserMiner",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "miner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
          "name": "minerBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "srcToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "src_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "srcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "dst_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "dstMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "lpMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "reward_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "srcTokenBump",
          "type": "u8"
        },
        {
          "name": "dstTokenBump",
          "type": "u8"
        },
        {
          "name": "lpTokenBump",
          "type": "u8"
        },
        {
          "name": "rewardTokenBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "supplyStableToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm.stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "ownerStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorStableToken",
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
      "name": "redeemStableToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm.stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "ownerStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorStableToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapStableToAsset",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaSrcToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        },
        {
          "name": "swapType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "swapStableFromAsset",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaSrcToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        },
        {
          "name": "swapType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "supplyLiquidity",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
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
        },
        {
          "name": "saberSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "reserveA",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveB",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userToken",
          "accounts": [
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpToken",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unsupplyLiquidity",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
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
        },
        {
          "name": "saberSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "reserveA",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveB",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userToken",
          "accounts": [
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpToken",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeToFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaLpToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeFromFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaLpToken",
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
      "name": "harvestFromFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redeemerProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintProxyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redeemer",
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
          "name": "mintWrapper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintWrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimFeeTokenAccount",
          "isMut": true,
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
      "name": "withdrawReward",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "extraRewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userExtraVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newUser",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "stableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stableToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint2"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
      "name": "newStrategy",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "newStrategyUser",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "swapOrca",
      "accounts": [
        {
          "name": "orcaSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_wallet"
              }
            ]
          }
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapSource",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        },
        {
          "name": "minimumAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swapPartialOrca",
      "accounts": [
        {
          "name": "orcaSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_wallet"
              }
            ]
          }
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapSource",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minimumAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "saberSupplyLiquidity",
      "accounts": [
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "accounts": [
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swapAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "userAuthority",
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
                    "path": "user_wallet"
                  }
                ]
              }
            },
            {
              "name": "userWallet",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "farm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swap",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "inputA",
          "accounts": [
            {
              "name": "user",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserve",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "inputB",
          "accounts": [
            {
              "name": "user",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserve",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputLp",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "saberUnsupplyLiquidity",
      "accounts": [
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "accounts": [
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swapAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "userAuthority",
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
                    "path": "user_wallet"
                  }
                ]
              }
            },
            {
              "name": "userWallet",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "farm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swap",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteReserves",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "output",
          "accounts": [
            {
              "name": "userToken",
              "accounts": [
                {
                  "name": "user",
                  "isMut": true,
                  "isSigner": false
                },
                {
                  "name": "reserve",
                  "isMut": true,
                  "isSigner": false
                }
              ]
            },
            {
              "name": "fees",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "ownerFee",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "wrapUsdcToUsdc9",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
          "name": "userUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unwrapUsdc9ToUsdc",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
          "name": "userUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "wrapSolToWsol",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
            ]
          }
        },
        {
          "name": "userWrappedSol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "unwrapWsolToSol",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
            ]
          }
        },
        {
          "name": "userWrappedSol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "claimRewards",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "marinadeDeposit",
      "accounts": [
        {
          "name": "common",
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
                    "path": "payer"
                  }
                ]
              }
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "state",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "msolMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolSolLegPda",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolMsolLeg",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "marinadeProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "rent",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferFrom",
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
                "type": {
                  "defined": "Box<Account<'info,UserAccountMulti>>"
                },
                "account": "MarinadeDepositWithdraw",
                "path": "common.user_pda"
              }
            ]
          }
        },
        {
          "name": "mintTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "marinadeWithdraw",
      "accounts": [
        {
          "name": "common",
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
                    "path": "payer"
                  }
                ]
              }
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "state",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "msolMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolSolLegPda",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolMsolLeg",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "marinadeProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "rent",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "treasuryMsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "getMsolFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferSolTo",
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
                "type": {
                  "defined": "Box<Account<'info,UserAccountMulti>>"
                },
                "account": "MarinadeDepositWithdraw",
                "path": "common.user_pda"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "msolAmount",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "solendDeposit",
      "accounts": [
        {
          "name": "transferAuthority",
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
                "account": "UserAccountMulti",
                "path": "transfer_authority.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority.authority"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "lending_market"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "solend_program"
            }
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solendProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
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
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "solendWithdraw",
      "accounts": [
        {
          "name": "transferAuthority",
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
                "account": "UserAccountMulti",
                "path": "transfer_authority.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority.authority"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "lending_market"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "solend_program"
            }
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solendProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
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
          "name": "assetIndex",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "portInitObligation",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
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
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portInitStakeAccount",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferAuthority",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portWithdraw",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "portDepositWithOracle",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferAuthority",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portWithdrawWithOracle",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "portClaimRewards",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingProgramAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "fraktDeposit",
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
        },
        {
          "name": "liquidityPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liqOwner",
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
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
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
        }
      ],
      "args": []
    },
    {
      "name": "fraktWithdraw",
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
            ]
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
      "name": "fraktHarvest",
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
            ]
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
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositTokenToUserPda",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
    },
    {
      "name": "withdrawTokenFromUserPda",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositLamportsToPda",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
                "path": "payer"
              }
            ]
          }
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
            ]
          }
        },
        {
          "name": "ownerFeeAccount",
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
      "name": "withdrawLamportsFromPda",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
                "path": "payer"
              }
            ]
          }
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
            ]
          }
        },
        {
          "name": "ownerFeeAccount",
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
        }
      ],
      "args": []
    },
    {
      "name": "tulipDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tulipProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "tulipWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
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
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tulipProgram",
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
      "name": "iyfExtensionExecute",
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
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfExtensionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "resetLastAction",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
      "name": "storeToken",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passthroughTokenAccount",
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
                "path": "mint"
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
          "name": "storageTokenAccount",
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
                "path": "passthrough_token_account.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "unstoreToken",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passthroughTokenAccount",
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
                "path": "mint"
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
          "name": "storageTokenAccount",
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
                "path": "passthrough_token_account.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "jupiterDynamicCpi",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jupiterProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "depositMultipleToken",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "hsFeeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "amounts",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "withdrawMultipleToken",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "hsFeeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDynamicCpi",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "meteoraProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "initializeStorageTokenAccount",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "storageTokenAccount",
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
                "account": "Mint",
                "path": "mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setTransactionSlot",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "verifyTransactionSlot",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "jupiterRouteIx",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "userSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userDestinationTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "jupiterProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "routePlan",
          "type": "bytes"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stateAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "rewardMint",
            "type": "publicKey"
          },
          {
            "name": "rewardVault",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "saberFarmStrategy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "srcMint",
            "type": "publicKey"
          },
          {
            "name": "dstMint",
            "type": "publicKey"
          },
          {
            "name": "lpMint",
            "type": "publicKey"
          },
          {
            "name": "rewardMint",
            "type": "publicKey"
          },
          {
            "name": "splSwap",
            "type": "publicKey"
          },
          {
            "name": "saberSwap",
            "type": "publicKey"
          },
          {
            "name": "quarry",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "farmAccountMulti",
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
      "name": "userAccountMulti",
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
              "array": [
                "u8",
                285
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
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
            "name": "OrcaWithdrawAction"
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
  "events": [
    {
      "name": "StateCreated",
      "fields": []
    },
    {
      "name": "RewardFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "StableTokenFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "StableTokenRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TokenToUserPdaFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TokenFromUserPdaRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LamportToUserPdaFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LamportFromUserPdaRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "MultiFarmCreated",
      "fields": [
        {
          "name": "assetCount",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "SaberFarmCreated",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawnRewards",
      "fields": [
        {
          "name": "ownerFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "newAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "AmountHarvested",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAssetWeight",
      "msg": "Invalid Asset Weights in FundState"
    },
    {
      "code": 6001,
      "name": "InvalidIndexFarmAddress",
      "msg": "Invalid Index Farm address"
    },
    {
      "code": 6002,
      "name": "AssetNotFound",
      "msg": "Asset not found"
    },
    {
      "code": 6003,
      "name": "InvalidAssetCount",
      "msg": "Invalid Asset count"
    },
    {
      "code": 6004,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6005,
      "name": "InvalidOperationOrder",
      "msg": "Invalid operation order"
    },
    {
      "code": 6006,
      "name": "InvalidFundAmount",
      "msg": "Invalid fund amount"
    },
    {
      "code": 6007,
      "name": "InvalidSwapAmount",
      "msg": "Invalid swap amount"
    },
    {
      "code": 6008,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6009,
      "name": "IntegerUnderflow",
      "msg": "Integer underflow"
    },
    {
      "code": 6010,
      "name": "WrongTokenAccountOwner",
      "msg": "Wrong token account owner"
    },
    {
      "code": 6011,
      "name": "IncorrectSwap",
      "msg": "Incorrect swap used"
    },
    {
      "code": 6012,
      "name": "IncorrectSwapProgram",
      "msg": "Incorrect swap program"
    },
    {
      "code": 6013,
      "name": "InvalidSwapType",
      "msg": "Swap type not found"
    },
    {
      "code": 6014,
      "name": "InvalidStableTokenAccount",
      "msg": "Invalid stable token account"
    },
    {
      "code": 6015,
      "name": "InvalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6016,
      "name": "InvalidStrategy",
      "msg": "Invalid strategy"
    },
    {
      "code": 6017,
      "name": "NotYetImplemented",
      "msg": "Not yet implemented"
    },
    {
      "code": 6018,
      "name": "AmountPercentageOutOfRange",
      "msg": "Amount percentage must be within 1 to 100 only"
    },
    {
      "code": 6019,
      "name": "ZeroTradingTokens",
      "msg": "Given pool token amount results in zero trading tokens"
    },
    {
      "code": 6020,
      "name": "ShouldUseDefaultFarm",
      "msg": "Farm must be 7jLQhREMxXjKdpwVuN6gwsWt3BNfAg9WqbepffPbi4ww"
    },
    {
      "code": 6021,
      "name": "InvalidNumOfRemainingAccounts",
      "msg": "Invalid number of remaining accounts length"
    },
    {
      "code": 6022,
      "name": "InvalidNumOfAmountsInDepositMultiple",
      "msg": "Invalid number of amounts in deposit"
    },
    {
      "code": 6023,
      "name": "HsFeeOwnerMustBeHawksight",
      "msg": "hs_fee_owner must be hawksight (4K3a2ucXiGvuMJMPNneRDyzmNp6i4RdzXJmBdWwGwPEh)"
    },
    {
      "code": 6024,
      "name": "InvalidPdaOwner",
      "msg": "Invalid PDA Owner"
    },
    {
      "code": 6025,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6026,
      "name": "TokenOwnerMismatch",
      "msg": "Token owner mismatch"
    },
    {
      "code": 6027,
      "name": "NotMintAccount",
      "msg": "Cannot deserialize mint account (possibly not a mint account)"
    },
    {
      "code": 6028,
      "name": "NotTokenAccount",
      "msg": "Cannot deserialize token account (possibly not a token account)"
    },
    {
      "code": 6029,
      "name": "MustBeHawksightAuthority",
      "msg": "Must be hawksight authority"
    },
    {
      "code": 6030,
      "name": "InstructionDiscriminatorNotExpected",
      "msg": "Instruction discriminator is not the expected one"
    }
  ]
};

export const IDL: IndexYieldFarming = {
  "version": "0.1.0",
  "name": "index_yield_farming",
  "instructions": [
    {
      "name": "createState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "fundRewardToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
    },
    {
      "name": "createMultiIndexFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
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
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "weights",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "changeMultiIndexFarmRate",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenPerSeconds",
          "type": {
            "vec": "u128"
          }
        }
      ]
    },
    {
      "name": "createSaberFarmStrategy",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Quarry",
                "path": "quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "srcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberSwap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createMultiIndexFarmUser",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "stableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stableToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint2"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "stableTokenBump",
          "type": "u8"
        },
        {
          "name": "stableToken2Bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserMiner",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "miner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quarry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quarryMineProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
          "name": "minerBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "srcToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "src_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "srcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "dst_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "dstMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "lp_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "lpMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "reward_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "srcTokenBump",
          "type": "u8"
        },
        {
          "name": "dstTokenBump",
          "type": "u8"
        },
        {
          "name": "lpTokenBump",
          "type": "u8"
        },
        {
          "name": "rewardTokenBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "supplyStableToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm.stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "ownerStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorStableToken",
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
      "name": "redeemStableToken",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "FarmAccountMulti",
                "path": "farm.stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "ownerStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorStableToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapStableToAsset",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaSrcToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        },
        {
          "name": "swapType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "swapStableFromAsset",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userPdaStableToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaSrcToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        },
        {
          "name": "swapType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "supplyLiquidity",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
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
        },
        {
          "name": "saberSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "reserveA",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveB",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userToken",
          "accounts": [
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpToken",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unsupplyLiquidity",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
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
        },
        {
          "name": "saberSwap",
          "accounts": [
            {
              "name": "ammId",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "authority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "reserveA",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveB",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "feeAccount",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "userToken",
          "accounts": [
            {
              "name": "srcToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "dstToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "lpToken",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "minAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeToFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaLpToken",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeFromFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaLpToken",
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
      "name": "harvestFromFarm",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "name": "strategy",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "saber-farm-strategy"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.token_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.src_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.dst_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.lp_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.spl_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.saber_swap"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "SaberFarmStrategy",
                "path": "strategy.quarry"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redeemerProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintProxyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "saberFarm",
          "accounts": [
            {
              "name": "quarry",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "miner",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "minerVault",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "saberFarmRewarder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPdaLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redeemer",
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
          "name": "mintWrapper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintWrapperProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimFeeTokenAccount",
          "isMut": true,
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
      "name": "withdrawReward",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "state"
              }
            ]
          }
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorReward",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redemptionToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "extraRewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userExtraVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newUser",
      "accounts": [
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
        },
        {
          "name": "stableToken",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stableToken2",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "index-token"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "stable_mint2"
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
                "account": "UserAccountMulti",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "stableMint2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
      "name": "newStrategy",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "newStrategyUser",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "swapOrca",
      "accounts": [
        {
          "name": "orcaSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_wallet"
              }
            ]
          }
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapSource",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        },
        {
          "name": "minimumAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swapPartialOrca",
      "accounts": [
        {
          "name": "orcaSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "swap",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user_wallet"
              }
            ]
          }
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapSource",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minimumAmountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "saberSupplyLiquidity",
      "accounts": [
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "accounts": [
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swapAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "userAuthority",
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
                    "path": "user_wallet"
                  }
                ]
              }
            },
            {
              "name": "userWallet",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "farm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swap",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "inputA",
          "accounts": [
            {
              "name": "user",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserve",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "inputB",
          "accounts": [
            {
              "name": "user",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserve",
              "isMut": true,
              "isSigner": false
            }
          ]
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputLp",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "saberUnsupplyLiquidity",
      "accounts": [
        {
          "name": "saberSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "accounts": [
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swapAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "userAuthority",
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
                    "path": "user_wallet"
                  }
                ]
              }
            },
            {
              "name": "userWallet",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "farm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "swap",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "poolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteReserves",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "output",
          "accounts": [
            {
              "name": "userToken",
              "accounts": [
                {
                  "name": "user",
                  "isMut": true,
                  "isSigner": false
                },
                {
                  "name": "reserve",
                  "isMut": true,
                  "isSigner": false
                }
              ]
            },
            {
              "name": "fees",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "ownerFee",
              "isMut": true,
              "isSigner": false
            }
          ]
        }
      ],
      "args": [
        {
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "wrapUsdcToUsdc9",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
          "name": "userUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unwrapUsdc9ToUsdc",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
          "name": "userUnderlyingTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWrappedTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdc9WrapperProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "wrapSolToWsol",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
            ]
          }
        },
        {
          "name": "userWrappedSol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "unwrapWsolToSol",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
            ]
          }
        },
        {
          "name": "userWrappedSol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "claimRewards",
      "accounts": [],
      "args": [
        {
          "name": "strategy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "marinadeDeposit",
      "accounts": [
        {
          "name": "common",
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
                    "path": "payer"
                  }
                ]
              }
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "state",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "msolMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolSolLegPda",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolMsolLeg",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "marinadeProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "rent",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferFrom",
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
                "type": {
                  "defined": "Box<Account<'info,UserAccountMulti>>"
                },
                "account": "MarinadeDepositWithdraw",
                "path": "common.user_pda"
              }
            ]
          }
        },
        {
          "name": "mintTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "marinadeWithdraw",
      "accounts": [
        {
          "name": "common",
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
                    "path": "payer"
                  }
                ]
              }
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "state",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "msolMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolSolLegPda",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "liqPoolMsolLeg",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "marinadeProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "rent",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "treasuryMsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "getMsolFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferSolTo",
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
                "type": {
                  "defined": "Box<Account<'info,UserAccountMulti>>"
                },
                "account": "MarinadeDepositWithdraw",
                "path": "common.user_pda"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "msolAmount",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "solendDeposit",
      "accounts": [
        {
          "name": "transferAuthority",
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
                "account": "UserAccountMulti",
                "path": "transfer_authority.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority.authority"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "lending_market"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "solend_program"
            }
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solendProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
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
          "name": "assetIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "solendWithdraw",
      "accounts": [
        {
          "name": "transferAuthority",
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
                "account": "UserAccountMulti",
                "path": "transfer_authority.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority.authority"
              }
            ]
          }
        },
        {
          "name": "strategy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sourceToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "path": "lending_market"
              }
            ],
            "programId": {
              "kind": "account",
              "type": "publicKey",
              "path": "solend_program"
            }
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solendProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
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
          "name": "assetIndex",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "portInitObligation",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
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
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portInitStakeAccount",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferAuthority",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portWithdraw",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "portDepositWithOracle",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "transfer_authority"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transferAuthority",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "portWithdrawWithOracle",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-obligation"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortLendingMarket",
                "path": "lending_market"
              }
            ]
          }
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portLendingProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "portClaimRewards",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "port-stake-account"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "PortStakingPool",
                "path": "staking_pool"
              }
            ]
          }
        },
        {
          "name": "stakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingProgramAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "portStakingProgram",
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
      "name": "fraktDeposit",
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
        },
        {
          "name": "liquidityPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liqOwner",
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
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
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
        }
      ],
      "args": []
    },
    {
      "name": "fraktWithdraw",
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
            ]
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
      "name": "fraktHarvest",
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
            ]
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
          "name": "ownerFee",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositTokenToUserPda",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
    },
    {
      "name": "withdrawTokenFromUserPda",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPdaToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerFeeToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositLamportsToPda",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
                "path": "payer"
              }
            ]
          }
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
            ]
          }
        },
        {
          "name": "ownerFeeAccount",
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
      "name": "withdrawLamportsFromPda",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
                "path": "payer"
              }
            ]
          }
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
            ]
          }
        },
        {
          "name": "ownerFeeAccount",
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
        }
      ],
      "args": []
    },
    {
      "name": "tulipDeposit",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tulipProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "tulipWithdraw",
      "accounts": [
        {
          "name": "farm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceCollateral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
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
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tulipProgram",
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
      "name": "iyfExtensionExecute",
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
          "isSigner": false
        },
        {
          "name": "iyfProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iyfExtensionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "resetLastAction",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
      "name": "storeToken",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passthroughTokenAccount",
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
                "path": "mint"
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
          "name": "storageTokenAccount",
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
                "path": "passthrough_token_account.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
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
      "args": []
    },
    {
      "name": "unstoreToken",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passthroughTokenAccount",
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
                "path": "mint"
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
          "name": "storageTokenAccount",
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
                "path": "passthrough_token_account.mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "jupiterDynamicCpi",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jupiterProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "depositMultipleToken",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "hsFeeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "amounts",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "withdrawMultipleToken",
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
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "hsFeeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDynamicCpi",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
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
        },
        {
          "name": "meteoraProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "initializeStorageTokenAccount",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "storageTokenAccount",
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
                "account": "Mint",
                "path": "mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda"
              }
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setTransactionSlot",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "verifyTransactionSlot",
      "accounts": [
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "jupiterRouteIx",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
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
                "account": "UserAccountMulti",
                "path": "user_pda.farm"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "UserAccountMulti",
                "path": "user_pda.authority"
              }
            ]
          }
        },
        {
          "name": "userSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userDestinationTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "jupiterProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "routePlan",
          "type": "bytes"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stateAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "rewardMint",
            "type": "publicKey"
          },
          {
            "name": "rewardVault",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "saberFarmStrategy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "srcMint",
            "type": "publicKey"
          },
          {
            "name": "dstMint",
            "type": "publicKey"
          },
          {
            "name": "lpMint",
            "type": "publicKey"
          },
          {
            "name": "rewardMint",
            "type": "publicKey"
          },
          {
            "name": "splSwap",
            "type": "publicKey"
          },
          {
            "name": "saberSwap",
            "type": "publicKey"
          },
          {
            "name": "quarry",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "farmAccountMulti",
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
      "name": "userAccountMulti",
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
              "array": [
                "u8",
                285
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
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
            "name": "OrcaWithdrawAction"
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
  "events": [
    {
      "name": "StateCreated",
      "fields": []
    },
    {
      "name": "RewardFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "StableTokenFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "StableTokenRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TokenToUserPdaFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TokenFromUserPdaRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LamportToUserPdaFunded",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LamportFromUserPdaRedeemed",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "MultiFarmCreated",
      "fields": [
        {
          "name": "assetCount",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "SaberFarmCreated",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawnRewards",
      "fields": [
        {
          "name": "ownerFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "newAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "AmountHarvested",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAssetWeight",
      "msg": "Invalid Asset Weights in FundState"
    },
    {
      "code": 6001,
      "name": "InvalidIndexFarmAddress",
      "msg": "Invalid Index Farm address"
    },
    {
      "code": 6002,
      "name": "AssetNotFound",
      "msg": "Asset not found"
    },
    {
      "code": 6003,
      "name": "InvalidAssetCount",
      "msg": "Invalid Asset count"
    },
    {
      "code": 6004,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6005,
      "name": "InvalidOperationOrder",
      "msg": "Invalid operation order"
    },
    {
      "code": 6006,
      "name": "InvalidFundAmount",
      "msg": "Invalid fund amount"
    },
    {
      "code": 6007,
      "name": "InvalidSwapAmount",
      "msg": "Invalid swap amount"
    },
    {
      "code": 6008,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6009,
      "name": "IntegerUnderflow",
      "msg": "Integer underflow"
    },
    {
      "code": 6010,
      "name": "WrongTokenAccountOwner",
      "msg": "Wrong token account owner"
    },
    {
      "code": 6011,
      "name": "IncorrectSwap",
      "msg": "Incorrect swap used"
    },
    {
      "code": 6012,
      "name": "IncorrectSwapProgram",
      "msg": "Incorrect swap program"
    },
    {
      "code": 6013,
      "name": "InvalidSwapType",
      "msg": "Swap type not found"
    },
    {
      "code": 6014,
      "name": "InvalidStableTokenAccount",
      "msg": "Invalid stable token account"
    },
    {
      "code": 6015,
      "name": "InvalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6016,
      "name": "InvalidStrategy",
      "msg": "Invalid strategy"
    },
    {
      "code": 6017,
      "name": "NotYetImplemented",
      "msg": "Not yet implemented"
    },
    {
      "code": 6018,
      "name": "AmountPercentageOutOfRange",
      "msg": "Amount percentage must be within 1 to 100 only"
    },
    {
      "code": 6019,
      "name": "ZeroTradingTokens",
      "msg": "Given pool token amount results in zero trading tokens"
    },
    {
      "code": 6020,
      "name": "ShouldUseDefaultFarm",
      "msg": "Farm must be 7jLQhREMxXjKdpwVuN6gwsWt3BNfAg9WqbepffPbi4ww"
    },
    {
      "code": 6021,
      "name": "InvalidNumOfRemainingAccounts",
      "msg": "Invalid number of remaining accounts length"
    },
    {
      "code": 6022,
      "name": "InvalidNumOfAmountsInDepositMultiple",
      "msg": "Invalid number of amounts in deposit"
    },
    {
      "code": 6023,
      "name": "HsFeeOwnerMustBeHawksight",
      "msg": "hs_fee_owner must be hawksight (4K3a2ucXiGvuMJMPNneRDyzmNp6i4RdzXJmBdWwGwPEh)"
    },
    {
      "code": 6024,
      "name": "InvalidPdaOwner",
      "msg": "Invalid PDA Owner"
    },
    {
      "code": 6025,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6026,
      "name": "TokenOwnerMismatch",
      "msg": "Token owner mismatch"
    },
    {
      "code": 6027,
      "name": "NotMintAccount",
      "msg": "Cannot deserialize mint account (possibly not a mint account)"
    },
    {
      "code": 6028,
      "name": "NotTokenAccount",
      "msg": "Cannot deserialize token account (possibly not a token account)"
    },
    {
      "code": 6029,
      "name": "MustBeHawksightAuthority",
      "msg": "Must be hawksight authority"
    },
    {
      "code": 6030,
      "name": "InstructionDiscriminatorNotExpected",
      "msg": "Instruction discriminator is not the expected one"
    }
  ]
};
