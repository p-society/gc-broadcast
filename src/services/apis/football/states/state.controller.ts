import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MatchStateService } from './state.service';
import { CreateMatchStateDtoType } from './state.dto';
import { AdminGuard } from '../admin.guard';
import { UseGuards } from '@nestjs/common';

@Controller('football/states')
export class FootballStateController {
  constructor(private readonly stateService: MatchStateService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createStateDto: CreateMatchStateDtoType) {
    return this.stateService.create(createStateDto);
  }

  @Get(':matchId/state')
  getMatchState(@Param('matchId') matchId: string) {
    return this.stateService.findOne(matchId);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateStateDto: Partial<CreateMatchStateDtoType>,
  ) {
    return this.stateService.update(id, updateStateDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.stateService.remove(id);
  }
}
