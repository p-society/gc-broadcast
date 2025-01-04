import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MatchEventService } from './events.service';
import { CreateMatchEventDtoType } from './events.dto';
import { AdminGuard } from '../admin.guard';
import { UseGuards } from '@nestjs/common';

@Controller('football')
export class FootballEventController {
  constructor(private readonly eventService: MatchEventService) {}

  @Get(':matchId/event')
  async getLatestEvent(
    @Param('matchId') matchId: string,
    @Query('id') previousEventId?: string,
  ) {
    if (previousEventId) {
      const events = await this.eventService.findByMatch(matchId);
      const prevEventIndex = events.findIndex((e) => e.id === previousEventId);
      if (prevEventIndex === -1) {
        throw new NotFoundException('Previous event not found');
      }
      return events[prevEventIndex + 1] || null;
    }
    const events = await this.eventService.findByMatch(matchId);
    return events[events.length - 1] || null;
  }

  @Get(':matchId/event-series')
  async getEventSeries(
    @Param('matchId') matchId: string,
    @Query('id') previousEventId?: string,
  ) {
    let events = await this.eventService.findByMatch(matchId);
    events = events.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );
    if (previousEventId) {
      const prevEventIndex = events.findIndex((e) => e.id === previousEventId);
      if (prevEventIndex === -1) {
        throw new NotFoundException('Previous event not found');
      }
      return events.slice(0, prevEventIndex);
    }
    return events;
  }

  @Post(':matchId/event')
  @UseGuards(AdminGuard)
  createEvent(
    @Param('matchId') matchId: string,
    @Body() createEventDto: CreateMatchEventDtoType,
  ) {
    const eventWithMatchId = {
      ...createEventDto,
      matchId,
      timestamp: new Date(),
    };
    return this.eventService.create(eventWithMatchId);
  }

  @Patch('event/:eventId')
  @UseGuards(AdminGuard)
  updateEvent(
    @Param('eventId') eventId: string,
    @Body() updateEventDto: Partial<CreateMatchEventDtoType>,
  ) {
    return this.eventService.update(eventId, updateEventDto);
  }

  @Delete('event/:eventId')
  @UseGuards(AdminGuard)
  removeEvent(@Param('eventId') eventId: string) {
    return this.eventService.remove(eventId);
  }
}
