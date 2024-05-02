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
 * @interface InlineResponse2004Accounts
 */
export interface InlineResponse2004Accounts {

    /**
     * Indicates if the account is a signer.
     *
     * @type {boolean}
     * @memberof InlineResponse2004Accounts
     */
    isSigner?: boolean;

    /**
     * Indicates if the account is writable.
     *
     * @type {boolean}
     * @memberof InlineResponse2004Accounts
     */
    isWritable?: boolean;

    /**
     * Public key of the account.
     *
     * @type {string}
     * @memberof InlineResponse2004Accounts
     */
    pubkey?: string;
}