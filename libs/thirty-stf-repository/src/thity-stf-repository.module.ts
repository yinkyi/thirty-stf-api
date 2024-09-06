import { ThirtyStfRepositoryService } from 'libs/thirty-stf-repository/src/thity-stf-repository.service';
import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './user/user.module';
import { FlightRepositoryModule } from './flight/flight.module';
import { BookingRepositoryModule } from './booking/booking.module';
import { AirportRepositoryModule } from './airport/airport.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  providers: [ThirtyStfRepositoryService],
  exports: [ThirtyStfRepositoryService],
  imports: [
    UserRepositoryModule,
    FlightRepositoryModule,
    BookingRepositoryModule,
    AirportRepositoryModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '30 STF yinyin@30stf.com',
      },
      template: {
        dir: process.cwd() + '/apps/thirty-stf/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class ThirtyStfRepositoryModule {}
