import { AirportRepository } from '@app/thirty-stf-repository/airport/airport.repository';
import { PrismaModule } from '@app/thirty-stf-repository/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [AirportRepository],
  exports: [AirportRepository],
})
export class AirportRepositoryModule {}
