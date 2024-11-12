import { IyfExtensionIxGenerator } from "../ixGenerator/IyfExtensionIxGenerator";
import { IyfMainIxGenerator } from "../ixGenerator/IyfMainIxGenerator";
import { MeteoraDlmmIxGenerator } from "../ixGenerator/MeteoraDlmmIxGenerator";

/**
 * The SimpleIxGenerator class is a general-purpose utility for generating single
 * transaction instructions for simple tasks on the Solana blockchain. It offers
 * methods to set and verify transaction slots within an atomicity context, specifically
 * interacting with the user's PDA (Program Derived Address) account.
 */
export class SimpleIxGenerator {

  /**
   * IYF Main Instruction Generator
   */
  public iyfMain: IyfMainIxGenerator = new IyfMainIxGenerator();

  /**
   * IYF Main Instruction Generator
   */
  public iyfExtension: IyfExtensionIxGenerator = new IyfExtensionIxGenerator(this.iyfMain);

  /**
   * Meteora Ix Generator
   */
  public meteoraDlmm: MeteoraDlmmIxGenerator = new MeteoraDlmmIxGenerator(this.iyfMain);
}
