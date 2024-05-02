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
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {

    /**
     * The wallet address of the user.
     *
     * @type {string}
     * @memberof InlineResponse2001
     */
    wallet?: string;

    /**
     * The associated Program Derived Address (PDA) of the user.
     *
     * @type {string}
     * @memberof InlineResponse2001
     */
    userPda?: string;

    /**
     * @type {{ [key: string]: Array<any>; }}
     * @memberof InlineResponse2001
     */
    pools?: { [key: string]: Array<any>; };
}