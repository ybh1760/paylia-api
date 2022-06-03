import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtConfigService } from '@config/jwt';

import { JwtPayload, JwtToken } from './domain';

@Injectable()
export class AuthService {
  constructor(private readonly jwtConfig: JwtConfigService) {}

  createToken(userId: number): JwtToken {
    const payload: Pick<JwtPayload, 'sub'> = {
      sub: userId,
    };

    return {
      access: jwt.sign(payload, this.jwtConfig.accessSecretKey, {
        expiresIn: this.jwtConfig.accessExpiresIn,
      }),
      refresh: jwt.sign(payload, this.jwtConfig.refreshSecretKey, {
        expiresIn: this.jwtConfig.refreshExpiresIn,
      }),
    };
  }

  createResetToken(userId: number): string {
    return jwt.sign({ sub: userId }, this.jwtConfig.resetSecretKey, {
      expiresIn: this.jwtConfig.resetExpiresIn,
    });
  }
}
