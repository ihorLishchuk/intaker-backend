import { WeatherService } from './weather.service.js';
import { WeatherQueryDto } from '../common/dto/weather.query.dto.js';
import { ForecastQueryDto } from '../common/dto/forecast.query.dto.js';
export declare class WeatherController {
    private svc;
    constructor(svc: WeatherService);
    getCurrent(q: WeatherQueryDto): Promise<any>;
    getForecast(q: ForecastQueryDto): Promise<any>;
}
