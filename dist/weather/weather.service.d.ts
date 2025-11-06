import { OpenWeatherProvider } from './providers/openweather.provider.js';
import { Cache } from 'cache-manager';
export declare class WeatherService {
    private provider;
    private cache;
    constructor(provider: OpenWeatherProvider, cache: Cache);
    getCurrent(city: string): Promise<any>;
    getForecast(city: string, cnt?: number): Promise<any>;
}
