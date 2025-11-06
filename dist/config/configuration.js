export default () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || 1000 * 60 * 60,
    },
    weather: {
        provider: process.env.WEATHER_PROVIDER || 'openweather',
        apiKey: process.env.OPENWEATHER_API_KEY,
        baseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
        units: process.env.WEATHER_UNITS || 'metric',
    },
    cache: {
        ttl: parseInt(process.env.CACHE_TTL_MS || '60000', 10),
        redisUrl: process.env.REDIS_URL,
    },
});
//# sourceMappingURL=configuration.js.map