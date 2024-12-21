import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Team } from './schemas/team.schema';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.teamService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.teamService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createTeamDto: Team) {
    return await this.teamService._create(createTeamDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchTeamDto: Partial<Team>,
    @Param('id') id,
  ) {
    return await this.teamService._patch(id, patchTeamDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.teamService._remove(id, query, user);
  }
}
