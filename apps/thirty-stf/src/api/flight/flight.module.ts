import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { FlightRepositoryModule } from '@app/thirty-stf-repository/flight/flight.module';

@Module({
  imports: [FlightRepositoryModule],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
