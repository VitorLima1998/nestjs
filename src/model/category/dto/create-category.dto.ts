import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'eletronics',
  })
  @IsString()
  name: string;
  @IsString()
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
