import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WeatherService } from '../weather/weather.service.js';
import { UnitsDto } from "../users/dtos.js";
import { WeatherBundle } from "../weather/weather.types.js";

type Widget = any;
type WidgetWithContent = Widget & { content?: WeatherBundle | null };

@Injectable()
export class WidgetsService {
    constructor(private prisma: PrismaService, private weather: WeatherService) {}

    create(ownerId: string, name: string, kind: string, configJson?: any): Promise<Widget> {
        return this.prisma.widget.create({
            data: { ownerId, name, kind, configJson: configJson ?? {} },
        });
    }

    listByOwner(ownerId: string): Promise<Widget[]> {
        return this.prisma.widget.findMany({ where: { ownerId } });
    }

    async listByOwnerWithWeather(ownerId: string, units: UnitsDto = UnitsDto.metric): Promise<WidgetWithContent[]> {
        const widgets = await this.listByOwner(ownerId);

        const queries = widgets
            .filter((w) => w.kind === 'weather' && w.configJson?.city)
            .map((w) => ({
                city: String(w.configJson.city),
                units,
                cnt: typeof w.configJson.cnt === 'number' ? w.configJson.cnt : undefined,
            }));

        const batch = await this.weather.getBatch(queries);

        return widgets.map((w) => {
            if (w.kind !== 'weather' || !w.configJson?.city) return { ...w };
            const key = `${units}:${String(w.configJson.city).toLowerCase()}:${w.configJson.cnt ?? ''}`;
            const content = batch[key] ?? null;
            return { ...w, content };
        });
    }

    async deleteOwned(ownerId: string, id: string): Promise<number> {
        const w = await this.prisma.widget.findFirst({ where: { id, ownerId } });
        if (!w) return 0;
        await this.prisma.widget.delete({ where: { id } });
        return 1;
    }
}
