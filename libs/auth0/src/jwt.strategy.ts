import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import * as dotenv from 'dotenv';
import {
  Auth0AccessTokenUserMetaDataI,
  AuthUserI,
  IdTokenUserI,
} from '@app/auth0/interface';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: jwksClient.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_API_AUDIENCE,
      issuer: `${process.env.AUTH0_DOMAIN_URL}`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any): AuthUserI {
    const user_metadata =
      this.getUserMetaData<Auth0AccessTokenUserMetaDataI>(payload);
    payload['userId'] = user_metadata?.userId;
    payload['roles'] = user_metadata?.roles;
    payload['auth0UserId'] = user_metadata?.auth0UserId;

    delete payload[`${process.env.AUTH0_API_AUDIENCE}/user_metadata`];

    return payload;
  }

  async decodeJWTToken<T extends IdTokenUserI>(token: string): Promise<T> {
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken || !decodedToken.payload) {
      throw new HttpException(
        {
          message: 'Invalid token',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user_metadata = this.getUserMetaData<T>(decodedToken.payload);
    return {
      ...(decodedToken.payload as T),
      auth0UserId: user_metadata?.auth0UserId,
      userId: user_metadata?.userId,
      roles: user_metadata?.roles,
    };
  }

  getUserMetaData<T>(payload: unknown): T {
    return payload[`${process.env.AUTH0_API_AUDIENCE}/user_metadata`];
  }
}
