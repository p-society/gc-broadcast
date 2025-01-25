import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CricketService } from './cricket.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { CricketState } from './schemas/cricket.schema';
import { CricketEvent } from './schemas/cricket.event.schema';
import { Public } from '../auth/decorators/public.decorator';
import {
  updateCricketEeventDTO,
  updateCricketEeventDTOType,
} from './dto/cricket.event.dto';

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

  @Post('/:matchid/event')
  async createEvent(
    @ModifyBody(setCreatedBy()) createCricketEventDTO: CricketEvent,
    @Param('matchid') matchid: string,
  ) {
    const event = await this.cricketService.createEvent(
      matchid,
      createCricketEventDTO,
    );
    return event;
  }

  @Public()
  @Get('/:matchid/event')
  async getPreviousatestEvent(
    @Query('id') prevEventID: string,
    @Param('matchid') matchid: string,
  ) {
    const prevLatestEvent = await this.cricketService.getPreviousatestEvent(
      matchid,
      prevEventID,
    );
    return prevLatestEvent;
  }

  @Public()
  @Get('/:matchid/event-series')
  async getPreviousLatestEventSeries(
    @Query('id') prevEventId: string,
    @Param('matchid') matchid: string,
  ) {
    return await this.cricketService.getPreviousEventSeries(
      matchid,
      prevEventId,
    );
  }

  @Public()
  @Get('/:matchid/state')
  async getLatestMatchState(@Param('matchid') matchid: string) {
    const matchState = await this.cricketService.getLatestMatchState(matchid);
    return matchState;
  }

  @Patch('/event/:eventID')
  async updateEvent(
    @Param('eventID') eventID: string,
    @Body() updateEventDTO: updateCricketEeventDTOType,
  ) {
    updateEventDTO = updateCricketEeventDTO.parse(updateEventDTO);
    return await this.cricketService.updateEvent(eventID, updateEventDTO);
  }

  @Delete('/event/:eventID')
  async DeleteEvent(@Param('eventID') eventID: string) {
    const result = await this.cricketService.deleteEvent(eventID);
    return result;
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
