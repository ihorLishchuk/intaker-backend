import {
    Controller,
    Get,
    Patch,
    Body,
    UseGuards,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { AuthUser } from '../common/decorators/user.decorator.js';
import { UsersService } from './users.service.js';
import { UpdateProfileBodyDto, UserDto, UserProfileDto } from './dtos.js';
import { ApiOkEnvelope } from '../docs/swagger-helpers.js';
import { ApiBadRequestEnvelope, ApiNotFoundEnvelope } from '../docs/swagger-helpers.js';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1')
export class UsersController {
    constructor(private users: UsersService) {}

    @Get('me')
    @ApiOperation({ summary: 'Get current user with profile' })
    @ApiOkEnvelope(UserDto)
    @ApiNotFoundEnvelope('User not found')
    async me(@AuthUser() u: { email: string }) {
        const user = await this.users.findById(u.email);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Patch('me/profile')
    @ApiOperation({ summary: 'Update user profile (units, timezone)' })
    @ApiOkEnvelope(UserProfileDto)
    @ApiBadRequestEnvelope('At least one field (units or timezone) must be provided')
    @ApiNotFoundEnvelope('User not found')
    async updateProfile(
        @AuthUser() u: { email: string },
        @Body() body: UpdateProfileBodyDto,
    ) {
        if (!body || (!body.units && !body.timezone)) {
            throw new BadRequestException('At least one field (units or timezone) must be provided');
        }
        const user = await this.users.findById(u.email);
        if (!user) throw new NotFoundException('User not found');
        return this.users.ensureUserWithProfile(user.email, { ...body });
    }
}
