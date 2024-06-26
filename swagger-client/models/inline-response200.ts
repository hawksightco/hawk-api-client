/* tslint:disable */
/* eslint-disable */
/**
 * Hawksight API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {

    /**
     * The address of the token.
     *
     * @type {string}
     * @memberof InlineResponse200
     * @example EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
     */
    address?: string;

    /**
     * The name of the token.
     *
     * @type {string}
     * @memberof InlineResponse200
     * @example USD Coin
     */
    name?: string;

    /**
     * The symbol of the token.
     *
     * @type {string}
     * @memberof InlineResponse200
     * @example USDC
     */
    symbol?: string;

    /**
     * The number of decimal places for the token.
     *
     * @type {number}
     * @memberof InlineResponse200
     * @example 6
     */
    decimals?: number;

    /**
     * The URL of the token's logo.
     *
     * @type {string}
     * @memberof InlineResponse200
     * @example https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png
     */
    logo?: string;

    /**
     * Whether token is community verified or not
     *
     * @type {boolean}
     * @memberof InlineResponse200
     */
    verified?: boolean;
}
