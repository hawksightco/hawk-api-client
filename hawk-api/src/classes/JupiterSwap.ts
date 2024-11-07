import * as web3 from "@solana/web3.js";
import { SimpleIxGenerator } from "./SimpleIxGenerator";
import BN from "bn.js";
import { JupiterRouteIxReturn } from '../ixGenerator/IyfMainIxGenerator';

type JupiterIxToHawksight = {
  connection: web3.Connection,
  swapInstruction: web3.TransactionInstruction,
  quotedOutAmountOverride?: BN,
  slippageBpsOverride?: number,
  platformFeeBpsOverride?: number,
  checkDestinationTokenAccount?: boolean,
};

export class JupiterSwap {

  constructor(
    private ix: SimpleIxGenerator,
  ){}

  async jupiterIxToHawksight({connection, swapInstruction, quotedOutAmountOverride, slippageBpsOverride, platformFeeBpsOverride, checkDestinationTokenAccount}: JupiterIxToHawksight): Promise<JupiterRouteIxReturn> {
    return await this.ix.iyfMain.jupiterRouteIx({
      connection,
      userPda: swapInstruction.keys[1].pubkey,
      sourceTokenAccount: swapInstruction.keys[2].pubkey,
      destinationTokenAccount: swapInstruction.keys[3].pubkey,
      destinationMint: swapInstruction.keys[5].pubkey,
      platformFeeAccount: swapInstruction.keys[6].pubkey,
      eventAuthority: swapInstruction.keys[7].pubkey,
      remainingAccounts: swapInstruction.keys.slice(9),
      data: swapInstruction.data,
      quotedOutAmount: quotedOutAmountOverride,
      slippageBps: slippageBpsOverride,
      platformFeeBps: platformFeeBpsOverride,
      checkDestinationTokenAccount,
    });
  }
}
