import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'demo@example.com', description: 'User email' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'demo12345', description: 'User password' })
    @IsString()
    @MinLength(6)
    password!: string;
}

export class LoginResponse {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
    access_token!: string;

    @ApiProperty({ example: 'Bearer' })
    token_type!: string;

    @ApiProperty({ example: 1000 * 60 * 60, description: 'Token expiration' })
    expires_in!: number;
}
