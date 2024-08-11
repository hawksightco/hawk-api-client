import * as web3 from "@solana/web3.js";
import BN from "bn.js";
import { Anchor } from "./anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM,
  SITE_FEE_OWNER,
  TOKEN_PROGRAM_ID,
  USDC_FARM,
} from "./addresses";
import * as util from "./functions";

export async function depositMultipleToken(params: {
  payer: web3.PublicKey;
  deposit: {
    mint: web3.PublicKey;
    amount: BN;
  }[];
}) {
  const farm = USDC_FARM;
  const userPda = util.generateUserPda(params.payer, farm);
  const amounts = params.deposit.map((d) => d.amount);
  const remainingAccounts: web3.AccountMeta[] = [];
  params.deposit.map((d) => {
    const mint = d.mint;
    const userToken = util.generateAta(params.payer, d.mint);
    const userPdaToken = util.generateAta(userPda, d.mint);
    const ownerFeeToken = util.generateAta(SITE_FEE_OWNER, d.mint);
    remainingAccounts.push({ pubkey: mint, isSigner: false, isWritable: true });
    remainingAccounts.push({
      pubkey: userToken,
      isSigner: false,
      isWritable: true,
    });
    remainingAccounts.push({
      pubkey: userPdaToken,
      isSigner: false,
      isWritable: true,
    });
    remainingAccounts.push({
      pubkey: ownerFeeToken,
      isSigner: false,
      isWritable: true,
    });
  });
  const ix = await Anchor.instance().iyfMain.methods
    .depositMultipleToken(amounts)
    .accounts({
      farm,
      userPda,
      payer: params.payer,
      hsFeeOwner: SITE_FEE_OWNER,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
    })
    .remainingAccounts(remainingAccounts)
    .instruction();
  return ix;
}

export async function withdrawMultipleToken(params: {
  payer: web3.PublicKey;
  withdraw: {
    mint: web3.PublicKey;
  }[];
}) {
  const farm = USDC_FARM;
  const userPda = util.generateUserPda(params.payer, farm);
  const remainingAccounts: web3.AccountMeta[] = [];
  params.withdraw.map((d) => {
    const mint = d.mint;
    const userToken = util.generateAta(params.payer, d.mint);
    const userPdaToken = util.generateAta(userPda, d.mint);
    const ownerFeeToken = util.generateAta(SITE_FEE_OWNER, d.mint);
    remainingAccounts.push({ pubkey: mint, isSigner: false, isWritable: true });
    remainingAccounts.push({
      pubkey: userToken,
      isSigner: false,
      isWritable: true,
    });
    remainingAccounts.push({
      pubkey: userPdaToken,
      isSigner: false,
      isWritable: true,
    });
    remainingAccounts.push({
      pubkey: ownerFeeToken,
      isSigner: false,
      isWritable: true,
    });
  });
  const ix = await Anchor.instance().iyfMain.methods
    .withdrawMultipleToken()
    .accounts({
      farm,
      userPda,
      payer: params.payer,
      hsFeeOwner: SITE_FEE_OWNER,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
    })
    .remainingAccounts(remainingAccounts)
    .instruction();
  return ix;
}
