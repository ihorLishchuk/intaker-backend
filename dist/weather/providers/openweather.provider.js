var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
let OpenWeatherProvider = class OpenWeatherProvider {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.baseUrl = this.config.get('weather.baseUrl');
        this.apiKey = this.config.get('weather.apiKey');
        this.units = this.config.get('weather.units');
    }
    async getCurrent(city) {
        const url = `${this.baseUrl}/weather`;
        const { data } = await firstValueFrom(this.http.get(url, { params: { q: city, units: this.units, appid: this.apiKey } }));
        return data;
    }
    async getForecast(city, cnt) {
        const url = `${this.baseUrl}/forecast`;
        const { data } = await firstValueFrom(this.http.get(url, { params: { q: city, units: this.units, cnt, appid: this.apiKey } }));
        return data;
    }
};
OpenWeatherProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService, ConfigService])
], OpenWeatherProvider);
export { OpenWeatherProvider };
//# sourceMappingURL=openweather.provider.js.map