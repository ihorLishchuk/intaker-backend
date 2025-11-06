# Weather BFF (NestJS)

JWT-protected BFF for an Angular weather app. Proxies to OpenWeather, adds caching, rate limiting, validation, Swagger, and Docker.

## Quick Start

```bash
cp .env.example .env
npm ci
npm run build
npm start
# dev: npm run start:dev
```

Swagger: http://localhost:3000/docs

### Auth
- `POST /auth/login` with JSON `{ "email": "...", "password": "..." }` (demo creds from `.env`).
- Use `Authorization: Bearer <token>` for weather endpoints.

### Endpoints
- `GET /api/v1/weather?city=Berlin`
- `GET /api/v1/weather/forecast?city=Berlin&cnt=7`
```

