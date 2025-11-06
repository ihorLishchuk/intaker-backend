var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller.js';
import { WeatherService } from './weather.service.js';
import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { HttpModule } from '../infra/http.module.js';
let WeatherModule = class WeatherModule {
};
WeatherModule = __decorate([
    Module({
        imports: [HttpModule],
        controllers: [WeatherController],
        providers: [WeatherService, OpenWeatherProvider],
    })
], WeatherModule);
export { WeatherModule };
//# sourceMappingURL=weather.module.js.map