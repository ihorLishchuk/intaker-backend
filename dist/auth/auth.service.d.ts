import { ConfigService } from '@nestjs/config';
import type { LoginDto } from './types.js';
export declare class AuthService {
    private readonly config;
    constructor(config: ConfigService);
    validateAndSign({ email, password }: LoginDto): {
        access_token: string;
        token_type: string;
        expires_in: number;
    };
}
