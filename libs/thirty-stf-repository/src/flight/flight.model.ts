import { FlightTypeEnum } from '@app/thirty-stf-repository/enum/entity.enum';

export interface ScheduleFlightInput {
  depatureAirportId: string;
  arrivalAirportId: string;
  depatureDate: Date; // Accept Date or string
  type: FlightTypeEnum;
}
