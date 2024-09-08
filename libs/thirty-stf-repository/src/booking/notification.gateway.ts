import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';
import { MailService } from '@app/thirty-stf-repository/booking/email.service';
import { bookings, users } from '@prisma/client';

// Abstract class for notifications
export abstract class NotificationGateway {
  abstract bookingConfirmNotification(
    user: users,
    token?: bookings,
  ): Promise<void>;

  abstract paymentConfirmNotification(
    user: users,
    token?: bookings,
  ): Promise<void>;
}

// Tax Amount = Unit Price × (Tax Rate / 100 + Tax Rate)
// net price = unit price - tax_amount

@Injectable()
export class EmailNoti implements NotificationGateway {
  constructor(private readonly mailerService: MailService) {}

  // Sends email notification
  async bookingConfirmNotification(
    user: users,
    booking: bookings,
  ): Promise<void> {
    await this.mailerService.sendBookingConfirmation(user, booking);
  }

  async paymentConfirmNotification(
    user: users,
    booking: bookings,
  ): Promise<void> {
    await this.mailerService.sendPaymentConfirmation(user, booking);
  }
}

@Injectable()
export class SMSNoti implements NotificationGateway {
  // Sends SMS notification
  async bookingConfirmNotification(
    user: users,
    booking: bookings,
  ): Promise<void> {
    // Logic for sending SMS goes here
  }

  async paymentConfirmNotification(
    user: users,
    booking: bookings,
  ): Promise<void> {
    // Logic for sending SMS goes here
  }
}

// Enum to differentiate notification types
export enum NotificationEnum {
  EMAIL = 'email',
  SMS = 'sms',
}
