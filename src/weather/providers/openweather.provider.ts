import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenWeatherProvider {
  private readonly baseUrl = this.config.get<string>('weather.baseUrl')!;
  private readonly apiKey = this.config.get<string>('weather.apiKey')!;
  private readonly units = this.config.get<string>('weather.units')!;

  constructor(private http: HttpService, private config: ConfigService) {}

  async getCurrent(city: string) {
    const url = `${this.baseUrl}/weather`;
    const { data } = await firstValueFrom(
      this.http.get(url, { params: { q: city, units: this.units, appid: this.apiKey } }),
    );
    return data;
  }

  async getForecast(city: string, cnt?: number) {
    const url = `${this.baseUrl}/forecast`;
    const { data } = await firstValueFrom(
      this.http.get(url, { params: { q: city, units: this.units, cnt, appid: this.apiKey } }),
    );
    return data;
  }
}
