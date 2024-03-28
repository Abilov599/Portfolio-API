import { IsBoolean } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class LoginUserDto extends RegisterUserDto {
  @IsBoolean()
  rememberMe: boolean;
}
