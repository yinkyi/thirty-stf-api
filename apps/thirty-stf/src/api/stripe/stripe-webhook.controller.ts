import { BookingRepository } from '@app/thirty-stf-repository/booking/booking.repository';
import { BookingStatusEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { Controller, Post, Res, Req, Body } from '@nestjs/common';
import { CreateWebhookEndPointDto } from 'apps/thirty-stf/src/api/stripe/dto/createEndpoint.dto';
import { StripeService } from 'apps/thirty-stf/src/api/stripe/stripe.service';
import { Request } from 'express';

@Controller('webhook')
export class StripeWebhookController {
  constructor(
    private stripeService: StripeService,
    private readonly bookingRepository: BookingRepository,
  ) {}

  @Post('')
  async handleWebhook(@Body() event) {
    try {
      const data = event.data.object;
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          break;
        case 'charge.succeeded':
          await this.bookingRepository.updateBookingStatus(
            data.metadata['bookingRef'],
            BookingStatusEnum.completed,
          );
          break;

        /**Add  more webhook */
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return { received: true };
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return { error: 'Webhook Error' };
    }
  }

  @Post('/create-endpoint')
  async createWebhookEndpoint(@Body() dto: CreateWebhookEndPointDto) {
    const webhook_url = `${dto.domain}/api/webhook`;
    const enabled_events = [
      'customer.subscription.trial_will_end',
      'customer.subscription.created',
      'customer.subscription.updated',
      'invoice.created',
      'invoice.updated',
      'invoice.upcoming',
      'invoice.paid',
      'invoice.payment_failed',
      'invoice.payment_succeeded',
      'customer.updated',
      'payment_intent.succeeded',
      'charge.succeeded',
    ];
    return await this.stripeService.registerWebhookEndPoints(
      webhook_url,
      enabled_events,
    );
  }
}
