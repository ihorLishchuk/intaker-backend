import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class OpenWeatherProvider {
    private http;
    private config;
    private readonly baseUrl;
    private readonly apiKey;
    private readonly units;
    constructor(http: HttpService, config: ConfigService);
    getCurrent(city: string): Promise<any>;
    getForecast(city: string, cnt?: number): Promise<any>;
}
