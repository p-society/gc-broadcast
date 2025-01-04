import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchState } from '../schemas/states.schema';
import { CreateMatchStateDtoType } from '../dto/state.dto';

@Injectable()
export class MatchStateService {
  constructor(
    @InjectModel(MatchState.name)
    private matchStateModel: Model<MatchState>,
  ) {}

  async create(
    createMatchStateDto: CreateMatchStateDtoType,
  ): Promise<MatchState> {
    const createdState = new this.matchStateModel(createMatchStateDto);
    return createdState.save();
  }

  async findAll(): Promise<MatchState[]> {
    return this.matchStateModel.find().exec();
  }

  async findOne(id: string): Promise<MatchState> {
    const state = await this.matchStateModel.findById(id).exec();
    if (!state) {
      throw new NotFoundException(`Match state with ID ${id} not found`);
    }
    return state;
  }

  async update(
    id: string,
    updateMatchStateDto: Partial<CreateMatchStateDtoType>,
  ): Promise<MatchState> {
    const updatedState = await this.matchStateModel
      .findByIdAndUpdate(id, updateMatchStateDto, { new: true })
      .exec();
    if (!updatedState) {
      throw new NotFoundException(`Match state with ID ${id} not found`);
    }
    return updatedState;
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchStateModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Match state with ID ${id} not found`);
    }
  }

  // Additional methods specific to match state
  async updateScore(
    id: string,
    period: string,
    homeScore: number,
    awayScore: number,
  ): Promise<MatchState> {
    const update = {
      [`periods.${period}.score`]: { home: homeScore, away: awayScore },
    };
    return this.matchStateModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
  }

  async addEvent(id: string, period: string, event: any): Promise<MatchState> {
    return this.matchStateModel
      .findByIdAndUpdate(
        id,
        { $push: { [`periods.${period}.events`]: event } },
        { new: true },
      )
      .exec();
  }

  async updateMatchStatus(
    id: string,
    status: string,
    minute: number,
  ): Promise<MatchState> {
    return this.matchStateModel
      .findByIdAndUpdate(
        id,
        {
          'match.status': status,
          'match.minute': minute,
        },
        { new: true },
      )
      .exec();
  }
}
