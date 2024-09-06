import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stripe')
@UseGuards(AuthGuard('jwt'))
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @Get('customers')
  async getCustomers() {
    return await this.stripeService.getProducts();
  }

  @Post('create-payment-intent')
  async createPaymentIntent() {
    return await this.stripeService.createPaymentIntent(1000, 'USD');
  }
}
