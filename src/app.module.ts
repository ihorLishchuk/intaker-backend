import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.js';
import { validationSchema } from './config/validation.js';
import { AuthModule } from './auth/auth.module.js';
import { WeatherModule } from './weather/weather.module.js';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from './infra/cache.module.js';
import { HttpModule as InfraHttpModule } from './infra/http.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validationSchema }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    CacheModule,
    InfraHttpModule,
    AuthModule,
    WeatherModule,
  ],
})
export class AppModule {}
