import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsOptional, IsObject, IsBoolean} from 'class-validator';
import {Transform} from "class-transformer";

export class CreateWidgetDto {
    @ApiProperty({ example: 'My Weather in Berlin' })
    @IsString()
    name!: string;

    @ApiProperty({ example: 'weather' })
    @IsString()
    kind!: string;

    @ApiPropertyOptional({ example: { city: 'Berlin', cnt: 7 } })
    @IsOptional()
    @IsObject()
    configJson?: any;
}

export class WidgetDto {
    @ApiProperty({ example: 'clx1...wid' })
    @IsString()
    id!: string;

    @ApiProperty({ example: 'clx1...user', required: false })
    @IsOptional()
    @IsString()
    ownerId?: string;

    @ApiProperty({ example: 'My Weather in Berlin' })
    @IsString()
    name!: string;

    @ApiProperty({ example: 'weather' })
    @IsString()
    kind!: string;

    @ApiPropertyOptional({ example: { city: 'Berlin', cnt: 7 } })
    @IsOptional()
    @IsObject()
    configJson?: any;

    @ApiProperty({ example: '2025-11-06T10:00:00.000Z' })
    @IsString()
    createdAt!: string;
}

export class ListWidgetsQueryDto {
    @ApiPropertyOptional({ example: true, description: 'Include aggregated weather data' })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    includeWeather?: boolean;
}
