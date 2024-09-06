import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '@app/thirty-stf-repository/user/user.repository';
import { Auth0Module } from '@app/auth0';
import { UserRepositoryModule } from '@app/thirty-stf-repository/user/user.module';

@Module({
  imports: [UserRepositoryModule, Auth0Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
