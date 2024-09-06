import {
  BookingStatusEnum,
  TitleEnum,
} from '@app/thirty-stf-repository/enum/entity.enum';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';

export interface PassengerInput {
  title: TitleEnum;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationality: string;
  passportNumber?: string;
  passportExpireDate?: Date;
}

export interface BookingFlightInput {
  date: Date;
  flightScheduleId: string;
  unitPrice: number;
}
export interface CreateBookingInput {
  userId: string;
  paymentType?: string;
  flights: BookingFlightInput[];
  passengers: PassengerInput[];
  contactInfo: CreateUserInput;
}
