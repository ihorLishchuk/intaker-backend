import { AuthService } from './auth.service.js';
import { LoginDto, LoginResponse } from './types.js';
export declare class AuthController {
    private svc;
    constructor(svc: AuthService);
    login(body: LoginDto): LoginResponse;
}
