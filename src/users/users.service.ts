import { Injectable } from '@nestjs/common';
import crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service.js";
import { UnitsDto } from "./dtos.js";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    findById(id: string) {
        return this.prisma.user.findUnique({ where: { id }, include: { profile: true } });
    }

    async ensureUser(email: string, plainPassword?: string) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) return existing;

        const passwordHash = plainPassword
            ? crypto.createHash('sha256').update(plainPassword).digest('hex')
            : null;

        return this.prisma.user.create({
            data: { email, passwordHash },
        });
    }

    async ensureUserWithProfile(id: string, opts: any = {}) {
        const { units = UnitsDto.metric, timezone } = opts;

        return this.prisma.$transaction(async (tx: any) => {
            let user = await tx.user.findUnique({ where: { id } });
            if (!user) {
                user = await tx.user.create({ data: { id } });
            }

            let profile = await tx.userProfile.findUnique({ where: { userId: user.id } });
            if (!profile) {
                profile = await tx.userProfile.create({
                    data: { userId: user.id, units, timezone },
                });
            } else if (opts.units !== undefined || opts.timezone !== undefined) {
                profile = await tx.userProfile.update({
                    where: { userId: user.id },
                    data: {
                        units: opts.units ?? undefined,
                        timezone: opts.timezone ?? undefined,
                    },
                });
            }

            return { ...user, profile };
        });
    }
}
