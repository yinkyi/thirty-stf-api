import { Injectable } from '@nestjs/common';
import { GetFlightScheduleDto } from './dto/get-flight-schedule.dto';
import { FlightRepository } from '@app/thirty-stf-repository/flight/flight.repository';

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  async findAll(option: GetFlightScheduleDto) {
    const depatureFlightSchedules =
      await this.flightRepository.getFlightSchedule({
        depatureAirportId: option.depatureAirportId,
        arrivalAirportId: option.arrivalAirportId,
        type: option.type,
        depatureDate: new Date(option.depatureDate),
      });

    const returnFlightSchedules = option.returnDate
      ? await this.flightRepository.getFlightSchedule({
          depatureAirportId: option.arrivalAirportId,
          arrivalAirportId: option.depatureAirportId,
          type: option.type,
          depatureDate: new Date(option.returnDate),
        })
      : [];

    return {
      depature: depatureFlightSchedules,
      return: returnFlightSchedules,
    };
  }
}
