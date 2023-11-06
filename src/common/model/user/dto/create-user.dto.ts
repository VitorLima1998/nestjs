import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'S3nh@123',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '123 Main Street, Apt 4B. Austin, TX78701. EUA',
  })
  @IsString()
  @IsOptional()
  address: string;
}
