var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
let CacheModule = class CacheModule {
};
CacheModule = __decorate([
    Module({
        imports: [
            NestCacheModule.registerAsync({
                inject: [ConfigService],
                useFactory: async (config) => {
                    const redisUrl = config.get('cache.redisUrl');
                    if (redisUrl) {
                        return {
                            store: await redisStore({ url: redisUrl }),
                            ttl: config.get('cache.ttl'),
                        };
                    }
                    return { ttl: config.get('cache.ttl') };
                },
                isGlobal: true,
            }),
        ],
        exports: [NestCacheModule],
    })
], CacheModule);
export { CacheModule };
//# sourceMappingURL=cache.module.js.map