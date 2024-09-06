import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Auth0Module } from '@app/auth0';
import { ThirtySTFlogModule } from '@app/thirtystflog';
import { ThirtyStfRepositoryModule } from '@app/thirty-stf-repository';
import { AirportModule } from 'apps/thirty-stf/src/api/airport/airport.module';
import { FlightModule } from 'apps/thirty-stf/src/api/flight/flight.module';
import { BookingModule } from 'apps/thirty-stf/src/api/booking/booking.module';
import { UserModule } from 'apps/thirty-stf/src/api/user/user.module';
import { StripeModule } from './api/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StripeModule.forRootAsync(),
    Auth0Module,
    ThirtySTFlogModule,
    ThirtyStfRepositoryModule,
    AirportModule,
    FlightModule,
    BookingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
