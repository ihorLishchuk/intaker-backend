import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const setupSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Weather BFF')
        .setDescription('Backend For Frontend API for Weather App')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
};
//# sourceMappingURL=openapi.js.map