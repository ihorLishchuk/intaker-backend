import { Module } from '@nestjs/common';
import { WidgetsController } from './widgets.controller.js';
import { WidgetsService } from './widgets.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";
import { UsersModule } from "../users/users.module.js";
import { WeatherModule } from "../weather/weather.module.js";

@Module({
    imports: [PrismaModule, UsersModule, WeatherModule],
    controllers: [WidgetsController],
    providers: [WidgetsService],
    exports: [WidgetsService],
})
export class WidgetsModule {}
