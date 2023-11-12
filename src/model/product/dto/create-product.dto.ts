import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Iphone 14Pro Max',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://exemplo.com/imagem.jpg',
  })
  @IsString()
  urlName: string;

  @ApiProperty({
    example: 'https://exemplo.com/imagem.jpg',
  })
  @IsString()
  picture: string;

  @ApiProperty({
    example: 999.99,
  })
  @IsDecimal()
  basePrice: number;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  discountPercentage: number;

  @ApiProperty({
    example: 31,
  })
  @IsInt()
  stock: number;

  @ApiProperty({
    example: 'This is an iPhone 14 Pro Max with 256GB of memory.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '1998-01-31',
  })
  @IsDateString()
  createdAt: Date;
}
