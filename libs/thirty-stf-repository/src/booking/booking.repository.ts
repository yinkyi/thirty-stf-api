import { CreateBookingInput } from '@app/thirty-stf-repository/booking/booking.model';
import { MailService } from '@app/thirty-stf-repository/booking/email.service';
import {
  EmailNoti,
  NotificationEnum,
  NotificationGateway,
} from '@app/thirty-stf-repository/booking/notification.gateway';
import { BookingStatusEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { PrismaService } from '@app/thirty-stf-repository/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { bookings, users } from '@prisma/client';

@Injectable()
export class BookingRepository {
  protected notificationGateway: Record<string, NotificationGateway> = {};
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly mailService: MailService,
  ) {
    this.notificationGateway[NotificationEnum.EMAIL] = new EmailNoti(
      mailService,
    );
  }

  generateReferenceNumber(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referenceNumber = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      referenceNumber += chars[randomIndex];
    }

    return referenceNumber;
  }

  async saveBooking(createBookingInput: CreateBookingInput): Promise<bookings> {
    /** update user info */
    const user = await this.prisma.users.update({
      where: { id: createBookingInput.userId },
      data: {
        ...createBookingInput.contactInfo,
      },
    });
    const newBooking = await this.prisma.bookings.create({
      data: {
        referenceNumber: this.generateReferenceNumber(),
        userId: createBookingInput.userId,
        currency: 'USD',
        paymentType: 'credit/debit',
        status: BookingStatusEnum.reserved,
        totalPassenger: createBookingInput.passengers.length,

        // Create related bookingFlights
        bookingFlights: {
          create: createBookingInput.flights.map((flight) => ({
            date: flight.date,
            flightScheduleId: flight.flightScheduleId,
            unitPrice: flight.unitPrice,
          })),
        },

        // Create related bookingPassengerDetail
        bookingPassengerDetails: {
          create: createBookingInput.passengers.map((passenger) => ({
            title: passenger.title,
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            dateOfBirth: passenger.dateOfBirth,
            nationality: passenger.nationality,
            passportNumber: passenger.passportNumber,
            passportExpireDate: new Date(passenger.passportExpireDate),
          })),
        },
      },
    });
    const gateway = await this.notificationGateway[NotificationEnum.EMAIL];
    await gateway.bookingConfirmNotification(user, newBooking);
    return newBooking;
  }

  async findBookingByRef(ref: string, userId: string) {
    const booking = await this.prisma.bookings.findFirstOrThrow({
      where: {
        referenceNumber: ref,
        userId: userId,
      },
      include: {
        bookingFlights: true,
      },
    });

    return booking;
  }

  async updateBookingStatus(ref: string, status: BookingStatusEnum) {
    const updateBooking = await this.prisma.bookings.update({
      where: { referenceNumber: ref },
      data: {
        status: status,
      },
    });

    const user = await this.prisma.users.findFirstOrThrow({
      where: { id: updateBooking.userId },
    });
    const gateway = await this.notificationGateway[NotificationEnum.EMAIL];
    await gateway.paymentConfirmNotification(user, updateBooking);
  }
}
