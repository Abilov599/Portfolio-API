import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(100)
  password: string;
}
