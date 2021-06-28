import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateSessionDTO } from './dto';

import { authenticateUser } from 'application/useCases';
import { Argon2 } from 'infrastructure/encryptions/argon2';
import {
  UserComparePasswordException,
  UserNotFoundException,
  UserPasswordMismatchException,
} from 'application/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserRepository } from 'infrastructure';

@Controller('sessions')
export class SessionController {
  private userRepository: UserRepository

  constructor(private jwtService: JwtService) {
    this.userRepository = new UserRepository()
  }

  @Post()
  async create(@Body() dto: CreateSessionDTO) {
    const encryptor = new Argon2();
  
    try {
      const user = await authenticateUser({
        email: dto.email,
        password: dto.password,
        compareHashFunction: encryptor.compare,
        userRepository: this.userRepository,
      });

      const accessToken = await this.jwtService.signAsync({}, { subject: user.id.toString() })

      return {
        accessToken,
      };

    } catch (error) {
      console.log(error, error.message)
      switch (error.constructor.name) {
        case 'UserNotFoundException':
          throw new NotFoundException(error.message);
        case 'UserComparePasswordException':
          throw new InternalServerErrorException(error.message);
        case 'UserPasswordMismatchException':
          throw new UnauthorizedException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  destroy(@Body() dto: { accessToken: string }) {
    return {};
  }
}
