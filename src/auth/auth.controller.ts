import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto, LoginResponse } from './types.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private svc: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiResponse({ status: 201, type: LoginResponse })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return await this.svc.validateAndSign(body);
  }
}
