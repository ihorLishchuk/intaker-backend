import Joi from 'joi';
export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.number().default(1000 * 60 * 60),
  OPENWEATHER_API_KEY: Joi.string().required(),
  OPENWEATHER_BASE_URL: Joi.string().uri().default('https://api.openweathermap.org/data/2.5'),
  WEATHER_UNITS: Joi.string().valid('metric','imperial','standard').default('metric'),
  CACHE_TTL_MS: Joi.number().default(60000),
  REDIS_URL: Joi.string().uri().optional(),
});
