import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { IDL as _IyfMain, IndexYieldFarming } from "./idl/iyf-main-idl";
import { IDL as _IyfExtension, IyfExtension } from "./idl/iyf-extension-idl";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  IYF_EXTENSION,
  IYF_MAIN,
  ORCA_WHIRLPOOL_PROGRAM
} from "./addresses";
// import { WhirlpoolContext } from "@orca-so/whirlpools-sdk";

export class Anchor {

  private static _instance: Anchor;
  provider: anchor.AnchorProvider;
  iyfMain: anchor.Program<IndexYieldFarming>;
  iyfExtension: anchor.Program<IyfExtension>;
  // whirlpoolCtx: 
  
  private constructor(
    public connection: web3.Connection,
  ) {
    this.provider = new anchor.AnchorProvider(connection, new NodeWallet(web3.Keypair.generate()), {});
    this.iyfMain = new anchor.Program(_IyfMain, IYF_MAIN, this.provider);
    this.iyfExtension =  new anchor.Program(_IyfExtension, IYF_EXTENSION, this.provider);
    // this.whirlpoolCtx = WhirlpoolContext.withProvider(this.provider, ORCA_WHIRLPOOL_PROGRAM);
  }

  static initialize(connection: web3.Connection) {
    Anchor._instance = new Anchor(connection);
  }

  static instance(): Anchor {
    if (Anchor._instance === undefined) {
      throw new Error(`Initialize first using initialize() method`);
    } else {
      return Anchor._instance;
    }
  }
}
