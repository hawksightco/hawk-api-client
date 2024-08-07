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
 * @interface TxInitializeBinArraysBody
 */
export interface TxInitializeBinArraysBody {

    /**
     * Meteora pool address
     *
     * @type {string}
     * @memberof TxInitializeBinArraysBody
     */
    pool?: string;

    /**
     * User's wallet who's gonna pay for bini initialization
     *
     * @type {string}
     * @memberof TxInitializeBinArraysBody
     */
    userWallet?: string;

    /**
     * Lower bin id
     *
     * @type {number}
     * @memberof TxInitializeBinArraysBody
     */
    minBinId?: number;

    /**
     * Upper bin id
     *
     * @type {number}
     * @memberof TxInitializeBinArraysBody
     */
    maxBinId?: number;
}
