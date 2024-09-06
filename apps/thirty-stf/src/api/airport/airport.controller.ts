import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AirportService } from './airport.service';
import { GetAirportDto } from 'apps/thirty-stf/src/api/airport/dto/get-airport.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('airports')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get()
  async findAll(@Query() option: GetAirportDto) {
    return await this.airportService.findAll(option);
  }
}
