export class JwtPayload {
  /** userId */
  sub: number;
  /** 토큰이 발급된 시간 (issued at) */
  iat: number;
  /** expiration date */
  exp: number;
}
