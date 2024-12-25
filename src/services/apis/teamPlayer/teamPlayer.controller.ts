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
import { TeamPlayerService } from './teamPlayer.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { TeamPlayers } from './schemas/teamPlayer.schema';

@Controller('team-player')
export class TeamPlayerController {
  constructor(private readonly teamPlayerService: TeamPlayerService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.teamPlayerService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.teamPlayerService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createTeamPlayerDto: TeamPlayers) {
    return await this.teamPlayerService._create(createTeamPlayerDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchTeamPlayerDto: Partial<TeamPlayers>,
    @Param('id') id,
  ) {
    return await this.teamPlayerService._patch(id, patchTeamPlayerDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.teamPlayerService._remove(id, query, user);
  }
}
