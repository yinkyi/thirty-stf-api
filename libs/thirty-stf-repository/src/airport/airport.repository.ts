import { RoleEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { PrismaService } from '@app/thirty-stf-repository/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { airports, FlightType, users } from '@prisma/client';

@Injectable()
export class AirportRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async getAirportList(type: FlightType): Promise<airports[]> {
    return await this.prisma.airports.findMany({
      where: {
        airportTypes: {
          some: {
            type: type,
          },
        },
      },
      include: {
        airportTypes: true,
      },
    });
  }
}
