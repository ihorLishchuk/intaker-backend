import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import type { LoginDto } from './types.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
      private readonly config: ConfigService,
      private readonly users: UsersService,
  ) {}

  async validateAndSign({ email, password }: LoginDto) {
    const user = await this.users.ensureUser(email, password);

    const secret = this.config.get<string>('jwt.secret')!;
    const expiresIn = this.config.get<number>('jwt.expiresIn')!;

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const token = jwt.sign(
        { sub: user.id, email: user.email, passwordHash },
        secret,
        { expiresIn }
    );

    return { access_token: token, token_type: 'Bearer', expires_in: expiresIn };
  }
}
