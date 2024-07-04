import { SearchIndices, Token, LoadFromPersistenceFn, StoreToPersistenceFn } from "../types";
import axios from 'axios';

export class Search {

  private tokenIndices?: SearchIndices;
  private tokens?: Token[];
  private _loaded: boolean = false;
  private _loadedFromPersistence = false;
  private previousHash: string = '';
  private latestHash: string = '';
  disableFetch: boolean = false;

  private loadFromPersistenceFn?: LoadFromPersistenceFn;
  private storeToPersistenceFn?: StoreToPersistenceFn;

  /**
   * Set load persistence callback
   *
   * @param loadFromPersistenceFn
   */
  setLoadFromPersistenceFn(loadFromPersistenceFn: LoadFromPersistenceFn) {
    this.loadFromPersistenceFn = loadFromPersistenceFn;
  }

  /**
   * Set store to persistence callback
   *
   * @param storeToPersistenceFn
   */
  setStoreToPersistenceFn(storeToPersistenceFn: StoreToPersistenceFn) {
    this.storeToPersistenceFn = storeToPersistenceFn;
  }

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
      let firstRun = true;
      const update = async () => {
        if (this.disableFetch === false) {
          await this.getTokenIndices();
          setTimeout(update, 60 * 1000);
        }
      };
      const updateFromPersistence = async () => {
        if (this.disableFetch === false) {
          await this.loadFromPersistence();
          if (firstRun && this.loadFromPersistenceFn !== undefined) {
            await update();
            firstRun = false;
          }
          if (!!this.tokens && !!this.tokenIndices) {
            if (!!this.storeToPersistenceFn && this.tokens.length > 0 && this.previousHash !== this.latestHash) {
              await this.storeToPersistenceFn(this.tokenIndices, this.tokens);
            }
            setTimeout(async () => await updateFromPersistence(), 60 * 1000);
            return;
          }
          setTimeout(async () => await updateFromPersistence(), 1 * 1000);
        } else {
          await this.loadFromPersistence();
          if (typeof this.tokens === 'undefined' || this.tokens!.length === 0) {
            setTimeout(async () => await updateFromPersistence(), 1 * 10000);
            return;
          }
          setTimeout(async () => await updateFromPersistence(), 10 * 10000);
        }
      }
      await updateFromPersistence();
    }
  }

  /**
   * Load tokens and indices from persistence
   *
   * @param tokenIndices
   * @param tokens
   * @returns
   */
  private async loadFromPersistence() {
    if (this._loadedFromPersistence) return;
    if (this.loadFromPersistenceFn === undefined) return;
    const [tokenIndices, tokens] = await this.loadFromPersistenceFn();
    if (tokenIndices === undefined || tokens === undefined) return;
    this.tokenIndices = tokenIndices;
    this.tokens = tokens;
    this.latestHash = tokenIndices.hash;
    this._loadedFromPersistence = true;
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
    if (this.tokenIndices === undefined || this.latestHash === '') {
      this.tokenIndices = await this.getSearchIndices('tokens');
      this.tokens = await this.getAllTokens();
      this.previousHash = '';
      this.latestHash = this.tokenIndices.hash;
      return;
    }
    const tokenIndices = await this.getSearchIndices('tokens', this.tokenIndices.hash);
    this.previousHash = this.tokenIndices.hash;
    this.latestHash = tokenIndices.hash;

    // If hash doesn't match, it means there's a new token.
    if (tokenIndices.hash !== this.tokenIndices.hash) {
      this.tokenIndices = tokenIndices;
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
