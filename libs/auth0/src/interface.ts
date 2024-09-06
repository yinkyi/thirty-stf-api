import { PasswordLessConnectionType, SendType } from '@app/auth0/auth0.enum';

export interface ClinetKeyInterface {
  client_id: string;
  client_secret: string;
}

export interface PasswordlessStartInterface extends ClinetKeyInterface {
  connection: PasswordLessConnectionType;
  email: string;
  send: SendType;
}

export interface PasswordlessAuthTokenInterface extends ClinetKeyInterface {
  otp: string;
  realm: PasswordLessConnectionType;
  username: string;
}

export interface RoleListInteface {
  id: string;
  name: string;
  description: string;
}

export interface CreateUserInterface {
  email: string;
  name: string;
  picture: string;
  user_metadata: {
    hasPin: boolean;
  };
}

export interface Identity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}

export interface CreateUserResponseInterface {
  created_at: string;
  email: string;
  email_verified: boolean;
  identities?: Identity[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
}

export interface assignRolesInterface {
  roles: string[];
  auth0UserId: string;
}

export interface Auth0AccessTokenUserMetaDataI {
  userId: string;
  roles: string;
  auth0UserId: string;
}

export interface Auth0IDTokenUserMetaDataI
  extends Auth0AccessTokenUserMetaDataI {
  hasPin: boolean;
}

export interface AuthUserI extends Auth0AccessTokenUserMetaDataI {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  scope: string;
  azp: string;
}

export interface IdTokenUserI extends Auth0IDTokenUserMetaDataI {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: true;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
}

export interface Auth0TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}
