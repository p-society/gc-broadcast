import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchFormat } from '../schemas/formats.schema';
import { CreateMatchFormatDtoType } from '../dto/format.dto';

@Injectable()
export class MatchFormatService {
  constructor(
    @InjectModel(MatchFormat.name)
    private matchFormatModel: Model<MatchFormat>,
  ) {}

  async create(
    createMatchFormatDto: CreateMatchFormatDtoType,
  ): Promise<MatchFormat> {
    const createdFormat = new this.matchFormatModel(createMatchFormatDto);
    return createdFormat.save();
  }

  async findAll(): Promise<MatchFormat[]> {
    return this.matchFormatModel.find().exec();
  }

  async findOne(id: string): Promise<MatchFormat> {
    const format = await this.matchFormatModel.findById(id).exec();
    if (!format) {
      throw new NotFoundException(`Match format with ID ${id} not found`);
    }
    return format;
  }

  async update(
    id: string,
    updateMatchFormatDto: Partial<CreateMatchFormatDtoType>,
  ): Promise<MatchFormat> {
    const updatedFormat = await this.matchFormatModel
      .findByIdAndUpdate(id, updateMatchFormatDto, { new: true })
      .exec();
    if (!updatedFormat) {
      throw new NotFoundException(`Match format with ID ${id} not found`);
    }
    return updatedFormat;
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchFormatModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Match format with ID ${id} not found`);
    }
  }
}
