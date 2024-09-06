import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';
import { bookings, users } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: users, booking: bookings) {
    const link = `http://localhost:3000/checkout/${booking.referenceNumber}`;

    await this.mailerService.sendMail({
      to: user.email, // Recipient email address
      subject: `Welcome to our 30 SecondsToFly! Confirm your Booking Number is ${booking.referenceNumber}`,
      template: 'confirmation',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        referenceNumber: booking.referenceNumber,
        paymentLink: link,
      },
    });
  }
}
