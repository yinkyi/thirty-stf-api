import { Module } from '@nestjs/common';
import { UserRepository } from '@app/thirty-stf-repository/user/user.repository';
import { PrismaModule } from '@app/thirty-stf-repository/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
