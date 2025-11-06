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
import { Injectable, Inject } from '@nestjs/common';
import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
let WeatherService = class WeatherService {
    constructor(provider, cache) {
        this.provider = provider;
        this.cache = cache;
    }
    async getCurrent(city) {
        const key = `current:${city.toLowerCase()}`;
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const data = await this.provider.getCurrent(city);
        await this.cache.set(key, data, 60_000);
        return data;
    }
    async getForecast(city, cnt) {
        const key = `forecast:${city.toLowerCase()}:${cnt ?? 'default'}`;
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const data = await this.provider.getForecast(city, cnt);
        await this.cache.set(key, data, 60_000);
        return data;
    }
};
WeatherService = __decorate([
    Injectable(),
    __param(1, Inject(CACHE_MANAGER)),
    __metadata("design:paramtypes", [OpenWeatherProvider, Object])
], WeatherService);
export { WeatherService };
//# sourceMappingURL=weather.service.js.map