import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneOptions, Repository } from 'typeorm';

import { User } from '@/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(params: FindOneOptions<User> = {}) {
    return this.usersRepository.findOne(params);
  }

  async getProfile(user: User) {
    const me = await this.findOne({ where: { email: user.email } });
    delete me.password;
    return me;
  }
}
