import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';
import { MailService } from '@app/thirty-stf-repository/booking/email.service';
import { bookings, users } from '@prisma/client';

// Abstract class for notifications
export abstract class NotificationGateway {
  abstract sendNotification(user: users, token?: bookings): Promise<void>;
}

// Tax Amount = Unit Price × (Tax Rate / 100 + Tax Rate)
// net price = unit price - tax_amount

@Injectable()
export class EmailNoti implements NotificationGateway {
  constructor(private readonly mailerService: MailService) {}

  // Sends email notification
  async sendNotification(user: users, booking: bookings): Promise<void> {
    await this.mailerService.sendUserConfirmation(user, booking);
  }
}

@Injectable()
export class SMSNoti implements NotificationGateway {
  // Sends SMS notification
  async sendNotification(user: users, booking: bookings): Promise<void> {
    // Logic for sending SMS goes here
  }
}

// Enum to differentiate notification types
export enum NotificationEnum {
  EMAIL = 'email',
  SMS = 'sms',
}
