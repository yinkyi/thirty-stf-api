import {
  FlightTypeEnum,
  RoleEnum,
} from '@app/thirty-stf-repository/enum/entity.enum';
import { ScheduleFlightInput } from '@app/thirty-stf-repository/flight/flight.model';
import { PrismaService } from '@app/thirty-stf-repository/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { flights, flightSchedules, Prisma } from '@prisma/client';

@Injectable()
export class FlightRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async getFlightSchedule(
    where: ScheduleFlightInput,
    orderBy?: Prisma.flightSchedulesOrderByWithRelationInput,
  ): Promise<flightSchedules[]> {
    // If it's a Date, create the start and end of the day filter
    const startDate = new Date(where.depatureDate);
    startDate.setHours(0, 0, 0, 0); // Start of the day

    const endDate = new Date(where.depatureDate);
    endDate.setHours(23, 59, 59, 999); // End of the day

    return await this.prisma.flightSchedules.findMany({
      where: {
        depatureAirportId: where.depatureAirportId,
        arrivalAirportId: where.arrivalAirportId,
        depatureDate: {
          gte: startDate,
          lte: endDate,
        },
        type: where.type,
      },
      include: {
        arrivalAirport: true,
        departureAirport: true,
        flight: {
          include: {
            airline: true,
          },
        },
      },
      orderBy: orderBy
        ? orderBy
        : {
            id: 'asc',
          },
    });
  }
}
function moment(start_date: any) {
  throw new Error('Function not implemented.');
}
