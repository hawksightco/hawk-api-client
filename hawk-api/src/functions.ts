import * as web3 from "@solana/web3.js";
import { ResponseWithStatus, TransactionMetadata, TransactionMetadataResponse } from "./types";

export async function createTxMetadata(connection: web3.Connection, payer: string, data: TransactionMetadataResponse): Promise<TransactionMetadata> {
  const alts: web3.AddressLookupTableAccount[] = [];
  for (const alt of data.addressLookupTableAddresses) {
    alts.push(
      (await connection.getAddressLookupTable(new web3.PublicKey(alt))).value as web3.AddressLookupTableAccount
    );
  }
  const computeIxs = data.computeBudgetInstructions.map(ix => {
    return new web3.TransactionInstruction({
      keys: ix.accounts.map(meta => {
        return { pubkey: new web3.PublicKey(meta.pubkey), isSigner: meta.isSigner, isWritable: meta.isWritable };
      }),
      programId: new web3.PublicKey(ix.programId),
      data: Buffer.from(ix.data, 'base64'),
    });
  });
  const mainIxs = data.computeBudgetInstructions.map(ix => {
    return new web3.TransactionInstruction({
      keys: ix.accounts.map(meta => {
        return { pubkey: new web3.PublicKey(meta.pubkey), isSigner: meta.isSigner, isWritable: meta.isWritable };
      }),
      programId: new web3.PublicKey(ix.programId),
      data: Buffer.from(ix.data, 'base64'),
    });
  });
  const { blockhash: recentBlockhash } = await connection.getLatestBlockhash();
  const txMessage = new web3.TransactionMessage({
    payerKey: new web3.PublicKey(payer),
    instructions: [...computeIxs, ...mainIxs],
    recentBlockhash,
  });
  const tx = new web3.VersionedTransaction(txMessage.compileToV0Message(alts));
  return {
    description: data.description,
    estimatedFeeInSOL: data.estimatedFeeInSOL,
    transaction: tx.serialize(),
  }
}

export async function resultOrError<Response, Out>(result: { status: number, data: Response }, successFn: (data: Response) => Promise<Out>): Promise<ResponseWithStatus<Out> | ResponseWithStatus<Response>> {
  if (result.status === 200) {
    return {
      status: result.status,
      data: await successFn(result.data),
    };
  } else {
    return {
      status: result.status,
      data: result.data,
    }
  }
}
