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
 * @interface UtilActiveBinBody
 */
export interface UtilActiveBinBody {

    /**
     * Pools to search
     *
     * @type {Array<string>}
     * @memberof UtilActiveBinBody
     */
    pools?: Array<string>;

    /**
     * Commitment level (processed, confirmed, finalized)
     *
     * @type {string}
     * @memberof UtilActiveBinBody
     */
    commitment?: string;
}
