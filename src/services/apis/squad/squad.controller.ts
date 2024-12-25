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
import { SquadService } from './squad.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { CreateSquadDto, PatchSquadDto } from './dto/squad.dto';
import { Squads } from './schemas/squad.schema';

@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.squadService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.squadService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createSquadDto: Squads) {
    return await this.squadService._create(createSquadDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchSquadDto: Partial<Squads>,
    @Param('id') id,
  ) {
    return await this.squadService._patch(id, patchSquadDto, query);
  }

  @Patch('/:id/assign-captain')
  async assignCaptain(
    @Param('id') id,
    @Body() { captainId }: { captainId: string },
  ) {
    return await this.squadService.assignCaptain(id, captainId);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.squadService._remove(id, query, user);
  }
}
