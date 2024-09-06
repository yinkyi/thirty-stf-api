import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { ManageAPIService } from './manageAPI';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    Auth0Service,
    JwtStrategy,
    {
      provide: ManageAPIService,
      useFactory: async () => {
        const manageAPIService = new ManageAPIService();
        await manageAPIService.generateManagementToken();
        return;
      },
    },
  ],
  exports: [Auth0Service, CacheModule, ManageAPIService, JwtStrategy],
})
export class Auth0Module {}
