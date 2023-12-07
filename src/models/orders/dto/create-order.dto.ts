import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  paymentStatus: string;
  @IsString()
  orderStatus: string;
  @IsString()
  userId: string;
  @IsString()
  transactionId: string;
  @IsString()
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
