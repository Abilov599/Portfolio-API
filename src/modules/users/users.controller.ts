import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';

import { RegisterUserDto } from '@/core';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne({ where: { email } });
  }

  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.usersService.delete(email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
