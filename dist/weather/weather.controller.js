var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { WeatherQueryDto } from '../common/dto/weather.query.dto.js';
import { ForecastQueryDto } from '../common/dto/forecast.query.dto.js';
let WeatherController = class WeatherController {
    constructor(svc) {
        this.svc = svc;
    }
    getCurrent(q) {
        return this.svc.getCurrent(q.city);
    }
    getForecast(q) {
        return this.svc.getForecast(q.city, q.cnt);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Get current weather by city name' }),
    ApiQuery({ name: 'city', required: true, example: 'Berlin' }),
    ApiResponse({ status: 200, description: 'Current weather data' }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WeatherQueryDto]),
    __metadata("design:returntype", void 0)
], WeatherController.prototype, "getCurrent", null);
__decorate([
    Get('forecast'),
    ApiOperation({ summary: 'Get multi-day weather forecast by city' }),
    ApiQuery({ name: 'city', required: true, example: 'Berlin' }),
    ApiQuery({ name: 'cnt', required: true, example: 7 }),
    ApiResponse({ status: 200, description: 'Forecast data' }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForecastQueryDto]),
    __metadata("design:returntype", void 0)
], WeatherController.prototype, "getForecast", null);
WeatherController = __decorate([
    ApiTags('weather'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    Controller({ path: 'v1/weather' }),
    __metadata("design:paramtypes", [WeatherService])
], WeatherController);
export { WeatherController };
//# sourceMappingURL=weather.controller.js.map