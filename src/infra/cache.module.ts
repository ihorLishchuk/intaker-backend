import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const redisUrl = config.get<string>('cache.redisUrl');
        if (redisUrl) {
          return {
            store: await redisStore({ url: redisUrl }),
            ttl: config.get<number>('cache.ttl'),
          };
        }
        return { ttl: config.get<number>('cache.ttl') };
      },
      isGlobal: true,
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
