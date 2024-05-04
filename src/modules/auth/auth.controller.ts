import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

import { RegisterUserDto, User } from '@/core';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    await this.authService.register(registerUserDto, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user);
  }
}
