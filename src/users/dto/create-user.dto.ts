import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsStrongPassword,
  Length,
  IsOptional,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is not provided!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is not provided!' })
  @Length(8, 100)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe: boolean;
}
