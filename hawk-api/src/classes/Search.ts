import { SearchIndices, Token } from "../types";
import axios from 'axios';

export class Search {

  private tokenIndices?: SearchIndices;
  private tokens?: Token[];
  private _loaded: boolean = false;

  /**
   * Checks if the token indices and tokens have been loaded.
   *
   * @returns {boolean} True if the token indices and tokens have been loaded, false otherwise.
   */
  get loaded(): boolean { return this._loaded }

  /**
   * Constructs a new instance of the Search class.
   *
   * @param {string} url - The base URL for the API.
   */
  constructor(
    protected readonly url: string,
  ) {}

  /**
   * Retrieves tokens that match the given keyword.
   *
   * This method searches for tokens that match the provided keyword.
   * If the token indices or tokens are not yet loaded, it logs a warning and returns an empty array.
   *
   * @param {string} keyword - The keyword to search for.
   * @param {number} limit - Number of results to show.
   * @param {boolean} noLimit - disable limit
   * @returns {Token[]} An array of tokens that match the given keyword.
   */
  token(keyword: string, limit: number = 100, noLimit: boolean = false): Token[] {
    const result = [];
    keyword = keyword.trim();
    if (this.tokenIndices === undefined || this.tokens === undefined) {
      console.warn("Token list still loading...");
      return [];
    }
    const indices = this.tokenIndices.indices[keyword.toLowerCase()];
    let count = 0;
    for (const index in indices) {
      count++;
      result.push(this.tokens[index]);
      if (!noLimit && count >= limit) break;
    }
    return result;
  }

  /**
   * Loads the token indices and tokens.
   *
   * This method loads the token indices and tokens if they are not already loaded.
   * It also sets up a periodic update to refresh the token indices and tokens every minute.
   *
   * @returns {Promise<void>} A promise that resolves when the initial load is complete.
   */
  async load(): Promise<void> {
    if (!this.loaded) {
      this._loaded = true;
      const update = async () => {
        await this.getTokenIndices();
        setTimeout(update, 5 * 1000);
      };
      await update();
    }
  }

  /**
   * Retrieves and updates the token indices and tokens if necessary.
   *
   * This method checks if the current token indices and tokens are undefined.
   * If they are, it fetches the token indices and tokens from the API.
   * It then compares the hash of the current token indices with the hash from the server.
   * If the hashes do not match, it updates the token indices and tokens.
   *
   * @private
   * @returns {Promise<void>} A promise that resolves when the token indices and tokens are updated.
   */
  private async getTokenIndices(): Promise<void> {
    if (this.tokenIndices === undefined) {
      this.tokenIndices = await this.getSearchIndices('tokens');
    }
    if (this.tokens === undefined) {
      this.tokens = await this.getAllTokens();
    }
    const tokenIndices = await this.getSearchIndices('tokens', this.tokenIndices.hash);

    // If hash doesn't match, it means there's a new token.
    if (tokenIndices.hash !== this.tokenIndices.hash) {
      this.tokenIndices = await this.getSearchIndices('tokens');
      this.tokens = await this.getAllTokens();
    }
  }

  /**
   * Retrieves all tokens from the API.
   *
   * This method makes a GET request to the API to fetch all tokens.
   *
   * @private
   * @returns {Promise<Token[]>} A promise that resolves to an array of tokens.
   */
  private async getAllTokens(): Promise<Token[]> {
    return (await axios.get<Token[]>(`${this.url}/tokens?all=true`)).data;
  }

  /**
   * Retrieves the search indices from the API based on the provided key and optional hash.
   *
   * This method makes a GET request to the API to fetch the search indices for the specified key.
   * If a hash is provided, it includes the hash in the request to check for updated indices.
   *
   * @private
   * @param {string} key - The key to identify the search indices.
   * @param {string} [hash] - Optional hash to validate against the current hash of the indices.
   * @returns {Promise<SearchIndices>} A promise that resolves to the search indices for the specified key.
   */
  private async getSearchIndices(key: string, hash?: string): Promise<SearchIndices> {
    if (hash !== undefined) {
      return (await axios.get<SearchIndices>(`${this.url}/searchIndices?key=${key}&hash=${hash}`)).data;
    } else {
      return (await axios.get<SearchIndices>(`${this.url}/searchIndices?key=${key}`)).data;
    }
  }
}
