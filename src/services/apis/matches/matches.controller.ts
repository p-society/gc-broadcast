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
import { MatchesService } from './matches.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Matches } from './schemas/matches.schema';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.matchesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.matchesService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createMatchesDto: Matches) {
    return await this.matchesService._create(createMatchesDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchMatchesDto: Partial<Matches>,
    @Param('id') id,
  ) {
    return await this.matchesService._patch(id, patchMatchesDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.matchesService._remove(id, query, user);
  }
}
