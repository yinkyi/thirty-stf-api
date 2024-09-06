import axios from 'axios';
import { ManageAPIService } from './manageAPI';

export const client = axios.create({
  baseURL: `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}`,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const config = error?.config;
      if (!config?.sent) {
        const manageAPIService = new ManageAPIService();
        const token = await manageAPIService.generateManagementToken();
        config.headers.authorization = `Bearer ${token}`;
        config.sent = true;
        return axios(config);
      }
    }
    return Promise.reject(error);
  },
);
