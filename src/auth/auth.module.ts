import { Module } from '@nestjs/common';

import { JwtConfigModule } from '@config/jwt';
import { UsersModule } from '@user/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
