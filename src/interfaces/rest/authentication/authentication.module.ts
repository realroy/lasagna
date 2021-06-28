import { Module } from '@nestjs/common';
import { SessionController } from './session/session.controller';
import { AccountController } from './account/account.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [JwtStrategy],
  controllers: [SessionController, AccountController]
})
export class AuthenticationModule {}
