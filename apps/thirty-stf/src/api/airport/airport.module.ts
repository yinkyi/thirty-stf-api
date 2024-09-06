import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { AirportRepositoryModule } from '@app/thirty-stf-repository/airport/airport.module';

@Module({
  imports: [AirportRepositoryModule],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
