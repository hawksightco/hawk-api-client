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

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { InlineResponse2004 } from '../models';
import { InlineResponse4001 } from '../models';
import { TxClaimRewardsBody } from '../models';
import { TxClosePositionBody1 } from '../models';
import { TxDepositBody1 } from '../models';
import { TxOpenPositionBody } from '../models';
import { TxWithdrawBody1 } from '../models';
/**
 * OrcaCLMMInstructionsApi - axios parameter creator
 * @export
 */
export const OrcaCLMMInstructionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Return solana instructions that claims reward to Orca position via Hawksight.
         * @param {TxClaimRewardsBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orcaTxClaimRewardsPost: async (body: TxClaimRewardsBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling orcaTxClaimRewardsPost.');
            }
            const localVarPath = `/orca/tx/claimRewards`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Return solana instructions that closes position in Orca via Hawksight.
         * @param {TxClosePositionBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orcaTxClosePositionPost: async (body: TxClosePositionBody1, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling orcaTxClosePositionPost.');
            }
            const localVarPath = `/orca/tx/closePosition`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Return solana instructions that deposits to Orca position via Hawksight.
         * @param {TxDepositBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orcaTxDepositPost: async (body: TxDepositBody1, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling orcaTxDepositPost.');
            }
            const localVarPath = `/orca/tx/deposit`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Return solana instructions that opens position account for Orca via Hawksight.
         * @param {TxOpenPositionBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orcaTxOpenPositionPost: async (body: TxOpenPositionBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling orcaTxOpenPositionPost.');
            }
            const localVarPath = `/orca/tx/openPosition`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Return solana instructions that withdraws to Orca position via Hawksight.
         * @param {TxWithdrawBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orcaTxWithdrawPost: async (body: TxWithdrawBody1, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling orcaTxWithdrawPost.');
            }
            const localVarPath = `/orca/tx/withdraw`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OrcaCLMMInstructionsApi - functional programming interface
 * @export
 */
export const OrcaCLMMInstructionsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Return solana instructions that claims reward to Orca position via Hawksight.
         * @param {TxClaimRewardsBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxClaimRewardsPost(body: TxClaimRewardsBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2004>>> {
            const localVarAxiosArgs = await OrcaCLMMInstructionsApiAxiosParamCreator(configuration).orcaTxClaimRewardsPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Return solana instructions that closes position in Orca via Hawksight.
         * @param {TxClosePositionBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxClosePositionPost(body: TxClosePositionBody1, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2004>>> {
            const localVarAxiosArgs = await OrcaCLMMInstructionsApiAxiosParamCreator(configuration).orcaTxClosePositionPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Return solana instructions that deposits to Orca position via Hawksight.
         * @param {TxDepositBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxDepositPost(body: TxDepositBody1, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2004>>> {
            const localVarAxiosArgs = await OrcaCLMMInstructionsApiAxiosParamCreator(configuration).orcaTxDepositPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Return solana instructions that opens position account for Orca via Hawksight.
         * @param {TxOpenPositionBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxOpenPositionPost(body: TxOpenPositionBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2004>>> {
            const localVarAxiosArgs = await OrcaCLMMInstructionsApiAxiosParamCreator(configuration).orcaTxOpenPositionPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Return solana instructions that withdraws to Orca position via Hawksight.
         * @param {TxWithdrawBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxWithdrawPost(body: TxWithdrawBody1, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2004>>> {
            const localVarAxiosArgs = await OrcaCLMMInstructionsApiAxiosParamCreator(configuration).orcaTxWithdrawPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * OrcaCLMMInstructionsApi - factory interface
 * @export
 */
export const OrcaCLMMInstructionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Return solana instructions that claims reward to Orca position via Hawksight.
         * @param {TxClaimRewardsBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxClaimRewardsPost(body: TxClaimRewardsBody, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2004>> {
            return OrcaCLMMInstructionsApiFp(configuration).orcaTxClaimRewardsPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Return solana instructions that closes position in Orca via Hawksight.
         * @param {TxClosePositionBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxClosePositionPost(body: TxClosePositionBody1, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2004>> {
            return OrcaCLMMInstructionsApiFp(configuration).orcaTxClosePositionPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Return solana instructions that deposits to Orca position via Hawksight.
         * @param {TxDepositBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxDepositPost(body: TxDepositBody1, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2004>> {
            return OrcaCLMMInstructionsApiFp(configuration).orcaTxDepositPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Return solana instructions that opens position account for Orca via Hawksight.
         * @param {TxOpenPositionBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxOpenPositionPost(body: TxOpenPositionBody, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2004>> {
            return OrcaCLMMInstructionsApiFp(configuration).orcaTxOpenPositionPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Return solana instructions that withdraws to Orca position via Hawksight.
         * @param {TxWithdrawBody1} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orcaTxWithdrawPost(body: TxWithdrawBody1, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2004>> {
            return OrcaCLMMInstructionsApiFp(configuration).orcaTxWithdrawPost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * OrcaCLMMInstructionsApi - object-oriented interface
 * @export
 * @class OrcaCLMMInstructionsApi
 * @extends {BaseAPI}
 */
export class OrcaCLMMInstructionsApi extends BaseAPI {
    /**
     * Return solana instructions that claims reward to Orca position via Hawksight.
     * @param {TxClaimRewardsBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrcaCLMMInstructionsApi
     */
    public async orcaTxClaimRewardsPost(body: TxClaimRewardsBody, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2004>> {
        return OrcaCLMMInstructionsApiFp(this.configuration).orcaTxClaimRewardsPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Return solana instructions that closes position in Orca via Hawksight.
     * @param {TxClosePositionBody1} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrcaCLMMInstructionsApi
     */
    public async orcaTxClosePositionPost(body: TxClosePositionBody1, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2004>> {
        return OrcaCLMMInstructionsApiFp(this.configuration).orcaTxClosePositionPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Return solana instructions that deposits to Orca position via Hawksight.
     * @param {TxDepositBody1} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrcaCLMMInstructionsApi
     */
    public async orcaTxDepositPost(body: TxDepositBody1, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2004>> {
        return OrcaCLMMInstructionsApiFp(this.configuration).orcaTxDepositPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Return solana instructions that opens position account for Orca via Hawksight.
     * @param {TxOpenPositionBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrcaCLMMInstructionsApi
     */
    public async orcaTxOpenPositionPost(body: TxOpenPositionBody, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2004>> {
        return OrcaCLMMInstructionsApiFp(this.configuration).orcaTxOpenPositionPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Return solana instructions that withdraws to Orca position via Hawksight.
     * @param {TxWithdrawBody1} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrcaCLMMInstructionsApi
     */
    public async orcaTxWithdrawPost(body: TxWithdrawBody1, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2004>> {
        return OrcaCLMMInstructionsApiFp(this.configuration).orcaTxWithdrawPost(body, options).then((request) => request(this.axios, this.basePath));
    }
}