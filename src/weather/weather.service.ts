import { Injectable, Inject } from '@nestjs/common';
import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class WeatherService {
  constructor(
    private provider: OpenWeatherProvider,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getCurrent(city: string) {
    const key = `current:${city.toLowerCase()}`;
    const cached = await this.cache.get(key);
    if (cached) return cached;
    const data = await this.provider.getCurrent(city);
    await this.cache.set(key, data, 60_000);
    return data;
  }

  async getForecast(city: string, cnt?: number) {
    const key = `forecast:${city.toLowerCase()}:${cnt ?? 'default'}`;
    const cached = await this.cache.get(key);
    if (cached) return cached;
    const data = await this.provider.getForecast(city, cnt);
    await this.cache.set(key, data, 60_000);
    return data;
  }
}
