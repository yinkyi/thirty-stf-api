import { Injectable } from '@nestjs/common';
import { AirportRepository } from '@app/thirty-stf-repository/airport/airport.repository';
import { GetAirportDto } from 'apps/thirty-stf/src/api/airport/dto/get-airport.dto';

@Injectable()
export class AirportService {
  constructor(private readonly airportRepository: AirportRepository) {}

  async findAll(option: GetAirportDto) {
    return await this.airportRepository.getAirportList(option.type);
  }
}
