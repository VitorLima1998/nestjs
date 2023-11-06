import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({
    example: '4e5d60f6-3161-4a9c-af6d-6fde0506e4ec',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 'e507c1ad-3c86-45cc-8c2e-12c1d17c30ed',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 999.99,
  })
  @IsDecimal()
  totalPrice: number;

  @ApiProperty({
    example: 5,
  })
  @IsInt()
  reviewNote: number;

  @ApiProperty({
    example: `The iPhone 14 Pro Max is amazing! The camera and performance are top-notch, and the screen is stunning. The only downside is the high price, but it's worth it.`,
  })
  @IsString()
  reviewComment: string;

  @ApiProperty({
    example: '2023-10-21',
  })
  @IsDateString()
  createdAt: Date;
}
