import { FlightTypeEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { IsEnum } from 'class-validator';

export class GetAirportDto {
  @IsEnum(FlightTypeEnum)
  type: FlightTypeEnum;
}
