import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MatchFormatService } from './format.service';
import { CreateMatchFormatDtoType } from './format.dto';

import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin.guard';

@Controller('football/formats')
export class FootballFormatController {
  constructor(private readonly formatService: MatchFormatService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createFormatDto: CreateMatchFormatDtoType) {
    return this.formatService.create(createFormatDto);
  }

  @Get()
  findAll() {
    return this.formatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateFormatDto: Partial<CreateMatchFormatDtoType>,
  ) {
    return this.formatService.update(id, updateFormatDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.formatService.remove(id);
  }
}
