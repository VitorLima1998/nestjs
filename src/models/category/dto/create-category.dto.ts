import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'eletronics',
  })
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDateString()
  @IsOptional()
  createdAt: Date;
  @IsOptional()
  @IsDateString()
  updatedAt: Date;
  @IsOptional()
  @IsDateString()
  deletedAt: Date;
}
