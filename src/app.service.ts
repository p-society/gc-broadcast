import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';  // Correct import

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: any): Promise<UserDocument> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findOne(condition: any): Promise<UserDocument> {
    return this.userModel.findOne(condition).exec();
  }
}