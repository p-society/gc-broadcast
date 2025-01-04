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
import { FootballService } from './football.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Football } from './schemas/football.schema';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.footballService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.footballService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createFootballDto: Football) {
    return await this.footballService._create(createFootballDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchFootballDto: Partial<Football>,
    @Param('id') id,
  ) {
    return await this.footballService._patch(id, patchFootballDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.footballService._remove(id, query, user);
  }
}
