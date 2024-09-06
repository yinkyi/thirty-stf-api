import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { BookingRepository } from '@app/thirty-stf-repository/booking/booking.repository';
import { PrismaModule } from '@app/thirty-stf-repository/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MailService } from '@app/thirty-stf-repository/booking/email.service';

@Module({
  imports: [PrismaModule],
  providers: [BookingRepository, MailService],
  exports: [BookingRepository],
})
export class BookingRepositoryModule {}
