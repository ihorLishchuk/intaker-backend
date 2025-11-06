import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseGuards,
    NotFoundException,
    BadRequestException,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { WidgetsService } from './widgets.service.js';
import { UsersService } from '../users/users.service.js';
import { CreateWidgetDto, WidgetDto } from './dtos.js';
import { ApiOkEnvelope, ApiOkEnvelopeArray } from '../docs/swagger-helpers.js';
import { ApiBadRequestEnvelope, ApiNotFoundEnvelope } from '../docs/swagger-helpers.js';
import { AuthUser } from '../common/decorators/user.decorator.js';
import { ListWidgetsQueryDto } from './dtos.js';
import {UnitsDto} from "../users/dtos";

@ApiTags('widgets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/widgets')
export class WidgetsController {
    constructor(private widgets: WidgetsService, private users: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a widget for current user' })
    @ApiOkEnvelope(WidgetDto)
    @ApiBadRequestEnvelope('name and kind are required')
    @ApiNotFoundEnvelope('User not found')
    async create(@AuthUser() u: any, @Body() body: CreateWidgetDto) {
        const user = await this.users.findById(u.id ?? u.sub ?? '');
        if (!user) throw new NotFoundException('User not found');
        if (!body?.name || !body?.kind) throw new BadRequestException('name and kind are required');
        return this.widgets.create(user.id, body.name, body.kind, body.configJson);
    }

    @Get()
    @ApiOperation({ summary: 'List my widgets (optionally with aggregated weather)' })
    @ApiOkEnvelopeArray(WidgetDto)
    @ApiNotFoundEnvelope('User not found')
    async myWidgets(@AuthUser() u: any, @Query() q: ListWidgetsQueryDto) {
        const user = await this.users.findById(u.id ?? u.sub ?? '');
        if (!user) throw new NotFoundException('User not found');

        if (q.includeWeather) {
            return this.widgets.listByOwnerWithWeather(user.id);
        }
        return this.widgets.listByOwner(user.id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete my widget by id' })
    @ApiParam({ name: 'id', example: 'clx1...wid' })
    @ApiBadRequestEnvelope('id is required')
    @ApiNotFoundEnvelope('User not found')
    async remove(@AuthUser() u: any, @Param('id') id: string) {
        if (!id) throw new BadRequestException('id is required');
        const user = await this.users.findById(u.id ?? u.sub ?? '');
        if (!user) throw new NotFoundException('User not found');
        const deleted = await this.widgets.deleteOwned(user.id, id);
        return { deleted };
    }
}
