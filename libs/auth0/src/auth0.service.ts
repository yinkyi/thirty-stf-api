import { HttpException, Injectable } from '@nestjs/common';
import { client } from './apiGateway';
import { JwtStrategy } from './jwt.strategy';
import {
  assignRolesInterface,
  Auth0TokenResponse,
  CreateUserInterface,
  CreateUserResponseInterface,
  IdTokenUserI,
  PasswordlessAuthTokenInterface,
  PasswordlessStartInterface,
} from './interface';

@Injectable()
export class Auth0Service {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  private async handleRequest<T>(request: Promise<any>): Promise<T> {
    try {
      const response = await request;
      return response.data ?? response.status;
    } catch (error) {
      console.error('Error during request:', error.message);
      console.error('Stack:', error.stack);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw new HttpException(
        { message: error.response.data.error },
        error.response.status,
      );
    }
  }

  async passwordlessStart(passwordlessStart: PasswordlessStartInterface) {
    return this.handleRequest(
      client.post(
        'passwordless/start',
        {
          ...passwordlessStart,
        },
        {
          baseURL: process.env.AUTH0_DOMAIN_URL,
        },
      ),
    );
  }

  async passwordlessAuthToken(
    passwordlessAuthToken: PasswordlessAuthTokenInterface,
  ): Promise<Auth0TokenResponse> {
    return this.handleRequest(
      client.post(
        'oauth/token',
        {
          grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
          audience: process.env.AUTH0_API_AUDIENCE,
          scope: 'openid profile offline_access',
          redirect_uri: 'REDIRECT_URI',
          ...passwordlessAuthToken,
        },
        {
          baseURL: process.env.AUTH0_DOMAIN_URL,
        },
      ),
    );
  }

  async getLogoutOIDC(IdToken: string): Promise<any> {
    return this.handleRequest(
      client.get(`oidc/logout?id_token_hints=${IdToken}`, {
        baseURL: process.env.AUTH0_DOMAIN_URL,
      }),
    );
  }

  async revokeRefreshToken(
    clientId: string,
    refreshToken: string,
  ): Promise<any> {
    return await this.handleRequest(
      client.post(
        `oauth/revoke`,
        {
          client_id: clientId,
          token: refreshToken,
        },
        {
          baseURL: process.env.AUTH0_DOMAIN_URL,
        },
      ),
    );
  }

  async getRoles(): Promise<any> {
    return this.handleRequest(client.get('roles'));
  }
  async createUser(
    create: CreateUserInterface,
  ): Promise<CreateUserResponseInterface> {
    return this.handleRequest(
      client.post('users', {
        ...create,
        connection: 'email',
      }),
    );
  }

  async updateUser(
    id: string,
    update: Partial<CreateUserInterface>,
  ): Promise<CreateUserResponseInterface> {
    return this.handleRequest(
      client.patch(`users/${id}`, {
        ...update,
        connection: 'email',
      }),
    );
  }

  async deleteUser(id: string): Promise<number> {
    return this.handleRequest<number>(client.delete(`users/${id}`));
  }

  async getUser(id: string): Promise<any> {
    return this.handleRequest(client.get(`users/${id}`));
  }

  async getUserRoles(id: string): Promise<any> {
    return this.handleRequest(client.get(`users/${id}/roles`));
  }

  async getAllUser(): Promise<any> {
    return this.handleRequest(client.get(`users`));
  }

  async assignRolesToUser(assignRole: assignRolesInterface): Promise<number> {
    const roles = assignRole.roles;
    return this.handleRequest(
      client.post(`users/${assignRole.auth0UserId}/roles`, {
        roles,
      }),
    );
  }

  async decodeIdToken(token: string): Promise<IdTokenUserI> {
    return await this.jwtStrategy.decodeJWTToken<IdTokenUserI>(token);
  }
}
