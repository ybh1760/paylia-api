import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  resetSecretKey: process.env.JWT_RESET_SECRET_KEY,
  resetExpiresIn: process.env.JWT_RESET_EXPIRES_IN,
}));
