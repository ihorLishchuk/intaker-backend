import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UnitsDto {
    metric = 'metric',
    imperial = 'imperial',
    standard = 'standard',
}

export class UserProfileDto {
    @ApiProperty({ example: 'clx1...abc' }) id!: string;
    @ApiProperty({ enum: UnitsDto, example: UnitsDto.metric }) units!: UnitsDto;
    @ApiPropertyOptional({ example: 'Europe/Berlin' }) timezone?: string;
    @ApiProperty({ example: 'clx1...user' }) userId!: string;
}

export class UserDto {
    @ApiProperty({ example: 'clx1...user' }) id!: string;
    @ApiProperty({ example: 'demo@example.com' }) email!: string;
    @ApiProperty({ type: () => UserProfileDto, required: false }) profile?: UserProfileDto;
    @ApiProperty({ example: '2025-11-06T10:00:00.000Z' }) createdAt!: string;
}

export class UpdateProfileBodyDto {
    @ApiPropertyOptional({ enum: UnitsDto }) units?: UnitsDto;
    @ApiPropertyOptional({ example: 'Europe/Berlin' }) timezone?: string;
}
