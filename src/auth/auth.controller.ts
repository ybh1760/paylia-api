import { Controller, Ip, Post } from '@nestjs/common';

import { UsersService } from '@user/users/users.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/sign-in')
  async signIn(@Ip() ip: string) {
    const existing = await this.usersService.findOne({ ip });
    if (existing) {
      return this.authService.createToken(existing.id);
    }

    const { id: userId } = await this.usersService.create({ ip });
    return this.authService.createToken(userId);
  }
}
