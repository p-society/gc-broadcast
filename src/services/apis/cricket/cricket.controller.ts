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
import { CricketService } from './cricket.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { CricketState } from './schemas/cricket.schema';

@Controller('cricket')
export class CricketController {
  constructor(private readonly cricketService: CricketService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.cricketService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.cricketService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createCricketDto: CricketState) {
    return await this.cricketService._create(createCricketDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchCricketDto: Partial<CricketState>,
    @Param('id') id,
  ) {
    return await this.cricketService._patch(id, patchCricketDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.cricketService._remove(id, query, user);
  }
}
