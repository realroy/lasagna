import { BadRequestException, Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { registerUser } from 'application';
import { UserRepository } from 'infrastructure';
import { Argon2 } from 'infrastructure/encryptions/argon2';
import { SessionRepository } from 'infrastructure/repositiories/sessionRepository';
import { JwtAuthGuard } from '../jwt-auth.guard';

import { CreateUserDTO } from './dto';

@Controller('account')
export class AccountController {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;
  private encryptor: Argon2;
  
  constructor() {
    this.userRepository = new UserRepository()
    this.sessionRepository = new SessionRepository()
    this.encryptor = new Argon2()
  }

  
  @Post()
  async create(@Body() dto: CreateUserDTO) {
    try {
      const result = await registerUser({
        user: dto,
        hashFunction: this.encryptor.hash,
        userRepository: this.userRepository,
        sessionRepository: this.sessionRepository })

      return {}
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  
  @Delete()
  @UseGuards(JwtAuthGuard)
  async destroy() {
    return {}
  }
}
