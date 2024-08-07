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
 * @interface InlineResponse2001DataItems
 */
export interface InlineResponse2001DataItems {

    /**
     * The contract address.
     *
     * @type {string}
     * @memberof InlineResponse2001DataItems
     */
    address?: string;

    /**
     * The highest price.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    h?: number;

    /**
     * The opening price.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    o?: number;

    /**
     * The lowest price.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    l?: number;

    /**
     * The closing price.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    c?: number;

    /**
     * The frequency type.
     *
     * @type {string}
     * @memberof InlineResponse2001DataItems
     */
    type?: string;

    /**
     * The volume.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    v?: number;

    /**
     * The timestamp in Unix time.
     *
     * @type {number}
     * @memberof InlineResponse2001DataItems
     */
    unixTime?: number;
}
