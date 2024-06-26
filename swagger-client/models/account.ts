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
 * @interface Account
 */
export interface Account {

    /**
     * Indicates if the account is a signer.
     *
     * @type {boolean}
     * @memberof Account
     */
    isSigner?: boolean;

    /**
     * Indicates if the account is writable.
     *
     * @type {boolean}
     * @memberof Account
     */
    isWritable?: boolean;

    /**
     * Public key of the account.
     *
     * @type {string}
     * @memberof Account
     */
    pubkey?: string;
}
