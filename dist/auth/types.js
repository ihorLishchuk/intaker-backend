var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class LoginDto {
}
__decorate([
    ApiProperty({ example: 'demo@example.com', description: 'User email' }),
    IsEmail(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'demo12345', description: 'User password' }),
    IsString(),
    MinLength(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
export class LoginResponse {
}
__decorate([
    ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' }),
    __metadata("design:type", String)
], LoginResponse.prototype, "access_token", void 0);
__decorate([
    ApiProperty({ example: 'Bearer' }),
    __metadata("design:type", String)
], LoginResponse.prototype, "token_type", void 0);
__decorate([
    ApiProperty({ example: 1000 * 60 * 60, description: 'Token expiration' }),
    __metadata("design:type", Number)
], LoginResponse.prototype, "expires_in", void 0);
//# sourceMappingURL=types.js.map