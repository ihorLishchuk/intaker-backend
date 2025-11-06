import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service.js";

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) {}

    listByUser(userId: string) {
        return this.prisma.favorite.findMany({
            where: { userId },
            include: { widget: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async add(userId: string, widgetId: string) {
        await this.prisma.widget.findUniqueOrThrow({ where: { id: widgetId } });
        await this.prisma.favorite.upsert({
            where: { userId_widgetId: { userId, widgetId } },
            update: {},
            create: { userId, widgetId },
        });
        return { ok: true };
    }

    async remove(userId: string, widgetId: string) {
        await this.prisma.favorite.deleteMany({ where: { userId, widgetId } });
        return { ok: true };
    }
}
