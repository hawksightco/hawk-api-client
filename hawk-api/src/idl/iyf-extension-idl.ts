/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/iyf_extension.json`.
 */
export type IyfExtension = {
  "address": "",
  "metadata": {
    "name": "iyfExtension",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fraktCompound",
      "docs": [
        "Frakt compound instruction"
      ],
      "discriminator": [
        213,
        123,
        204,
        63,
        65,
        130,
        155,
        237
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight farm account"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since this is thread ix, so the constraint switches that the authorizing thread must have the user pda authority as its owner"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaLamport",
          "docs": [
            "Lamport PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "liquidityPool",
          "docs": [
            "Frakt liquidity pool",
            "Note: This account can be: PriceBasedLiquidityPool or LiquidityPool",
            "* No check on our side for this one"
          ],
          "writable": true
        },
        {
          "name": "deposit",
          "docs": [
            "Frakt deposit account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "liquidityPool"
              },
              {
                "kind": "account",
                "path": "userPdaLamport"
              }
            ],
            "program": {
              "kind": "account",
              "path": "fraktProgram"
            }
          }
        },
        {
          "name": "liqOwner",
          "docs": [
            "Frakt liquidity pool owner",
            "Note: Should have `constraint = liq_owner.key() == liquidity_pool.liq_owner` but we cannot deserialize liquidity_pool because",
            "it has 2 types."
          ],
          "writable": true
        },
        {
          "name": "admin",
          "docs": [
            "Frakt admin account"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true,
          "address": "4K3a2ucXiGvuMJMPNneRDyzmNp6i4RdzXJmBdWwGwPEh"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "fraktProgram",
          "docs": [
            "Frakt program"
          ],
          "address": "A66HabVL3DzNzeJgcHYtRRNW1ZRMKwBfrdSR4kLsZ9DJ"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "franciumDeposit",
      "docs": [
        "Francium deposit"
      ],
      "discriminator": [
        30,
        196,
        238,
        181,
        151,
        73,
        213,
        198
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaPayer",
          "docs": [
            "User PDA Payer Account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "depositMint",
          "docs": [
            "Deposit token mint"
          ]
        },
        {
          "name": "userPdaToken",
          "docs": [
            "Passthrough token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "docs": [
            "Passthrough token account owned by user pda payer account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "docs": [
            "Francium pool share token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lendingPoolShareMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "docs": [
            "User lend reward address (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "farmingPool"
              },
              {
                "kind": "account",
                "path": "userPdaPoolShareToken"
              }
            ],
            "program": {
              "kind": "account",
              "path": "franciumLendingRewardProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "docs": [
            "User rewards A (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "docs": [
            "User rewards B (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "farmingPool",
          "docs": [
            "Francium lending reward farming pool"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolAuthority",
          "docs": [
            "Francium farming pool authority"
          ]
        },
        {
          "name": "farmingPoolStakeToken",
          "docs": [
            "Francium farming stake token account"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "docs": [
            "Francium farming pool rewards a"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "docs": [
            "Francium farming pool rewards b"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "docs": [
            "Francium contribution point mint"
          ]
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "docs": [
            "Francium contribution point mint b"
          ]
        },
        {
          "name": "lendingPoolToken",
          "docs": [
            "Francium lending pool token account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolShareMint",
          "docs": [
            "Francium lending pool share mint"
          ],
          "writable": true
        },
        {
          "name": "marketAuthority",
          "docs": [
            "Francium market authority"
          ],
          "writable": true,
          "address": "sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"
        },
        {
          "name": "marketInfo",
          "docs": [
            "Francium lending market info account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolInfo",
          "docs": [
            "Francium lending pool info account"
          ],
          "writable": true
        },
        {
          "name": "clock",
          "docs": [
            "Sysvar clock"
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Sysvar rent"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "franciumLendingProgram",
          "docs": [
            "Francium lending program"
          ],
          "address": "FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"
        },
        {
          "name": "franciumLendingRewardProgram",
          "docs": [
            "Francium lending reward program"
          ],
          "address": "3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "franciumWithdraw",
      "docs": [
        "Francium withdraw"
      ],
      "discriminator": [
        145,
        193,
        80,
        186,
        173,
        38,
        60,
        185
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaPayer",
          "docs": [
            "User PDA Payer Account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "depositMint",
          "docs": [
            "Deposit token mint"
          ]
        },
        {
          "name": "userPdaToken",
          "docs": [
            "Passthrough token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "docs": [
            "Passthrough token account owned by user pda payer account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "docs": [
            "Francium pool share token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lendingPoolShareMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "docs": [
            "User lend reward address (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "farmingPool"
              },
              {
                "kind": "account",
                "path": "userPdaPoolShareToken"
              }
            ],
            "program": {
              "kind": "account",
              "path": "franciumLendingRewardProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "docs": [
            "User rewards A (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "docs": [
            "User rewards B (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "farmingPool",
          "docs": [
            "Francium lending reward farming pool"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolAuthority",
          "docs": [
            "Francium farming pool authority"
          ]
        },
        {
          "name": "farmingPoolStakeToken",
          "docs": [
            "Francium farming stake token account"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "docs": [
            "Francium farming pool rewards a"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "docs": [
            "Francium farming pool rewards b"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "docs": [
            "Francium contribution point mint"
          ]
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "docs": [
            "Francium contribution point mint b"
          ]
        },
        {
          "name": "lendingPoolToken",
          "docs": [
            "Francium lending pool token account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolShareMint",
          "docs": [
            "Francium lending pool share mint"
          ],
          "writable": true
        },
        {
          "name": "marketAuthority",
          "docs": [
            "Francium market authority"
          ],
          "writable": true,
          "address": "sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"
        },
        {
          "name": "marketInfo",
          "docs": [
            "Francium lending market info account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolInfo",
          "docs": [
            "Francium lending pool info account"
          ],
          "writable": true
        },
        {
          "name": "clock",
          "docs": [
            "Sysvar clock"
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Sysvar rent"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "franciumLendingProgram",
          "docs": [
            "Francium lending program"
          ],
          "address": "FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"
        },
        {
          "name": "franciumLendingRewardProgram",
          "docs": [
            "Francium lending reward program"
          ],
          "address": "3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true
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
      "docs": [
        "Kamino claim rewards"
      ],
      "discriminator": [
        0,
        251,
        143,
        143,
        219,
        156,
        191,
        109
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "kaminoDeposit",
      "docs": [
        "Kamino deposit"
      ],
      "discriminator": [
        237,
        8,
        188,
        187,
        115,
        99,
        49,
        85
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "sourceMintA",
          "docs": [
            "Source mint A"
          ],
          "writable": true
        },
        {
          "name": "sourceMintB",
          "docs": [
            "Source mint B"
          ],
          "writable": true
        },
        {
          "name": "sourceTokenA",
          "docs": [
            "Source token A owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "docs": [
            "Source token B owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destTokenA",
          "docs": [
            "Destination token A"
          ],
          "writable": true
        },
        {
          "name": "destTokenB",
          "docs": [
            "Destination token B"
          ],
          "writable": true
        },
        {
          "name": "destTokenAuthority",
          "docs": [
            "Destination token authority"
          ],
          "writable": true
        },
        {
          "name": "lpMint",
          "docs": [
            "Kamino LP Token"
          ],
          "writable": true
        },
        {
          "name": "lpMintAuthority",
          "docs": [
            "Kamino LP Mint Authority"
          ]
        },
        {
          "name": "userLpToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lpMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "strategy",
          "docs": [
            "Kamino strategy account"
          ],
          "writable": true
        },
        {
          "name": "globalConfig",
          "docs": [
            "Kamino global config"
          ]
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca position"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "Orca position token account"
          ]
        },
        {
          "name": "whirlpoolTokenVaultA",
          "docs": [
            "Orca whirlpool token vault A"
          ],
          "writable": true
        },
        {
          "name": "whirlpoolTokenVaultB",
          "docs": [
            "Orca whirlpool token vault B"
          ],
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca lower tick array"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca upper tick array"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenAVault",
          "docs": [
            "Treasury token A vault (kamino??)"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenBVault",
          "docs": [
            "Treasury token B vault"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "docs": [
            "Treasury fee vault authority"
          ]
        },
        {
          "name": "scopePrices",
          "docs": [
            "Scope prices"
          ]
        },
        {
          "name": "tokenInfos",
          "docs": [
            "Kamino token infos"
          ]
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions sysvar"
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "kaminoProgram",
          "docs": [
            "Kamino program"
          ],
          "address": "6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "kaminoWithdraw",
      "docs": [
        "Kamino withdraw"
      ],
      "discriminator": [
        199,
        101,
        41,
        45,
        213,
        98,
        224,
        200
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "sourceMintA",
          "docs": [
            "Source mint A"
          ],
          "writable": true
        },
        {
          "name": "sourceMintB",
          "docs": [
            "Source mint B"
          ],
          "writable": true
        },
        {
          "name": "sourceTokenA",
          "docs": [
            "Source token A owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "docs": [
            "Source token B owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destTokenA",
          "docs": [
            "Destination token A"
          ],
          "writable": true
        },
        {
          "name": "destTokenB",
          "docs": [
            "Destination token B"
          ],
          "writable": true
        },
        {
          "name": "destTokenAuthority",
          "docs": [
            "Destination token authority"
          ],
          "writable": true
        },
        {
          "name": "lpMint",
          "docs": [
            "Kamino LP Token"
          ],
          "writable": true
        },
        {
          "name": "lpMintAuthority",
          "docs": [
            "Kamino LP Mint Authority"
          ]
        },
        {
          "name": "userLpToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lpMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "strategy",
          "docs": [
            "Kamino strategy account"
          ],
          "writable": true
        },
        {
          "name": "globalConfig",
          "docs": [
            "Kamino global config"
          ]
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca position"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "Orca position token account"
          ]
        },
        {
          "name": "whirlpoolTokenVaultA",
          "docs": [
            "Orca whirlpool token vault A"
          ],
          "writable": true
        },
        {
          "name": "whirlpoolTokenVaultB",
          "docs": [
            "Orca whirlpool token vault B"
          ],
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca lower tick array"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca upper tick array"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenAVault",
          "docs": [
            "Treasury token A vault (kamino??)"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenBVault",
          "docs": [
            "Treasury token B vault"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "docs": [
            "Treasury fee vault authority"
          ]
        },
        {
          "name": "scopePrices",
          "docs": [
            "Scope prices"
          ]
        },
        {
          "name": "tokenInfos",
          "docs": [
            "Kamino token infos"
          ]
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions sysvar"
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "kaminoProgram",
          "docs": [
            "Kamino program"
          ],
          "address": "6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
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
      "name": "meteoraDlmmClaimFee",
      "docs": [
        "Meteora DLMM Claim Fee IX"
      ],
      "discriminator": [
        78,
        116,
        98,
        78,
        50,
        82,
        72,
        37
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimFeeAutomation",
      "docs": [
        "Meteora DLMM Claim Fee IX Automation"
      ],
      "discriminator": [
        62,
        166,
        106,
        25,
        254,
        174,
        249,
        151
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimReward",
      "docs": [
        "Meteora DLMM Claim Reward IX"
      ],
      "discriminator": [
        107,
        160,
        137,
        17,
        162,
        0,
        24,
        234
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFee",
          "writable": true
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
      "name": "meteoraDlmmClaimRewardAutomation",
      "docs": [
        "Meteora DLMM Claim Reward IX Automation"
      ],
      "discriminator": [
        12,
        179,
        108,
        66,
        17,
        40,
        77,
        188
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFee",
          "writable": true
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
      "name": "meteoraDlmmClosePositionAutomation",
      "docs": [
        "Meteora DLMM Initialize Position"
      ],
      "discriminator": [
        54,
        111,
        59,
        53,
        213,
        128,
        112,
        13
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmDepositAutomation",
      "docs": [
        "Meteora DLMM Deposit IX Automation"
      ],
      "discriminator": [
        0,
        200,
        132,
        95,
        156,
        162,
        92,
        229
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "activeId",
          "type": "i32"
        },
        {
          "name": "maxActiveBinSlippage",
          "type": "i32"
        },
        {
          "name": "strategyParametersMinBinId",
          "type": "i32"
        },
        {
          "name": "strategyParametersMaxBinId",
          "type": "i32"
        },
        {
          "name": "strategyParametersStrategyType",
          "type": "u8"
        },
        {
          "name": "strategyParametersParameters",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "meteoraDlmmInitializePositionAutomation",
      "docs": [
        "Meteora DLMM Initialize Position"
      ],
      "discriminator": [
        240,
        162,
        112,
        99,
        105,
        118,
        30,
        255
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "lowerBinId",
          "type": "i32"
        },
        {
          "name": "width",
          "type": "i32"
        }
      ]
    },
    {
      "name": "meteoraDlmmLimitCloseAutomation",
      "docs": [
        "Meteora Limit Close Position"
      ],
      "discriminator": [
        250,
        111,
        129,
        110,
        248,
        232,
        87,
        161
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
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
      "name": "meteoraDlmmOneSideDeposit",
      "discriminator": [
        201,
        244,
        26,
        124,
        31,
        89,
        214,
        54
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userToken",
          "writable": true
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
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
      "name": "meteoraDlmmRedepositAutomation",
      "docs": [
        "Meteora Open Position and Deposit (Part of rebalance automation)"
      ],
      "discriminator": [
        87,
        159,
        39,
        164,
        85,
        25,
        184,
        77
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "userTokenX",
          "docs": [
            "Token X owned by User PDA"
          ],
          "writable": true
        },
        {
          "name": "userTokenY",
          "docs": [
            "Token Y owned by User PDA"
          ],
          "writable": true
        },
        {
          "name": "reserveX",
          "docs": [
            "Token X reserve"
          ],
          "writable": true
        },
        {
          "name": "reserveY",
          "docs": [
            "Token Y reserve"
          ],
          "writable": true
        },
        {
          "name": "tokenXMint",
          "docs": [
            "Token X Mint (to be validated by meteora lb_pair within their program)"
          ]
        },
        {
          "name": "tokenYMint",
          "docs": [
            "Token Y Mint (to be validated by meteora lb_pair within their program)"
          ]
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "docs": [
            "Meteora program"
          ],
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "relativeLowerBinId",
          "type": "u8"
        },
        {
          "name": "relativeUpperBinId",
          "type": "u8"
        },
        {
          "name": "strategyType",
          "type": "u8"
        },
        {
          "name": "checkRange",
          "type": {
            "option": {
              "array": [
                "i32",
                2
              ]
            }
          }
        }
      ]
    },
    {
      "name": "meteoraDlmmWithdrawAutomation",
      "docs": [
        "Meteora DLMM Withdraw IX Automation"
      ],
      "discriminator": [
        248,
        176,
        189,
        198,
        238,
        251,
        142,
        251
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
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
      "name": "moveToken",
      "docs": [
        "Move token owned by user pda to another token (STA --> ATA / ATA --> STA)"
      ],
      "discriminator": [
        2,
        146,
        18,
        62,
        142,
        99,
        91,
        200
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "sourceToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "destination_token.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destinationToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "source_token.mint",
                "account": "tokenAccount"
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "useSourceAmount",
          "type": "bool"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaAutoClaimRewards",
      "docs": [
        "Orca claim rewards"
      ],
      "discriminator": [
        168,
        238,
        50,
        44,
        251,
        241,
        252,
        84
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ]
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ]
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoClosePosition",
      "docs": [
        "Orca whirlpool - Close position"
      ],
      "discriminator": [
        134,
        6,
        27,
        81,
        240,
        177,
        102,
        11
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoDeposit",
      "docs": [
        "Orca whirlpool deposit"
      ],
      "discriminator": [
        59,
        235,
        44,
        226,
        42,
        126,
        224,
        208
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoOpenPosition",
      "docs": [
        "Orca whirlpool - Open position"
      ],
      "discriminator": [
        122,
        125,
        182,
        135,
        102,
        74,
        131,
        205
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorizedr5rvb dd by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
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
      "name": "orcaAutoWithdraw",
      "docs": [
        "Orca whirlpool withdraw"
      ],
      "discriminator": [
        213,
        189,
        60,
        133,
        218,
        101,
        148,
        90
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca claim rewards"
      ],
      "discriminator": [
        19,
        212,
        246,
        204,
        151,
        148,
        37,
        66
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ]
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ]
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaClosePosition",
      "docs": [
        "Orca whirlpool - Close position"
      ],
      "discriminator": [
        112,
        163,
        213,
        147,
        17,
        178,
        105,
        68
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompound",
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        189,
        179,
        117,
        17,
        195,
        111,
        129,
        254
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompoundFees",
      "docs": [
        "Orca compound fees instruction"
      ],
      "discriminator": [
        207,
        68,
        176,
        183,
        180,
        238,
        28,
        120
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca compound fees (swap on-chain calculation) instruction"
      ],
      "discriminator": [
        34,
        28,
        230,
        10,
        4,
        148,
        118,
        108
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca compound fees instruction"
      ],
      "discriminator": [
        31,
        245,
        98,
        188,
        186,
        32,
        95,
        16
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ]
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerUsdc",
          "docs": [
            "UserPDA's USDC account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "whirlpoolUsdc",
          "docs": [
            "Orca whirlpool account for swap into usdc"
          ],
          "writable": true
        },
        {
          "name": "rewardOwner",
          "docs": [
            "UserPDA's reward account"
          ],
          "writable": true
        },
        {
          "name": "rewardVault",
          "docs": [
            "Whirlpool's reward account"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Hawksight's fee reward account"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAUsdc",
          "writable": true
        },
        {
          "name": "tokenVaultBUsdc",
          "writable": true
        },
        {
          "name": "tickArray0Usdc",
          "writable": true
        },
        {
          "name": "tickArray1Usdc",
          "writable": true
        },
        {
          "name": "tickArray2Usdc",
          "writable": true
        },
        {
          "name": "oracleUsdc",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpoolUsdc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "whirlpoolPos",
          "docs": [
            "Orca whirlpool account for swap from usdc to the position token chosen"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAPos",
          "writable": true
        },
        {
          "name": "tokenVaultBPos",
          "writable": true
        },
        {
          "name": "tickArray0Pos",
          "writable": true
        },
        {
          "name": "tickArray1Pos",
          "writable": true
        },
        {
          "name": "tickArray2Pos",
          "writable": true
        },
        {
          "name": "oraclePos",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpoolPos"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
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
      "name": "orcaDeposit",
      "docs": [
        "Orca whirlpool deposit"
      ],
      "discriminator": [
        133,
        44,
        165,
        174,
        234,
        172,
        101,
        100
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaOpenPosition",
      "docs": [
        "Orca whirlpool - Open position"
      ],
      "discriminator": [
        93,
        113,
        253,
        20,
        48,
        188,
        212,
        41
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized dd by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
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
      "name": "orcaRebalance",
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        149,
        70,
        92,
        141,
        98,
        146,
        20,
        64
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerSrc",
            "tickArrayUpperSrc",
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintSrc",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionSrc",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperSrc",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountSrc",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
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
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        68,
        244,
        169,
        173,
        200,
        89,
        184,
        249
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerSrc",
            "tickArrayUpperSrc",
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintSrc",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionSrc",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperSrc",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountSrc",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
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
      "docs": [
        "Orca sweep dust instruction"
      ],
      "discriminator": [
        153,
        62,
        118,
        248,
        84,
        160,
        150,
        147
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionDst",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "name": "orcaWithdraw",
      "docs": [
        "Orca whirlpool withdraw"
      ],
      "discriminator": [
        13,
        188,
        137,
        70,
        156,
        67,
        181,
        156
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "name": "saberCompound1",
      "docs": [
        "Saber compound #1"
      ],
      "discriminator": [
        142,
        228,
        97,
        31,
        51,
        153,
        60,
        151
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "mintWrapper",
          "docs": [
            "Mint wrapper account",
            "* Basic program ownership check",
            "* rewarder.mint_wrapper (checked via has_one constraint in rewarder)"
          ],
          "writable": true
        },
        {
          "name": "minter",
          "docs": [
            "Minter account",
            "* Basic program ownership check",
            "* Seed validation"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  105,
                  110,
                  116,
                  87,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                  77,
                  105,
                  110,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mintWrapper"
              },
              {
                "kind": "account",
                "path": "rewarder"
              }
            ],
            "program": {
              "kind": "account",
              "path": "mintWrapperProgram"
            }
          }
        },
        {
          "name": "rewardsTokenMint",
          "docs": [
            "Saber IOU Token"
          ],
          "writable": true,
          "address": "iouQcQBAiEXe6cKLS85zmZxUqaCqBdeHFpqKoSz615u"
        },
        {
          "name": "userpdaSbrIouToken",
          "docs": [
            "UserPDA Saber IOU Token"
          ],
          "writable": true
        },
        {
          "name": "claimFeeTokenAccount",
          "docs": [
            "Claim fee token account",
            "* Checked via has_one constraint (rewarder.mint_wrapper)"
          ],
          "writable": true
        },
        {
          "name": "rewarder",
          "docs": [
            "Rewarder account for this quarry (only used for validation)"
          ]
        },
        {
          "name": "quarry",
          "docs": [
            "Saber farm quarry account"
          ]
        },
        {
          "name": "miner",
          "docs": [
            "User's miner account relative on quarry saber farm"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  105,
                  110,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "quarry"
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "quarryMineProgram"
            }
          }
        },
        {
          "name": "saberFarmRewarder",
          "address": "rXhAofQCT7NN9TUqigyEAUzV1uLL4boeD8CRkNBSkYk"
        },
        {
          "name": "redeemer",
          "docs": [
            "Redeemer account",
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "CL9wkGFT3SZRRNa9dgaovuRV7jrVVigBUZ6DjcgySsCU"
        },
        {
          "name": "redemptionMint",
          "docs": [
            "Saber mint"
          ],
          "writable": true,
          "address": "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1"
        },
        {
          "name": "redemptionVault",
          "docs": [
            "Saber redemption vault"
          ],
          "writable": true,
          "address": "ESg7xPUBioCqK4QaSvuZkhuekagvKcx326wNo3U7kRWc"
        },
        {
          "name": "userpdaSbrToken",
          "writable": true
        },
        {
          "name": "mintProxyState",
          "docs": [
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "9qRjwMQYrkd5JvsENaYYxSCgwEuVhK4qAo5kCFHSmdmL"
        },
        {
          "name": "proxyMintAuthority",
          "docs": [
            "* Basic program ownership check"
          ],
          "address": "GyktbGXbH9kvxP8RGfWsnFtuRgC7QCQo2WBqpo3ryk7L"
        },
        {
          "name": "minterInfo",
          "docs": [
            "Minter info",
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "GNSuMDSnUP9oK4HRtCi41zAbUzEqeLK1QPoby6dLVD9v"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca Saber/USDC Whirlpool"
          ],
          "writable": true,
          "address": "HXPD3Y4PCkvBNC3NKUa5YDQkTuusfWxhXs5Qe5VP1p2X",
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "orcaSbrVault",
          "docs": [
            "Orca Saber/USDC SBR Token Vault"
          ],
          "writable": true
        },
        {
          "name": "orcaUsdcVault",
          "docs": [
            "Orca Saber/USDC USDC Token Vault"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "address": "EJwCYGGNzaZfUBKKDZM2opBsBFWsNx5CmxnCe81ULnQT"
        },
        {
          "name": "userpdaUsdcToken",
          "docs": [
            "UserPDA Passthrough USDC Token account (will come from sbr/usdc orca swap)"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee"
          ],
          "writable": true
        },
        {
          "name": "mintWrapperProgram",
          "docs": [
            "Quarry mint wrapper program"
          ],
          "address": "QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV"
        },
        {
          "name": "quarryMineProgram",
          "docs": [
            "Quarry mine program"
          ],
          "address": "QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB"
        },
        {
          "name": "saberRedeemerProgram",
          "docs": [
            "Saber Redeemer program"
          ],
          "address": "RDM23yr8pr1kEAmhnFpaabPny6C9UVcEcok3Py5v86X"
        },
        {
          "name": "saberMintProxyProgram",
          "docs": [
            "Saber Mint proxy program"
          ],
          "address": "UBEBk5idELqykEEaycYtQ7iBVrCg6NmvFSzMpdr22mL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "saberSwapProgram",
          "docs": [
            "Saber swap program"
          ],
          "address": "SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ"
        }
      ],
      "args": []
    },
    {
      "name": "saberCompoundUsdc2",
      "docs": [
        "Saber compound #2 (for usdc)"
      ],
      "discriminator": [
        53,
        71,
        164,
        0,
        38,
        244,
        50,
        230
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "inputAReserve",
          "docs": [
            "Saber Reserve A"
          ],
          "writable": true
        },
        {
          "name": "inputBReserve",
          "docs": [
            "Saber Reserve B (USDC or SOL mint)"
          ],
          "writable": true
        },
        {
          "name": "otherUserToken",
          "docs": [
            "UserPDA-owned other token (just empty but valid token account)",
            "This token account is mint A or B, and not equal to userpda_usdc_token or userpda_wsol_token"
          ],
          "writable": true
        },
        {
          "name": "userpdaUsdcToken",
          "docs": [
            "UserPDA Passthrough USDC Token account (will come from sbr/usdc orca swap)"
          ],
          "writable": true
        },
        {
          "name": "saberSwapAuthority",
          "docs": [
            "Saber Swap Authority"
          ]
        },
        {
          "name": "swapAmmId",
          "docs": [
            "Saber Swap AMM ID",
            "* Basic ownership check"
          ]
        },
        {
          "name": "saberPoolMint",
          "docs": [
            "Saber Pool Mint"
          ],
          "writable": true
        },
        {
          "name": "userpdaLpToken",
          "docs": [
            "UserPDA LP Token Account"
          ],
          "writable": true
        },
        {
          "name": "quarry",
          "docs": [
            "Saber farm quarry account"
          ],
          "writable": true
        },
        {
          "name": "miner",
          "docs": [
            "User's miner account relative on quarry saber farm",
            "* Basic program ownership check",
            "NOTE: seed check using macro not possible because we moved quarry_mine_program into remaining_accounts"
          ]
        },
        {
          "name": "minerVault",
          "docs": [
            "User's miner vault account, owned by the `miner` account"
          ],
          "writable": true
        },
        {
          "name": "saberFarmRewarder",
          "address": "rXhAofQCT7NN9TUqigyEAUzV1uLL4boeD8CRkNBSkYk"
        },
        {
          "name": "wrapper",
          "docs": [
            "Wrapper account."
          ],
          "address": "AnKLLfpMcceM6YXtJ9nGxYekVXqfWy8WNsMZXoQTCVQk"
        },
        {
          "name": "wrapperMint",
          "docs": [
            "Mint of the wrapper."
          ],
          "writable": true,
          "address": "JEFFSQ3s8T3wKsvp4tnRAsUBW7Cqgnf8ukBZC4C8XBm1"
        },
        {
          "name": "wrapperUnderlyingTokens",
          "docs": [
            "Wrapper's token account containing the underlying tokens."
          ],
          "writable": true,
          "address": "77XHXCWYQ76E9Q3uCuz1geTaxsqJZf9RfX5ZY7yyLDYt"
        }
      ],
      "args": []
    },
    {
      "name": "swapOrca",
      "docs": [
        "Perform orca swap"
      ],
      "discriminator": [
        40,
        245,
        11,
        107,
        43,
        203,
        151,
        127
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "source",
          "docs": [
            "Source token to be swapped"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Orca token vault A"
          ],
          "writable": true
        },
        {
          "name": "destination",
          "docs": [
            "Token to be received from given source (destination)"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Orca token vault b"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account",
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program account"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "swapPartialOrca",
      "docs": [
        "Perform orca swap (partial swap)"
      ],
      "discriminator": [
        161,
        5,
        126,
        95,
        180,
        159,
        166,
        27
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "source",
          "docs": [
            "Source token to be swapped"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Orca token vault A"
          ],
          "writable": true
        },
        {
          "name": "destination",
          "docs": [
            "Token to be received from given source (destination)"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Orca token vault b"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account",
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program account"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amountPctBps",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "farmAccountMulti",
      "discriminator": [
        106,
        215,
        38,
        140,
        164,
        236,
        159,
        54
      ]
    },
    {
      "name": "position",
      "discriminator": [
        170,
        188,
        143,
        228,
        122,
        64,
        247,
        208
      ]
    },
    {
      "name": "tickArray",
      "discriminator": [
        69,
        97,
        189,
        190,
        110,
        7,
        66,
        187
      ]
    },
    {
      "name": "userAccountMulti",
      "discriminator": [
        144,
        17,
        242,
        7,
        19,
        107,
        173,
        118
      ]
    },
    {
      "name": "whirlpool",
      "discriminator": [
        63,
        149,
        209,
        12,
        225,
        128,
        99,
        9
      ]
    }
  ],
  "types": [
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
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stableMint",
            "type": "pubkey"
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
                "defined": {
                  "name": "farmAssetInfo"
                }
              }
            }
          },
          {
            "name": "rewardInfos",
            "type": {
              "vec": {
                "defined": {
                  "name": "farmRewardInfo"
                }
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
      "name": "farmAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weight",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "farmRewardInfo",
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
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "positionMint",
            "type": "pubkey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "feeGrowthCheckpointA",
            "type": "u128"
          },
          {
            "name": "feeOwedA",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointB",
            "type": "u128"
          },
          {
            "name": "feeOwedB",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "positionRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "positionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tick",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "liquidityNet",
            "type": "i128"
          },
          {
            "name": "liquidityGross",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideA",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideB",
            "type": "u128"
          },
          {
            "name": "rewardGrowthsOutside",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tickArray",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTickIndex",
            "type": "i32"
          },
          {
            "name": "ticks",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tick"
                  }
                },
                88
              ]
            }
          },
          {
            "name": "whirlpool",
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farm",
            "type": "pubkey"
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
                "pubkey",
                10
              ]
            }
          },
          {
            "name": "assetInfo",
            "type": {
              "defined": {
                "name": "userAssetInfo"
              }
            }
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "userAccountMultiPadding"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userAccountMultiPadding",
      "type": {
        "kind": "struct",
        "fields": [
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
    },
    {
      "name": "userAssetInfo",
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
      "name": "whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "whirlpoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tickSpacingSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "protocolFeeRate",
            "type": "u16"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
          },
          {
            "name": "protocolFeeOwedA",
            "type": "u64"
          },
          {
            "name": "protocolFeeOwedB",
            "type": "u64"
          },
          {
            "name": "tokenMintA",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultA",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalA",
            "type": "u128"
          },
          {
            "name": "tokenMintB",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultB",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalB",
            "type": "u128"
          },
          {
            "name": "rewardLastUpdatedTimestamp",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "whirlpoolRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "whirlpoolRewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards at the `Whirlpool` level.",
        "These values are used in conjunction with `PositionRewardInfo`, `Tick.reward_growths_outside`,",
        "and `Whirlpool.reward_last_updated_timestamp` to determine how many rewards are earned by open",
        "positions."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "pubkey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "pubkey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority account that has permission to initialize the reward and set emissions."
            ],
            "type": "pubkey"
          },
          {
            "name": "emissionsPerSecondX64",
            "docs": [
              "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
            ],
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "docs": [
              "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
              "emissions were turned on."
            ],
            "type": "u128"
          }
        ]
      }
    }
  ]
};

export const IDL: IyfExtension = {
  "address": "",
  "metadata": {
    "name": "iyfExtension",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fraktCompound",
      "docs": [
        "Frakt compound instruction"
      ],
      "discriminator": [
        213,
        123,
        204,
        63,
        65,
        130,
        155,
        237
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight farm account"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since this is thread ix, so the constraint switches that the authorizing thread must have the user pda authority as its owner"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaLamport",
          "docs": [
            "Lamport PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "liquidityPool",
          "docs": [
            "Frakt liquidity pool",
            "Note: This account can be: PriceBasedLiquidityPool or LiquidityPool",
            "* No check on our side for this one"
          ],
          "writable": true
        },
        {
          "name": "deposit",
          "docs": [
            "Frakt deposit account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "liquidityPool"
              },
              {
                "kind": "account",
                "path": "userPdaLamport"
              }
            ],
            "program": {
              "kind": "account",
              "path": "fraktProgram"
            }
          }
        },
        {
          "name": "liqOwner",
          "docs": [
            "Frakt liquidity pool owner",
            "Note: Should have `constraint = liq_owner.key() == liquidity_pool.liq_owner` but we cannot deserialize liquidity_pool because",
            "it has 2 types."
          ],
          "writable": true
        },
        {
          "name": "admin",
          "docs": [
            "Frakt admin account"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true,
          "address": "4K3a2ucXiGvuMJMPNneRDyzmNp6i4RdzXJmBdWwGwPEh"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "fraktProgram",
          "docs": [
            "Frakt program"
          ],
          "address": "A66HabVL3DzNzeJgcHYtRRNW1ZRMKwBfrdSR4kLsZ9DJ"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "franciumDeposit",
      "docs": [
        "Francium deposit"
      ],
      "discriminator": [
        30,
        196,
        238,
        181,
        151,
        73,
        213,
        198
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaPayer",
          "docs": [
            "User PDA Payer Account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "depositMint",
          "docs": [
            "Deposit token mint"
          ]
        },
        {
          "name": "userPdaToken",
          "docs": [
            "Passthrough token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "docs": [
            "Passthrough token account owned by user pda payer account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "docs": [
            "Francium pool share token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lendingPoolShareMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "docs": [
            "User lend reward address (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "farmingPool"
              },
              {
                "kind": "account",
                "path": "userPdaPoolShareToken"
              }
            ],
            "program": {
              "kind": "account",
              "path": "franciumLendingRewardProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "docs": [
            "User rewards A (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "docs": [
            "User rewards B (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "farmingPool",
          "docs": [
            "Francium lending reward farming pool"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolAuthority",
          "docs": [
            "Francium farming pool authority"
          ]
        },
        {
          "name": "farmingPoolStakeToken",
          "docs": [
            "Francium farming stake token account"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "docs": [
            "Francium farming pool rewards a"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "docs": [
            "Francium farming pool rewards b"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "docs": [
            "Francium contribution point mint"
          ]
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "docs": [
            "Francium contribution point mint b"
          ]
        },
        {
          "name": "lendingPoolToken",
          "docs": [
            "Francium lending pool token account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolShareMint",
          "docs": [
            "Francium lending pool share mint"
          ],
          "writable": true
        },
        {
          "name": "marketAuthority",
          "docs": [
            "Francium market authority"
          ],
          "writable": true,
          "address": "sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"
        },
        {
          "name": "marketInfo",
          "docs": [
            "Francium lending market info account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolInfo",
          "docs": [
            "Francium lending pool info account"
          ],
          "writable": true
        },
        {
          "name": "clock",
          "docs": [
            "Sysvar clock"
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Sysvar rent"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "franciumLendingProgram",
          "docs": [
            "Francium lending program"
          ],
          "address": "FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"
        },
        {
          "name": "franciumLendingRewardProgram",
          "docs": [
            "Francium lending reward program"
          ],
          "address": "3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "franciumWithdraw",
      "docs": [
        "Francium withdraw"
      ],
      "discriminator": [
        145,
        193,
        80,
        186,
        173,
        38,
        60,
        185
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "userPdaPayer",
          "docs": [
            "User PDA Payer Account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  100,
                  97,
                  45,
                  108,
                  97,
                  109,
                  112,
                  111,
                  114,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "depositMint",
          "docs": [
            "Deposit token mint"
          ]
        },
        {
          "name": "userPdaToken",
          "docs": [
            "Passthrough token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaToken2",
          "docs": [
            "Passthrough token account owned by user pda payer account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaPoolShareToken",
          "docs": [
            "Francium pool share token account owned by user pda account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lendingPoolShareMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaLendRewardAddress",
          "docs": [
            "User lend reward address (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPdaPayer"
              },
              {
                "kind": "account",
                "path": "farmingPool"
              },
              {
                "kind": "account",
                "path": "userPdaPoolShareToken"
              }
            ],
            "program": {
              "kind": "account",
              "path": "franciumLendingRewardProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsA",
          "docs": [
            "User rewards A (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userPdaRewardsB",
          "docs": [
            "User rewards B (owned by user pda)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "farmingPoolRewardsTokenMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "farmingPool",
          "docs": [
            "Francium lending reward farming pool"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolAuthority",
          "docs": [
            "Francium farming pool authority"
          ]
        },
        {
          "name": "farmingPoolStakeToken",
          "docs": [
            "Francium farming stake token account"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenA",
          "docs": [
            "Francium farming pool rewards a"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenB",
          "docs": [
            "Francium farming pool rewards b"
          ],
          "writable": true
        },
        {
          "name": "farmingPoolRewardsTokenMintA",
          "docs": [
            "Francium contribution point mint"
          ]
        },
        {
          "name": "farmingPoolRewardsTokenMintB",
          "docs": [
            "Francium contribution point mint b"
          ]
        },
        {
          "name": "lendingPoolToken",
          "docs": [
            "Francium lending pool token account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolShareMint",
          "docs": [
            "Francium lending pool share mint"
          ],
          "writable": true
        },
        {
          "name": "marketAuthority",
          "docs": [
            "Francium market authority"
          ],
          "writable": true,
          "address": "sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"
        },
        {
          "name": "marketInfo",
          "docs": [
            "Francium lending market info account"
          ],
          "writable": true
        },
        {
          "name": "lendingPoolInfo",
          "docs": [
            "Francium lending pool info account"
          ],
          "writable": true
        },
        {
          "name": "clock",
          "docs": [
            "Sysvar clock"
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Sysvar rent"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "franciumLendingProgram",
          "docs": [
            "Francium lending program"
          ],
          "address": "FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"
        },
        {
          "name": "franciumLendingRewardProgram",
          "docs": [
            "Francium lending reward program"
          ],
          "address": "3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee account (Hawksight)"
          ],
          "writable": true
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
      "docs": [
        "Kamino claim rewards"
      ],
      "discriminator": [
        0,
        251,
        143,
        143,
        219,
        156,
        191,
        109
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "kaminoDeposit",
      "docs": [
        "Kamino deposit"
      ],
      "discriminator": [
        237,
        8,
        188,
        187,
        115,
        99,
        49,
        85
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "sourceMintA",
          "docs": [
            "Source mint A"
          ],
          "writable": true
        },
        {
          "name": "sourceMintB",
          "docs": [
            "Source mint B"
          ],
          "writable": true
        },
        {
          "name": "sourceTokenA",
          "docs": [
            "Source token A owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "docs": [
            "Source token B owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destTokenA",
          "docs": [
            "Destination token A"
          ],
          "writable": true
        },
        {
          "name": "destTokenB",
          "docs": [
            "Destination token B"
          ],
          "writable": true
        },
        {
          "name": "destTokenAuthority",
          "docs": [
            "Destination token authority"
          ],
          "writable": true
        },
        {
          "name": "lpMint",
          "docs": [
            "Kamino LP Token"
          ],
          "writable": true
        },
        {
          "name": "lpMintAuthority",
          "docs": [
            "Kamino LP Mint Authority"
          ]
        },
        {
          "name": "userLpToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lpMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "strategy",
          "docs": [
            "Kamino strategy account"
          ],
          "writable": true
        },
        {
          "name": "globalConfig",
          "docs": [
            "Kamino global config"
          ]
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca position"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "Orca position token account"
          ]
        },
        {
          "name": "whirlpoolTokenVaultA",
          "docs": [
            "Orca whirlpool token vault A"
          ],
          "writable": true
        },
        {
          "name": "whirlpoolTokenVaultB",
          "docs": [
            "Orca whirlpool token vault B"
          ],
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca lower tick array"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca upper tick array"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenAVault",
          "docs": [
            "Treasury token A vault (kamino??)"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenBVault",
          "docs": [
            "Treasury token B vault"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "docs": [
            "Treasury fee vault authority"
          ]
        },
        {
          "name": "scopePrices",
          "docs": [
            "Scope prices"
          ]
        },
        {
          "name": "tokenInfos",
          "docs": [
            "Kamino token infos"
          ]
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions sysvar"
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "kaminoProgram",
          "docs": [
            "Kamino program"
          ],
          "address": "6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "kaminoWithdraw",
      "docs": [
        "Kamino withdraw"
      ],
      "discriminator": [
        199,
        101,
        41,
        45,
        213,
        98,
        224,
        200
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "sourceMintA",
          "docs": [
            "Source mint A"
          ],
          "writable": true
        },
        {
          "name": "sourceMintB",
          "docs": [
            "Source mint B"
          ],
          "writable": true
        },
        {
          "name": "sourceTokenA",
          "docs": [
            "Source token A owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintA"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "sourceTokenB",
          "docs": [
            "Source token B owned by user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "sourceMintB"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destTokenA",
          "docs": [
            "Destination token A"
          ],
          "writable": true
        },
        {
          "name": "destTokenB",
          "docs": [
            "Destination token B"
          ],
          "writable": true
        },
        {
          "name": "destTokenAuthority",
          "docs": [
            "Destination token authority"
          ],
          "writable": true
        },
        {
          "name": "lpMint",
          "docs": [
            "Kamino LP Token"
          ],
          "writable": true
        },
        {
          "name": "lpMintAuthority",
          "docs": [
            "Kamino LP Mint Authority"
          ]
        },
        {
          "name": "userLpToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "lpMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "strategy",
          "docs": [
            "Kamino strategy account"
          ],
          "writable": true
        },
        {
          "name": "globalConfig",
          "docs": [
            "Kamino global config"
          ]
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca position"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "Orca position token account"
          ]
        },
        {
          "name": "whirlpoolTokenVaultA",
          "docs": [
            "Orca whirlpool token vault A"
          ],
          "writable": true
        },
        {
          "name": "whirlpoolTokenVaultB",
          "docs": [
            "Orca whirlpool token vault B"
          ],
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca lower tick array"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca upper tick array"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenAVault",
          "docs": [
            "Treasury token A vault (kamino??)"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeTokenBVault",
          "docs": [
            "Treasury token B vault"
          ],
          "writable": true
        },
        {
          "name": "treasuryFeeVaultAuthority",
          "docs": [
            "Treasury fee vault authority"
          ]
        },
        {
          "name": "scopePrices",
          "docs": [
            "Scope prices"
          ]
        },
        {
          "name": "tokenInfos",
          "docs": [
            "Kamino token infos"
          ]
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions sysvar"
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "kaminoProgram",
          "docs": [
            "Kamino program"
          ],
          "address": "6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
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
      "name": "meteoraDlmmClaimFee",
      "docs": [
        "Meteora DLMM Claim Fee IX"
      ],
      "discriminator": [
        78,
        116,
        98,
        78,
        50,
        82,
        72,
        37
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimFeeAutomation",
      "docs": [
        "Meteora DLMM Claim Fee IX Automation"
      ],
      "discriminator": [
        62,
        166,
        106,
        25,
        254,
        174,
        249,
        151
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmClaimReward",
      "docs": [
        "Meteora DLMM Claim Reward IX"
      ],
      "discriminator": [
        107,
        160,
        137,
        17,
        162,
        0,
        24,
        234
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFee",
          "writable": true
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
      "name": "meteoraDlmmClaimRewardAutomation",
      "docs": [
        "Meteora DLMM Claim Reward IX Automation"
      ],
      "discriminator": [
        12,
        179,
        108,
        66,
        17,
        40,
        77,
        188
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFee",
          "writable": true
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
      "name": "meteoraDlmmClosePositionAutomation",
      "docs": [
        "Meteora DLMM Initialize Position"
      ],
      "discriminator": [
        54,
        111,
        59,
        53,
        213,
        128,
        112,
        13
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": []
    },
    {
      "name": "meteoraDlmmDepositAutomation",
      "docs": [
        "Meteora DLMM Deposit IX Automation"
      ],
      "discriminator": [
        0,
        200,
        132,
        95,
        156,
        162,
        92,
        229
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "activeId",
          "type": "i32"
        },
        {
          "name": "maxActiveBinSlippage",
          "type": "i32"
        },
        {
          "name": "strategyParametersMinBinId",
          "type": "i32"
        },
        {
          "name": "strategyParametersMaxBinId",
          "type": "i32"
        },
        {
          "name": "strategyParametersStrategyType",
          "type": "u8"
        },
        {
          "name": "strategyParametersParameters",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "meteoraDlmmInitializePositionAutomation",
      "docs": [
        "Meteora DLMM Initialize Position"
      ],
      "discriminator": [
        240,
        162,
        112,
        99,
        105,
        118,
        30,
        255
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "lowerBinId",
          "type": "i32"
        },
        {
          "name": "width",
          "type": "i32"
        }
      ]
    },
    {
      "name": "meteoraDlmmLimitCloseAutomation",
      "docs": [
        "Meteora Limit Close Position"
      ],
      "discriminator": [
        250,
        111,
        129,
        110,
        248,
        232,
        87,
        161
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "ownerFeeX",
          "writable": true
        },
        {
          "name": "ownerFeeY",
          "writable": true
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
      "name": "meteoraDlmmOneSideDeposit",
      "discriminator": [
        201,
        244,
        26,
        124,
        31,
        89,
        214,
        54
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userToken",
          "writable": true
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
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
      "name": "meteoraDlmmRedepositAutomation",
      "docs": [
        "Meteora Open Position and Deposit (Part of rebalance automation)"
      ],
      "discriminator": [
        87,
        159,
        39,
        164,
        85,
        25,
        184,
        77
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true,
          "signer": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "userTokenX",
          "docs": [
            "Token X owned by User PDA"
          ],
          "writable": true
        },
        {
          "name": "userTokenY",
          "docs": [
            "Token Y owned by User PDA"
          ],
          "writable": true
        },
        {
          "name": "reserveX",
          "docs": [
            "Token X reserve"
          ],
          "writable": true
        },
        {
          "name": "reserveY",
          "docs": [
            "Token Y reserve"
          ],
          "writable": true
        },
        {
          "name": "tokenXMint",
          "docs": [
            "Token X Mint (to be validated by meteora lb_pair within their program)"
          ]
        },
        {
          "name": "tokenYMint",
          "docs": [
            "Token Y Mint (to be validated by meteora lb_pair within their program)"
          ]
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "docs": [
            "Meteora program"
          ],
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        }
      ],
      "args": [
        {
          "name": "relativeLowerBinId",
          "type": "u8"
        },
        {
          "name": "relativeUpperBinId",
          "type": "u8"
        },
        {
          "name": "strategyType",
          "type": "u8"
        },
        {
          "name": "checkRange",
          "type": {
            "option": {
              "array": [
                "i32",
                2
              ]
            }
          }
        }
      ]
    },
    {
      "name": "meteoraDlmmWithdrawAutomation",
      "docs": [
        "Meteora DLMM Withdraw IX Automation"
      ],
      "discriminator": [
        248,
        176,
        189,
        198,
        238,
        251,
        142,
        251
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "lbPair",
          "writable": true
        },
        {
          "name": "binArrayBitmapExtension",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
        },
        {
          "name": "userTokenX",
          "writable": true
        },
        {
          "name": "userTokenY",
          "writable": true
        },
        {
          "name": "reserveX",
          "writable": true
        },
        {
          "name": "reserveY",
          "writable": true
        },
        {
          "name": "tokenXMint"
        },
        {
          "name": "tokenYMint"
        },
        {
          "name": "binArrayLower",
          "writable": true
        },
        {
          "name": "binArrayUpper",
          "writable": true
        },
        {
          "name": "tokenXProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenYProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority"
        },
        {
          "name": "meteoraDlmmProgram",
          "address": "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
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
      "name": "moveToken",
      "docs": [
        "Move token owned by user pda to another token (STA --> ATA / ATA --> STA)"
      ],
      "discriminator": [
        2,
        146,
        18,
        62,
        142,
        99,
        91,
        200
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "hawksightAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "sourceToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "destination_token.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "destinationToken",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "source_token.mint",
                "account": "tokenAccount"
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "useSourceAmount",
          "type": "bool"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "orcaAutoClaimRewards",
      "docs": [
        "Orca claim rewards"
      ],
      "discriminator": [
        168,
        238,
        50,
        44,
        251,
        241,
        252,
        84
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ]
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ]
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoClosePosition",
      "docs": [
        "Orca whirlpool - Close position"
      ],
      "discriminator": [
        134,
        6,
        27,
        81,
        240,
        177,
        102,
        11
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoDeposit",
      "docs": [
        "Orca whirlpool deposit"
      ],
      "discriminator": [
        59,
        235,
        44,
        226,
        42,
        126,
        224,
        208
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaAutoOpenPosition",
      "docs": [
        "Orca whirlpool - Open position"
      ],
      "discriminator": [
        122,
        125,
        182,
        135,
        102,
        74,
        131,
        205
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorizedr5rvb dd by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
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
      "name": "orcaAutoWithdraw",
      "docs": [
        "Orca whirlpool withdraw"
      ],
      "discriminator": [
        213,
        189,
        60,
        133,
        218,
        101,
        148,
        90
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca claim rewards"
      ],
      "discriminator": [
        19,
        212,
        246,
        204,
        151,
        148,
        37,
        66
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ]
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ]
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaClosePosition",
      "docs": [
        "Orca whirlpool - Close position"
      ],
      "discriminator": [
        112,
        163,
        213,
        147,
        17,
        178,
        105,
        68
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompound",
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        189,
        179,
        117,
        17,
        195,
        111,
        129,
        254
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaCompoundFees",
      "docs": [
        "Orca compound fees instruction"
      ],
      "discriminator": [
        207,
        68,
        176,
        183,
        180,
        238,
        28,
        120
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca compound fees (swap on-chain calculation) instruction"
      ],
      "discriminator": [
        34,
        28,
        230,
        10,
        4,
        148,
        118,
        108
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "docs": [
        "Orca compound fees instruction"
      ],
      "discriminator": [
        31,
        245,
        98,
        188,
        186,
        32,
        95,
        16
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ]
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerUsdc",
          "docs": [
            "UserPDA's USDC account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "whirlpoolUsdc",
          "docs": [
            "Orca whirlpool account for swap into usdc"
          ],
          "writable": true
        },
        {
          "name": "rewardOwner",
          "docs": [
            "UserPDA's reward account"
          ],
          "writable": true
        },
        {
          "name": "rewardVault",
          "docs": [
            "Whirlpool's reward account"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Hawksight's fee reward account"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAUsdc",
          "writable": true
        },
        {
          "name": "tokenVaultBUsdc",
          "writable": true
        },
        {
          "name": "tickArray0Usdc",
          "writable": true
        },
        {
          "name": "tickArray1Usdc",
          "writable": true
        },
        {
          "name": "tickArray2Usdc",
          "writable": true
        },
        {
          "name": "oracleUsdc",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpoolUsdc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "whirlpoolPos",
          "docs": [
            "Orca whirlpool account for swap from usdc to the position token chosen"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAPos",
          "writable": true
        },
        {
          "name": "tokenVaultBPos",
          "writable": true
        },
        {
          "name": "tickArray0Pos",
          "writable": true
        },
        {
          "name": "tickArray1Pos",
          "writable": true
        },
        {
          "name": "tickArray2Pos",
          "writable": true
        },
        {
          "name": "oraclePos",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpoolPos"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
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
      "name": "orcaDeposit",
      "docs": [
        "Orca whirlpool deposit"
      ],
      "discriminator": [
        133,
        44,
        165,
        174,
        234,
        172,
        101,
        100
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "orcaOpenPosition",
      "docs": [
        "Orca whirlpool - Open position"
      ],
      "discriminator": [
        93,
        113,
        253,
        20,
        48,
        188,
        212,
        41
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized dd by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
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
      "name": "orcaRebalance",
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        149,
        70,
        92,
        141,
        98,
        146,
        20,
        64
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerSrc",
            "tickArrayUpperSrc",
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintSrc",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionSrc",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperSrc",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountSrc",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
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
      "docs": [
        "Orca compound instruction"
      ],
      "discriminator": [
        68,
        244,
        169,
        173,
        200,
        89,
        184,
        249
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerSrc",
            "tickArrayUpperSrc",
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintSrc",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionSrc",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerSrc",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperSrc",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountSrc",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintSrc"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner Fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner Fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "SPL System Program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "SPL Rent Sysvar"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
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
      "docs": [
        "Orca sweep dust instruction"
      ],
      "discriminator": [
        153,
        62,
        118,
        248,
        84,
        160,
        150,
        147
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "No need to be a signer since compound ix is always advantageous to the user, and can be delegated to a crank"
          ],
          "writable": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "rebalanceAuthority",
          "docs": [
            "Rebalancer which is hard coded to be a Hawksight rebalance wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLowerDst",
            "tickArrayUpperDst",
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "positionMintDst",
          "docs": [
            "Orca whirlpool position mint account"
          ]
        },
        {
          "name": "positionDst",
          "docs": [
            "Orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tickArrayLowerDst",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpperDst",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "positionTokenAccountDst",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMintDst"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Token Vault B"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "UserPDA's Token A"
          ],
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "UserPDA's Token B"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Tick arrays for swaps",
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "name": "orcaWithdraw",
      "docs": [
        "Orca whirlpool withdraw"
      ],
      "discriminator": [
        13,
        188,
        137,
        70,
        156,
        67,
        181,
        156
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda account authorized by user wallet"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "positionMint",
          "docs": [
            "Orca whirlpool position mint account (to be initialized)"
          ],
          "writable": true
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArrayLower",
            "tickArrayUpper"
          ]
        },
        {
          "name": "position",
          "docs": [
            "Orca whirlpool position (to be initialized)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "positionTokenAccount",
          "docs": [
            "NFT that represents orca whirlpool position"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "positionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountA",
          "docs": [
            "Token A to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_a.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenOwnerAccountB",
          "docs": [
            "Token B to deposit to liquidity"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userPda"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "token_vault_b.mint",
                "account": "tokenAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Token Vault A"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "docs": [
            "Orca tick array lower account"
          ],
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "docs": [
            "Orca tick array upper account"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeA",
          "docs": [
            "Owner fee A"
          ],
          "writable": true
        },
        {
          "name": "ownerFeeB",
          "docs": [
            "Owner fee B"
          ],
          "writable": true
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "SPL ATA Program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
      "name": "saberCompound1",
      "docs": [
        "Saber compound #1"
      ],
      "discriminator": [
        142,
        228,
        97,
        31,
        51,
        153,
        60,
        151
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "mintWrapper",
          "docs": [
            "Mint wrapper account",
            "* Basic program ownership check",
            "* rewarder.mint_wrapper (checked via has_one constraint in rewarder)"
          ],
          "writable": true
        },
        {
          "name": "minter",
          "docs": [
            "Minter account",
            "* Basic program ownership check",
            "* Seed validation"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  105,
                  110,
                  116,
                  87,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                  77,
                  105,
                  110,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mintWrapper"
              },
              {
                "kind": "account",
                "path": "rewarder"
              }
            ],
            "program": {
              "kind": "account",
              "path": "mintWrapperProgram"
            }
          }
        },
        {
          "name": "rewardsTokenMint",
          "docs": [
            "Saber IOU Token"
          ],
          "writable": true,
          "address": "iouQcQBAiEXe6cKLS85zmZxUqaCqBdeHFpqKoSz615u"
        },
        {
          "name": "userpdaSbrIouToken",
          "docs": [
            "UserPDA Saber IOU Token"
          ],
          "writable": true
        },
        {
          "name": "claimFeeTokenAccount",
          "docs": [
            "Claim fee token account",
            "* Checked via has_one constraint (rewarder.mint_wrapper)"
          ],
          "writable": true
        },
        {
          "name": "rewarder",
          "docs": [
            "Rewarder account for this quarry (only used for validation)"
          ]
        },
        {
          "name": "quarry",
          "docs": [
            "Saber farm quarry account"
          ]
        },
        {
          "name": "miner",
          "docs": [
            "User's miner account relative on quarry saber farm"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  105,
                  110,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "quarry"
              },
              {
                "kind": "account",
                "path": "userPda"
              }
            ],
            "program": {
              "kind": "account",
              "path": "quarryMineProgram"
            }
          }
        },
        {
          "name": "saberFarmRewarder",
          "address": "rXhAofQCT7NN9TUqigyEAUzV1uLL4boeD8CRkNBSkYk"
        },
        {
          "name": "redeemer",
          "docs": [
            "Redeemer account",
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "CL9wkGFT3SZRRNa9dgaovuRV7jrVVigBUZ6DjcgySsCU"
        },
        {
          "name": "redemptionMint",
          "docs": [
            "Saber mint"
          ],
          "writable": true,
          "address": "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1"
        },
        {
          "name": "redemptionVault",
          "docs": [
            "Saber redemption vault"
          ],
          "writable": true,
          "address": "ESg7xPUBioCqK4QaSvuZkhuekagvKcx326wNo3U7kRWc"
        },
        {
          "name": "userpdaSbrToken",
          "writable": true
        },
        {
          "name": "mintProxyState",
          "docs": [
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "9qRjwMQYrkd5JvsENaYYxSCgwEuVhK4qAo5kCFHSmdmL"
        },
        {
          "name": "proxyMintAuthority",
          "docs": [
            "* Basic program ownership check"
          ],
          "address": "GyktbGXbH9kvxP8RGfWsnFtuRgC7QCQo2WBqpo3ryk7L"
        },
        {
          "name": "minterInfo",
          "docs": [
            "Minter info",
            "* Basic program ownership check"
          ],
          "writable": true,
          "address": "GNSuMDSnUP9oK4HRtCi41zAbUzEqeLK1QPoby6dLVD9v"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca Saber/USDC Whirlpool"
          ],
          "writable": true,
          "address": "HXPD3Y4PCkvBNC3NKUa5YDQkTuusfWxhXs5Qe5VP1p2X",
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "orcaSbrVault",
          "docs": [
            "Orca Saber/USDC SBR Token Vault"
          ],
          "writable": true
        },
        {
          "name": "orcaUsdcVault",
          "docs": [
            "Orca Saber/USDC USDC Token Vault"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "address": "EJwCYGGNzaZfUBKKDZM2opBsBFWsNx5CmxnCe81ULnQT"
        },
        {
          "name": "userpdaUsdcToken",
          "docs": [
            "UserPDA Passthrough USDC Token account (will come from sbr/usdc orca swap)"
          ],
          "writable": true
        },
        {
          "name": "ownerFee",
          "docs": [
            "Owner fee"
          ],
          "writable": true
        },
        {
          "name": "mintWrapperProgram",
          "docs": [
            "Quarry mint wrapper program"
          ],
          "address": "QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV"
        },
        {
          "name": "quarryMineProgram",
          "docs": [
            "Quarry mine program"
          ],
          "address": "QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB"
        },
        {
          "name": "saberRedeemerProgram",
          "docs": [
            "Saber Redeemer program"
          ],
          "address": "RDM23yr8pr1kEAmhnFpaabPny6C9UVcEcok3Py5v86X"
        },
        {
          "name": "saberMintProxyProgram",
          "docs": [
            "Saber Mint proxy program"
          ],
          "address": "UBEBk5idELqykEEaycYtQ7iBVrCg6NmvFSzMpdr22mL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "saberSwapProgram",
          "docs": [
            "Saber swap program"
          ],
          "address": "SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ"
        }
      ],
      "args": []
    },
    {
      "name": "saberCompoundUsdc2",
      "docs": [
        "Saber compound #2 (for usdc)"
      ],
      "discriminator": [
        53,
        71,
        164,
        0,
        38,
        244,
        50,
        230
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet",
            "* No need to check"
          ],
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "inputAReserve",
          "docs": [
            "Saber Reserve A"
          ],
          "writable": true
        },
        {
          "name": "inputBReserve",
          "docs": [
            "Saber Reserve B (USDC or SOL mint)"
          ],
          "writable": true
        },
        {
          "name": "otherUserToken",
          "docs": [
            "UserPDA-owned other token (just empty but valid token account)",
            "This token account is mint A or B, and not equal to userpda_usdc_token or userpda_wsol_token"
          ],
          "writable": true
        },
        {
          "name": "userpdaUsdcToken",
          "docs": [
            "UserPDA Passthrough USDC Token account (will come from sbr/usdc orca swap)"
          ],
          "writable": true
        },
        {
          "name": "saberSwapAuthority",
          "docs": [
            "Saber Swap Authority"
          ]
        },
        {
          "name": "swapAmmId",
          "docs": [
            "Saber Swap AMM ID",
            "* Basic ownership check"
          ]
        },
        {
          "name": "saberPoolMint",
          "docs": [
            "Saber Pool Mint"
          ],
          "writable": true
        },
        {
          "name": "userpdaLpToken",
          "docs": [
            "UserPDA LP Token Account"
          ],
          "writable": true
        },
        {
          "name": "quarry",
          "docs": [
            "Saber farm quarry account"
          ],
          "writable": true
        },
        {
          "name": "miner",
          "docs": [
            "User's miner account relative on quarry saber farm",
            "* Basic program ownership check",
            "NOTE: seed check using macro not possible because we moved quarry_mine_program into remaining_accounts"
          ]
        },
        {
          "name": "minerVault",
          "docs": [
            "User's miner vault account, owned by the `miner` account"
          ],
          "writable": true
        },
        {
          "name": "saberFarmRewarder",
          "address": "rXhAofQCT7NN9TUqigyEAUzV1uLL4boeD8CRkNBSkYk"
        },
        {
          "name": "wrapper",
          "docs": [
            "Wrapper account."
          ],
          "address": "AnKLLfpMcceM6YXtJ9nGxYekVXqfWy8WNsMZXoQTCVQk"
        },
        {
          "name": "wrapperMint",
          "docs": [
            "Mint of the wrapper."
          ],
          "writable": true,
          "address": "JEFFSQ3s8T3wKsvp4tnRAsUBW7Cqgnf8ukBZC4C8XBm1"
        },
        {
          "name": "wrapperUnderlyingTokens",
          "docs": [
            "Wrapper's token account containing the underlying tokens."
          ],
          "writable": true,
          "address": "77XHXCWYQ76E9Q3uCuz1geTaxsqJZf9RfX5ZY7yyLDYt"
        }
      ],
      "args": []
    },
    {
      "name": "swapOrca",
      "docs": [
        "Perform orca swap"
      ],
      "discriminator": [
        40,
        245,
        11,
        107,
        43,
        203,
        151,
        127
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "source",
          "docs": [
            "Source token to be swapped"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Orca token vault A"
          ],
          "writable": true
        },
        {
          "name": "destination",
          "docs": [
            "Token to be received from given source (destination)"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Orca token vault b"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account",
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program account"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "swapPartialOrca",
      "docs": [
        "Perform orca swap (partial swap)"
      ],
      "discriminator": [
        161,
        5,
        126,
        95,
        180,
        159,
        166,
        27
      ],
      "accounts": [
        {
          "name": "farm",
          "docs": [
            "Hawksight multi-index farm"
          ]
        },
        {
          "name": "userPda",
          "docs": [
            "Hawksight user pda"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  45,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "farm"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ],
            "program": {
              "kind": "account",
              "path": "iyfProgram"
            }
          }
        },
        {
          "name": "authority",
          "docs": [
            "User wallet"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "userPda"
          ]
        },
        {
          "name": "iyfProgram",
          "docs": [
            "Main index yield farming program"
          ],
          "address": "FqGg2Y1FNxMiGd51Q6UETixQWkF5fB92MysbYogRJb3P"
        },
        {
          "name": "whirlpool",
          "docs": [
            "Orca whirlpool account"
          ],
          "writable": true,
          "relations": [
            "tickArray0",
            "tickArray1",
            "tickArray2"
          ]
        },
        {
          "name": "source",
          "docs": [
            "Source token to be swapped"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "docs": [
            "Orca token vault A"
          ],
          "writable": true
        },
        {
          "name": "destination",
          "docs": [
            "Token to be received from given source (destination)"
          ],
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "docs": [
            "Orca token vault b"
          ],
          "writable": true
        },
        {
          "name": "tickArray0",
          "docs": [
            "Orca tick array 0 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray1",
          "docs": [
            "Orca tick array 1 account"
          ],
          "writable": true
        },
        {
          "name": "tickArray2",
          "docs": [
            "Orca tick array 2 account"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "Oracle account",
            "Oracle is currently unused and will be enabled on subsequent updates"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "whirlpool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "orcaWhirlpoolProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token Program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "orcaWhirlpoolProgram",
          "docs": [
            "Orca whirlpool program"
          ],
          "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program account"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amountPctBps",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "farmAccountMulti",
      "discriminator": [
        106,
        215,
        38,
        140,
        164,
        236,
        159,
        54
      ]
    },
    {
      "name": "position",
      "discriminator": [
        170,
        188,
        143,
        228,
        122,
        64,
        247,
        208
      ]
    },
    {
      "name": "tickArray",
      "discriminator": [
        69,
        97,
        189,
        190,
        110,
        7,
        66,
        187
      ]
    },
    {
      "name": "userAccountMulti",
      "discriminator": [
        144,
        17,
        242,
        7,
        19,
        107,
        173,
        118
      ]
    },
    {
      "name": "whirlpool",
      "discriminator": [
        63,
        149,
        209,
        12,
        225,
        128,
        99,
        9
      ]
    }
  ],
  "types": [
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
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stableMint",
            "type": "pubkey"
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
                "defined": {
                  "name": "farmAssetInfo"
                }
              }
            }
          },
          {
            "name": "rewardInfos",
            "type": {
              "vec": {
                "defined": {
                  "name": "farmRewardInfo"
                }
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
      "name": "farmAssetInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weight",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "farmRewardInfo",
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
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "positionMint",
            "type": "pubkey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "feeGrowthCheckpointA",
            "type": "u128"
          },
          {
            "name": "feeOwedA",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointB",
            "type": "u128"
          },
          {
            "name": "feeOwedB",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "positionRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "positionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tick",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "liquidityNet",
            "type": "i128"
          },
          {
            "name": "liquidityGross",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideA",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideB",
            "type": "u128"
          },
          {
            "name": "rewardGrowthsOutside",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tickArray",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTickIndex",
            "type": "i32"
          },
          {
            "name": "ticks",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tick"
                  }
                },
                88
              ]
            }
          },
          {
            "name": "whirlpool",
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farm",
            "type": "pubkey"
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
                "pubkey",
                10
              ]
            }
          },
          {
            "name": "assetInfo",
            "type": {
              "defined": {
                "name": "userAssetInfo"
              }
            }
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "userAccountMultiPadding"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userAccountMultiPadding",
      "type": {
        "kind": "struct",
        "fields": [
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
    },
    {
      "name": "userAssetInfo",
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
      "name": "whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "whirlpoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tickSpacingSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "protocolFeeRate",
            "type": "u16"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
          },
          {
            "name": "protocolFeeOwedA",
            "type": "u64"
          },
          {
            "name": "protocolFeeOwedB",
            "type": "u64"
          },
          {
            "name": "tokenMintA",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultA",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalA",
            "type": "u128"
          },
          {
            "name": "tokenMintB",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultB",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalB",
            "type": "u128"
          },
          {
            "name": "rewardLastUpdatedTimestamp",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "whirlpoolRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "whirlpoolRewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards at the `Whirlpool` level.",
        "These values are used in conjunction with `PositionRewardInfo`, `Tick.reward_growths_outside`,",
        "and `Whirlpool.reward_last_updated_timestamp` to determine how many rewards are earned by open",
        "positions."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "pubkey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "pubkey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority account that has permission to initialize the reward and set emissions."
            ],
            "type": "pubkey"
          },
          {
            "name": "emissionsPerSecondX64",
            "docs": [
              "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
            ],
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "docs": [
              "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
              "emissions were turned on."
            ],
            "type": "u128"
          }
        ]
      }
    }
  ]
};
