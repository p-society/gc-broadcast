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
import { SquadPlayerService } from './squadPlayer.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { SquadPlayers } from './schemas/squadPlayer.schema';

@Controller('squad-player')
export class SquadPlayerController {
  constructor(private readonly squadPlayerService: SquadPlayerService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.squadPlayerService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.squadPlayerService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createSquadPlayerDto: SquadPlayers) {
    return await this.squadPlayerService._create(createSquadPlayerDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchSquadPlayerDto: Partial<SquadPlayers>,
    @Param('id') id,
  ) {
    return await this.squadPlayerService._patch(id, patchSquadPlayerDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.squadPlayerService._remove(id, query, user);
  }
}
