import { IsString } from 'class-validator';

export class CreateWebhookEndPointDto {
  @IsString()
  domain: string;
}
