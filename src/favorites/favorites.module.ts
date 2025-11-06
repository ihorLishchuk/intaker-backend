import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller.js';
import { FavoritesService } from './favorites.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";
import { UsersModule } from "../users/users.module.js";

@Module({
    imports: [UsersModule, PrismaModule],
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService],
})
export class FavoritesModule {}
