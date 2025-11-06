var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
let AuthService = class AuthService {
    constructor(config) {
        this.config = config;
    }
    validateAndSign({ email, password }) {
        if (email !== process.env.AUTH_DEMO_EMAIL || password !== process.env.AUTH_DEMO_PASSWORD) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const secret = this.config.get('jwt.secret');
        const expiresIn = this.config.get('jwt.expiresIn');
        const token = jwt.sign({ email }, secret, { expiresIn });
        return { access_token: token, token_type: 'Bearer', expires_in: expiresIn };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map