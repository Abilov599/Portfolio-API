import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/core';

import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
