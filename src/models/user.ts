import { IsNotEmpty, Length } from 'class-validator';

export class UserDTO {
  id: string;
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  email: string;
  @Length(4, 20, { message: 'Password should be between 4 and 20 caracteres' })
  password: string;
}
