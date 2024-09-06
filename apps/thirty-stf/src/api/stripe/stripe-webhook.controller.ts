import { Controller, Post, Body, Inject } from '@nestjs/common';
import { Stripe } from 'stripe';

@Controller('webhooks')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2024-06-20', // Use whatever API latest version
    });
  }

  @Post('stripe')
  async handleStripeWebhook(@Body() payload: any) {
    const sig = payload.headers['stripe-signature'];

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log(paymentIntent);
      }

      return { received: true };
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return { error: 'Webhook Error' };
    }
  }
}
