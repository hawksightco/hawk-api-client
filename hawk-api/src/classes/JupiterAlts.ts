import * as web3 from "@solana/web3.js";

export type Alts = Record<string, string>;

export class JupiterAlts {
  private username?: string;
  private password?: string;
  private hash?: string;
  private url?: string;
  private _alts: Alts = {};

  /**
   * Return jupiter alts object
   */
  get alts(): Alts {
    return this._alts;
  }

  /**
   * Set API URL
   */
  setApiUrl(url: string) {
    this.url = url;
  }

  /**
   * Find address lookup table from given public keys
   *
   * @param pubkeys
   */
  findAltByPubkeys(pubkeys: web3.PublicKey[]): web3.PublicKey[] {
    const alts: web3.PublicKey[] = [];
    for (const pubkey of pubkeys) {
      const alt = this._alts[pubkey.toBase58()];
      if (alt !== undefined) {
        alts.push(new web3.PublicKey(alt));
      }
    }
    return alts;
  }

  /**
   * Set server credentials
   *
   * @param username
   * @param password
   */
  setCredentials(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  /**
   * Download jupiter alts from endpoint
   *
   * @returns
   */
  async downloadAlts() {
    const base64Credentials = btoa(`${this.username!}:${this.password!}`);
    const hash = await (await fetch(this.url!, { headers: { Authorization: `Basic ${base64Credentials}`, Range: 'bytes=9-72'} })).text();

    // If hash matches, then no need to download the file.
    if (this.hash === hash) return;

    // Otherwise, download the alts
    const response = await fetch(this.url!, { headers: { Authorization: `Basic ${base64Credentials}`} });
    const content = await response.text();
    const jsonString = content.slice(82, content.length - 1);
    this._alts = JSON.parse(jsonString);
  }
}