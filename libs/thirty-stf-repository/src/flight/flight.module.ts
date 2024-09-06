import { FlightRepository } from '@app/thirty-stf-repository/flight/flight.repository';
import { PrismaModule } from '@app/thirty-stf-repository/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [FlightRepository],
  exports: [FlightRepository],
})
export class FlightRepositoryModule {}
