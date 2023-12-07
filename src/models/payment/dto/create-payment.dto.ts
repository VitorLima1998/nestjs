import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;
  @IsString()
  currency: string;
  description: string;
}
