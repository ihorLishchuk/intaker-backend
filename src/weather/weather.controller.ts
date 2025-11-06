import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { WeatherQueryDto } from '../common/dto/weather.query.dto.js';
import { ForecastQueryDto } from '../common/dto/forecast.query.dto.js';

@ApiTags('weather')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'v1/weather' })
export class WeatherController {
  constructor(private svc: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather by city name' })
  @ApiQuery({ name: 'city', required: true, example: 'Berlin' })
  @ApiResponse({ status: 200, description: 'Current weather data' })
  getCurrent(@Query() q: WeatherQueryDto) {
    return this.svc.getCurrent(q.city);
  }

  @Get('forecast')
  @ApiOperation({ summary: 'Get multi-day weather forecast by city' })
  @ApiQuery({ name: 'city', required: true, example: 'Berlin' })
  @ApiQuery({ name: 'cnt', required: true, example: 7 })
  @ApiResponse({ status: 200, description: 'Forecast data' })
  getForecast(@Query() q: ForecastQueryDto) {
    return this.svc.getForecast(q.city, q.cnt);
  }
}
