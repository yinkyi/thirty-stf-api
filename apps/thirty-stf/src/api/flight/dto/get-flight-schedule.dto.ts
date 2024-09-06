import { FlightTypeEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class GetFlightScheduleDto {
  @IsUUID()
  depatureAirportId: string;

  @IsUUID()
  arrivalAirportId: string;

  @IsDateString()
  depatureDate: Date;

  @IsDateString()
  @IsOptional()
  returnDate: Date;

  @IsEnum(FlightTypeEnum)
  type: FlightTypeEnum;
}
