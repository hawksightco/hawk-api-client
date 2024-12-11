import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { IDL as _IyfMain, IndexYieldFarming } from "./idl/iyf-main-idl";
import { IDL as _IyfExtension, IyfExtension as IyfExtensionNew } from "./idl/iyf-extension-idl";
import { IDL as _Whirlpool, Whirlpool } from "./idl/orca-idl";
import { IDL as _LbClmm, LbClmm } from "./idl/meteora-idl";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  IYF_EXTENSION,
  IYF_MAIN,
  METEORA_DLMM_PROGRAM,
  ORCA_WHIRLPOOL_PROGRAM
} from "./addresses";

type IdlInstruction = {
    name: string;
    docs?: string[];
    accounts: IdlAccountItem[];
    args: IdlField[];
    returns?: IdlType;
};
type IdlAccountItem = IdlAccount | IdlAccounts;
type IdlAccount = {
    name: string;
    isMut: boolean;
    isSigner: boolean;
    isOptional?: boolean;
    docs?: string[];
    relations?: string[];
    pda?: IdlPda;
};
type IdlPda = {
    seeds: IdlSeed[];
    programId?: IdlSeed;
};
type IdlSeed = any;
type IdlAccounts = {
    name: string;
    docs?: string[];
    accounts: IdlAccountItem[];
};
type IdlField = {
    name: string;
    docs?: string[];
    type: IdlType;
};
type IdlType = "bool" | "u8" | "i8" | "u16" | "i16" | "u32" | "i32" | "f32" | "u64" | "i64" | "f64" | "u128" | "i128" | "u256" | "i256" | "bytes" | "string" | "publicKey" | IdlTypeDefined | IdlTypeOption | IdlTypeCOption | IdlTypeVec | IdlTypeArray;
type IdlTypeDefined = {
    defined: string;
};
type IdlTypeOption = {
    option: IdlType;
};
type IdlTypeCOption = {
    coption: IdlType;
};
type IdlTypeVec = {
    vec: IdlType;
};
type IdlTypeArray = {
    array: [idlType: IdlType, size: number];
};
type IdlAccountDef = {
  name: string;
  docs?: string[];
  type: IdlTypeDefTyStruct;
};
type IdlTypeDefTyStruct = {
  kind: "struct";
  fields: IdlTypeDefStruct;
};
type IdlTypeDefStruct = Array<IdlField>;
type IdlTypeDef = {
  name: string;
  docs?: string[];
  type: IdlTypeDefTy;
};
type IdlTypeDefTy = IdlTypeDefTyEnum | IdlTypeDefTyStruct | IdlTypeDefTyAlias;
type IdlTypeDefTyEnum = {
  kind: "enum";
  variants: IdlEnumVariant[];
};
type IdlEnumVariant = {
  name: string;
  fields?: IdlEnumFields;
};
type IdlTypeDefTyAlias = {
  kind: "alias";
  value: IdlType;
};
type IdlEnumFields = IdlEnumFieldsNamed | IdlEnumFieldsTuple;
type IdlEnumFieldsNamed = IdlField[];
type IdlEnumFieldsTuple = IdlType[];

type Instruction<I extends number> = {
  name: IyfExtensionNew["instructions"][I]["name"];
  accounts: IyfExtensionNew["instructions"][I]["accounts"];
  args: IyfExtensionNew["instructions"][I]["args"];
} & IdlInstruction;

type GenerateInstructions<T extends any[], I extends number[] = []> =
  I["length"] extends T["length"]
    ? []
    : [
        Instruction<I["length"]>,
        ...GenerateInstructions<T, [...I, I["length"]]>
      ];

type FilteredInstructions = GenerateInstructions<IyfExtensionNew["instructions"]>;

type FindMatchingType<Name, Types extends any[]> = Types extends Array<infer T>
  ? T extends { name: Name; type: infer Type }
    ? Type
    : never
  : never;

type Account<I extends number> = {
  name: unknown extends IyfExtensionNew["accounts"][I]["name"] ? never : IyfExtensionNew["accounts"][I]["name"];
  type: unknown extends IyfExtensionNew["accounts"][I]["name"] ? never : FindMatchingType<IyfExtensionNew["accounts"][I]["name"], IyfExtensionNew["types"]>;
} & IdlAccountDef;

type GenerateAccounts<T extends any[], I extends number[] = []> =
  I["length"] extends T["length"]
    ? []
    : [
        Account<I["length"]>,
        ...GenerateAccounts<T, [...I, I["length"]]>
      ];

type FilteredAccounts = GenerateAccounts<IyfExtensionNew["accounts"]>;

export type IyfExtension = {
  "version": string,
  "name": string,
  "instructions": FilteredInstructions,
  "accounts": FilteredAccounts,
  "types": IyfExtensionNew["types"] & Array<IdlTypeDef>,
};

export class Anchor {

  private static _instance: Anchor;
  provider: anchor.AnchorProvider;
  iyfMain: anchor.Program<IndexYieldFarming>;
  iyfExtension: anchor.Program<IyfExtension>;
  orcaProgram: anchor.Program<Whirlpool>;
  meteoraProgram: anchor.Program<LbClmm>;

  private constructor(
    public connection: web3.Connection,
  ) {
    this.provider = new anchor.AnchorProvider(connection, new NodeWallet(web3.Keypair.generate()), {});
    this.iyfMain = new anchor.Program(_IyfMain, IYF_MAIN, this.provider);
    const p = _IyfExtension.instructions.map(instruction => {
      return {
        name: instruction.name,
        accounts: [instruction.accounts.map(account => {
          return {
            name: account.name,
            isMut: "writable" in account ? account.writable : false,
            isSigner: "signer" in account ? account.signer : false,
          }
        })],
        args: instruction.args,
      }
    });
    const IyfExtension: IyfExtension  = {
      version: _IyfExtension.metadata.version,
      name: _IyfExtension.metadata.name,
      instructions: _IyfExtension.instructions.map((instruction, index) => {
        return {
          name: instruction.name,
          accounts: instruction.accounts.map(account => {
            return {
              name: account.name,
              isMut: "writable" in account ? account.writable : false,
              isSigner: "signer" in account ? account.signer : false,
            }
          }),
          args: instruction.args,
        }
      }),
    } as IyfExtension;
    this.iyfExtension =  new anchor.Program(IyfExtension, IYF_EXTENSION, this.provider);
    this.orcaProgram = new anchor.Program(_Whirlpool, ORCA_WHIRLPOOL_PROGRAM, this.provider);
    this.meteoraProgram = new anchor.Program(_LbClmm, METEORA_DLMM_PROGRAM, this.provider);
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
