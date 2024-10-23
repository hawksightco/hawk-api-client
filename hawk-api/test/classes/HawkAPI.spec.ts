import * as web3 from "@solana/web3.js";
import { HawkAPI } from "../../src";

describe('HawkAPI Unit Test', () => {
  it('Be able to create new instance of hawk api without error', async () => {
    new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true });
  });

  it('Be able to call batchExecute method without any error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
    new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true }).batchExecute({
      lookupTableAddresses: [],
      instructions: [],
      payer: web3.Keypair.generate(),
      connection,
      signers: [web3.Keypair.generate()],
    });
  });

  it('Be able to call atomicity method without any error', async () => {
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
    new HawkAPI('https://api2.hawksight.co', { disableTokenLoad: true, disableTxMetadataLoad: true }).atomicity({
      lookupTableAddresses: [],
      instructions: [],
      payer: web3.Keypair.generate(),
      connection,
      signers: [web3.Keypair.generate()],
    });
  });
});