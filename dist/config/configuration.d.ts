declare const _default: () => {
    nodeEnv: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string | number;
    };
    weather: {
        provider: string;
        apiKey: string;
        baseUrl: string;
        units: string;
    };
    cache: {
        ttl: number;
        redisUrl: string | undefined;
    };
};
export default _default;
