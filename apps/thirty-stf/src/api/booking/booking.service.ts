import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingRepository } from '@app/thirty-stf-repository/booking/booking.repository';
import { AuthUserI } from '@app/auth0/interface';
import { StripeService } from 'apps/thirty-stf/src/api/stripe/stripe.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly stripeService: StripeService,
  ) {}
  async create(createBookingDto: CreateBookingDto, user: AuthUserI) {
    return await this.bookingRepository.saveBooking({
      userId: user.userId,
      ...createBookingDto,
      contactInfo: { ...createBookingDto.contactDetail, id: user.userId },
    });
  }

  async findBookingByRef(ref: string, user: AuthUserI) {
    // Await the result from findOne
    const booking = await this.bookingRepository.findBookingByRef(
      ref,
      user.userId,
    );
    const cost = booking?.bookingFlights.reduce(
      (acc, bf) => acc + bf.unitPrice.toNumber(),
      0.0,
    );
    const totalCost = booking.totalPassenger * cost;
    const paymentIntent = await this.stripeService.createPaymentIntent(
      totalCost,
      'USD',
    );
    return {
      ...booking,
      clientSecrect: paymentIntent.client_secret,
    };
  }
}
