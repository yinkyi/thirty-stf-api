import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepositoryModule } from '@app/thirty-stf-repository/booking/booking.module';
import { StripeModule } from 'apps/thirty-stf/src/api/stripe/stripe.module';
import { StripeService } from 'apps/thirty-stf/src/api/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [BookingRepositoryModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    StripeService,
    {
      provide: 'STRIPE_API_KEY',
      useFactory: async (configService: ConfigService) =>
        configService.get('STRIPE_API_KEY'),
      inject: [ConfigService],
    },
  ],
})
export class BookingModule {}
