import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    UseGuards,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { FavoritesService } from './favorites.service.js';
import { UsersService } from '../users/users.service.js';
import { AuthUser } from '../common/decorators/user.decorator.js';
import { ApiOkEnvelopeArray } from '../docs/swagger-helpers.js';
import { ApiBadRequestEnvelope, ApiNotFoundEnvelope } from '../docs/swagger-helpers.js';
import { WidgetDto } from '../widgets/dtos.js';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/favorites')
export class FavoritesController {
    constructor(private favs: FavoritesService, private users: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'List my favorite widgets' })
    @ApiOkEnvelopeArray(WidgetDto)
    @ApiNotFoundEnvelope('User not found')
    async list(@AuthUser() u: { email: string }) {
        const user = await this.users.findById(u.email);
        if (!user) throw new NotFoundException('User not found');
        const favs = await this.favs.listByUser(user.id);
        return favs.map((f: any) => f.widget);
    }

    @Post(':widgetId')
    @ApiOperation({ summary: 'Add widget to favorites' })
    @ApiParam({ name: 'widgetId', example: 'clx1...wid' })
    @ApiBadRequestEnvelope('widgetId is required')
    @ApiNotFoundEnvelope('User not found')
    async add(@AuthUser() u: { email: string }, @Param('widgetId') widgetId: string) {
        if (!widgetId) throw new BadRequestException('widgetId is required');
        const user = await this.users.findById(u.email);
        if (!user) throw new NotFoundException('User not found');
        return this.favs.add(user.id, widgetId);
    }

    @Delete(':widgetId')
    @ApiOperation({ summary: 'Remove widget from favorites' })
    @ApiParam({ name: 'widgetId', example: 'clx1...wid' })
    @ApiBadRequestEnvelope('widgetId is required')
    @ApiNotFoundEnvelope('User not found')
    async remove(@AuthUser() u: { email: string }, @Param('widgetId') widgetId: string) {
        if (!widgetId) throw new BadRequestException('widgetId is required');
        const user = await this.users.findById(u.email);
        if (!user) throw new NotFoundException('User not found');
        return this.favs.remove(user.id, widgetId);
    }
}
