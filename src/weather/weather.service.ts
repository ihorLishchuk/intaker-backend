import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { UnitsDto } from "../users/dtos.js";
import {WeatherBundle, WeatherCurrent, WeatherForecast} from "./weather.types";

@Injectable()
export class WeatherService {
  // TODO: Units must be taken from user profile
  constructor(
      private provider: OpenWeatherProvider,
      @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  private ttl(): number {
    const ms = Number(process.env.CACHE_TTL_MS ?? 60000);
    return isNaN(ms) ? 60000 : ms;
  }

  private key(prefix: string, city: string, units: UnitsDto, extra = ''): string {
    return `${prefix}:${units}:${city.toLowerCase()}${extra ? ':' + extra : ''}`;
  }

  async getCurrent(city: string, units: UnitsDto = UnitsDto.metric): Promise<WeatherCurrent> {
    const key = this.key('current', city, units);
    const cached = await this.cache.get(key);
    //@ts-ignore
    if (cached) return cached;
    const data = await this.provider.getCurrent(city);
    await this.cache.set(key, data, this.ttl());
    return data;
  }

  async getForecast(city: string, cnt: number, units: UnitsDto = UnitsDto.metric): Promise<WeatherForecast> {
    const key = this.key('forecast', city, units, String(cnt));
    const cached = await this.cache.get(key);
    if (cached) return cached;
    const data = await this.provider.getForecast(city, cnt);
    await this.cache.set(key, data, this.ttl());
    return data;
  }

  async getBatch(
      cities: { city: string; units: UnitsDto; cnt: number }[],
  ): Promise<Record<string, WeatherBundle>> {
    const unique = new Map<string, { city: string; units: UnitsDto; cnt: number }>();
    for (const c of cities) unique.set(`${c.units}:${c.city.toLowerCase()}:${c.cnt ?? ''}`, c);

    const now = new Date().toISOString();
    const results: Record<string, any> = {};
    await Promise.all(
        Array.from(unique.values()).map(async ({ city, units, cnt }) => {
          try {
            const [current, forecast] = await Promise.all([
              this.getCurrent(city, units),
              this.getForecast(city, cnt, units),
            ]);
            results[`${units}:${city.toLowerCase()}:${cnt ?? ''}`] = {
              current,
              forecast,
              fetchedAt: now,
              ttl: this.ttl() / 1000,
            };
          } catch (e: any) {
            results[`${units}:${city.toLowerCase()}:${cnt ?? ''}`] = {
              error: e?.message || 'Failed to fetch weather',
              fetchedAt: now,
              ttl: this.ttl() / 1000,
            };
          }
        }),
    );
    return results;
  }
}
