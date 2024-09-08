import { BookingRepository } from '@app/thirty-stf-repository/booking/booking.repository';
import { BookingStatusEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { Inject, Injectable, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2024-06-20', // Use whatever API latest version
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    bookingRef: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        bookingRef,
      },
    });
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
  }

  // async webhook(req: Request) {
  //   const sig = req.headers['stripe-signature'];
  //   const event = this.stripe.webhooks.constructEvent(
  //     req.body,
  //     sig,
  //     process.env.STRIPE_WEBHOOK_SECRET,
  //   );
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       const paymentIntent = event.data.object;
  //       break;
  //     case 'charge.succeeded':
  //       const charge = event.data.object;
  //       await this.bookingRepository.updateBookingStatus(
  //         charge.metadata['bookingRef'],
  //         BookingStatusEnum.completed,
  //       );
  //       break;

  //     /**Add  more webhook */
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  //   return { received: true };
  // }
  public async registerWebhookEndPoints(
    webhook_url: string,
    events: string[],
  ): Promise<Stripe.WebhookEndpoint> {
    const enabled_events =
      events as Stripe.WebhookEndpointCreateParams.EnabledEvent[];
    const webhook_endPoint = await this.stripe.webhookEndpoints.create({
      url: webhook_url,
      enabled_events,
    });
    return webhook_endPoint;
  }
}
