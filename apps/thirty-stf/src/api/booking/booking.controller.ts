import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'apps/thirty-stf/src/common/decorator/get-user.decorator';
import { AuthUserI } from '@app/auth0/interface';

@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: AuthUserI,
  ) {
    return this.bookingService.create(createBookingDto, user);
  }

  @Get(':ref')
  findAll(@Param('ref') ref: string, @GetUser() user: AuthUserI) {
    return this.bookingService.findBookingByRef(ref, user);
  }
}
