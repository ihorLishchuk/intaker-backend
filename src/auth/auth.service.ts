import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import type { LoginDto } from './types.js';

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigService) {}

  validateAndSign({ email, password }: LoginDto) {
    if (email !== process.env.AUTH_DEMO_EMAIL || password !== process.env.AUTH_DEMO_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const secret = this.config.get<string>('jwt.secret')!;
    const expiresIn = this.config.get<number>('jwt.expiresIn')!;
    const token = jwt.sign({ email }, secret, { expiresIn });
    return { access_token: token, token_type: 'Bearer', expires_in: expiresIn };
  }
}
