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
 * @interface TxWithdrawBody1
 */
export interface TxWithdrawBody1 {

    /**
     * Transaction priority (Default, Low, Medium, High, VeryHigh, UnsafeMax, None)
     *
     * @type {string}
     * @memberof TxWithdrawBody1
     */
    priority?: string;

    /**
     * Max lamports to consume for priority fee
     *
     * @type {number}
     * @memberof TxWithdrawBody1
     */
    maxPriorityFee?: number;

    /**
     * User's wallet address who owns the position
     *
     * @type {string}
     * @memberof TxWithdrawBody1
     */
    userWallet?: string;

    /**
     * User generated random keypair that serve as orca position NFT mint
     *
     * @type {string}
     * @memberof TxWithdrawBody1
     */
    positionMint?: string;

    /**
     * Liquidity amount to be withdrawn
     *
     * @type {number}
     * @memberof TxWithdrawBody1
     */
    liquidityAmount?: number;
}