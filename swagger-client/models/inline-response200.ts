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
     * Status of different services
     *
     * @type {{ [key: string]: string; }}
     * @memberof InlineResponse200
     */
    services?: { [key: string]: string; };
}

/**
 * @export
 * @enum {string}
 */
export enum InlineResponse200ServicesEnum {
    OK = 'OK',
    NotOK = 'Not OK'
}
