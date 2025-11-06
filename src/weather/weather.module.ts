import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller.js';
import { WeatherService } from './weather.service.js';
import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { HttpModule } from '../infra/http.module.js';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, OpenWeatherProvider],
  exports: [WeatherService]
})
export class WeatherModule {}
