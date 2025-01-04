import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchEvent } from '../schemas/events.schema';
import { CreateMatchEventDtoType } from '../dto/event.dto';

@Injectable()
export class MatchEventService {
  constructor(
    @InjectModel(MatchEvent.name)
    private matchEventModel: Model<MatchEvent>,
  ) {}

  async create(createEventDto: CreateMatchEventDtoType): Promise<MatchEvent> {
    const createdEvent = new this.matchEventModel(createEventDto);
    return createdEvent.save();
  }

  async findByMatch(matchId: string): Promise<MatchEvent[]> {
    return this.matchEventModel.find({ matchId }).sort({ timestamp: 1 }).exec();
  }

  async findByType(matchId: string, type: string): Promise<MatchEvent[]> {
    return this.matchEventModel
      .find({ matchId, type })
      .sort({ timestamp: 1 })
      .exec();
  }

  async findOne(id: string): Promise<MatchEvent> {
    const event = await this.matchEventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(
    id: string,
    updateEventDto: Partial<CreateMatchEventDtoType>,
  ): Promise<MatchEvent> {
    const updatedEvent = await this.matchEventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return updatedEvent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchEventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  // Additional utility methods
  async getEventsByTimeRange(
    matchId: string,
    startMinute: number,
    endMinute: number,
  ): Promise<MatchEvent[]> {
    return this.matchEventModel
      .find({
        matchId,
        'details.minute': { $gte: startMinute, $lte: endMinute },
      })
      .sort({ 'details.minute': 1 })
      .exec();
  }

  async getPlayerEvents(
    matchId: string,
    playerName: string,
  ): Promise<MatchEvent[]> {
    return this.matchEventModel
      .find({
        matchId,
        $or: [
          { 'details.player.name': playerName },
          { 'details.scorer.name': playerName },
          { 'details.scorer.assist.name': playerName },
          { 'details.outPlayer.name': playerName },
          { 'details.inPlayer.name': playerName },
        ],
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async getTeamEvents(matchId: string, team: string): Promise<MatchEvent[]> {
    return this.matchEventModel
      .find({
        matchId,
        'details.team': team,
      })
      .sort({ timestamp: 1 })
      .exec();
  }
}
