import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
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

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const token = jwt.sign({ sub: email, email, passwordHash }, secret, { expiresIn });
    return { access_token: token, token_type: 'Bearer', expires_in: expiresIn };
  }
}
