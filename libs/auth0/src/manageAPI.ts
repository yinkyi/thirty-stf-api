import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { client } from './apiGateway';

// interface cacheManagementApiDataInterface {
//     access_token: string;
//     token_expires_time: Date;
// }

@Injectable()
export class ManageAPIService {
    private clientId = process.env.AUTHO_MANAGEMENT_CLIENT_ID;
    private clientSecret = process.env.AUTHO_MANAGEMENT_CLIENT_SECRET;
    private audience = process.env.AUTH0_MANAGEMENT_API_AUDIENCE;

    constructor() {}

    /**
     * get role, set user to roles, set roles to user
     * To write logic more about Auth 0 api
     */

    async generateManagementToken(): Promise<string> {
        // const cacheManagementApiData: cacheManagementApiDataInterface =
        //     await this.cacheManager.get('MANAGEMENT_API_TOKEN_INFO');
        // if (
        //     cacheManagementApiData &&
        //     cacheManagementApiData.token_expires_time &&
        //     new Date() < cacheManagementApiData.token_expires_time
        // ) {
        //     return cacheManagementApiData.access_token;
        // }
        const reponse = await axios.post(
            `${process.env.AUTH0_DOMAIN_URL}oauth/token`,
            {
                grant_type: 'client_credentials',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
            },

            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            },
        );
        const managementApiToken = reponse.data.access_token;
        console.log('call management api token:');

        // await this.cacheManager.set('MANAGEMENT_API_TOKEN_INFO', {
        //     access_token: managementApiToken,
        //     token_expires_time: new Date(
        //         new Date().getTime() + reponse.data.expires_in * 1000,
        //     ),
        // } as cacheManagementApiDataInterface);

        client.interceptors.request.use(
            async (config) => {
                config.headers.authorization = `Bearer ${managementApiToken}`;
                return config;
            },
            (error) => Promise.reject(error),
        );

        return managementApiToken;
    }
}
