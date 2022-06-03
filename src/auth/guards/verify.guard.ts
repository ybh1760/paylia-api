import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { JwtConfigService } from '@config/jwt';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private readonly jwtConfig: JwtConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    (request as any).user = this._getPayload(request);

    return true;
  }

  private _getPayload(req: Request) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('인증정보가 없습니다.');
    }

    try {
      const payload = jwt.verify(token, this.jwtConfig.accessSecretKey);
      return payload;
    } catch {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }
  }
}
