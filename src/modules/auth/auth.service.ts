import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUserDto, User } from '@/core';
import { comparePassword, hashPassword } from '@/lib';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid)
      throw new BadRequestException('Password does not match');

    delete user.password;

    return user;
  }

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.usersRepository.exists({
      where: { email: registerUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hashPassword(registerUserDto.password);

    const newUser = await this.usersRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });

    return this.login(newUser);
  }

  async login(user: User) {
    const { id, email, role } = user;

    return {
      access_token: await this.jwtService.signAsync({ id, email, role }),
    };
  }
}
