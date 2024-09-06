import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  ValidateNested,
  IsUUID,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TitleEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { UpdateBookingDto } from 'apps/thirty-stf/src/api/booking/dto/update-booking.dto';
import { UpdateUserDto } from 'apps/thirty-stf/src/api/user/dto/update-user.dto';

// DTO for passenger
export class PassengerDto {
  @IsEnum(TitleEnum)
  title: TitleEnum;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsDateString()
  passportExpireDate?: Date;
}

// DTO for booking flight
export class BookingFlightDto {
  @IsDateString()
  date: Date;

  @IsUUID()
  @IsNotEmpty()
  flightScheduleId: string;

  @IsNumber()
  @Min(50)
  unitPrice: number;
}

// DTO for creating a booking
export class CreateBookingDto {
  @IsOptional()
  @IsString()
  paymentType?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingFlightDto)
  flights: BookingFlightDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  passengers: PassengerDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  contactDetail: UpdateUserDto;
}
