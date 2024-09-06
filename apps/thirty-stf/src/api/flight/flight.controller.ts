import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { AuthGuard } from '@nestjs/passport';
import { GetFlightScheduleDto } from 'apps/thirty-stf/src/api/flight/dto/get-flight-schedule.dto';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('schedules')
  findAll(@Query() option: GetFlightScheduleDto) {
    return this.flightService.findAll(option);
  }
}
