import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { PaginatedResponse } from '../types/PaginatedResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(createUsersDto.password, saltOrRounds);
    const user = await this.usersModel.create({
      ...createUsersDto,
      password,
    });
    return this.sanitizeUser(user);
  }

  async findAll(
    limit: number,
    skip: number,
  ): Promise<PaginatedResponse<Users>> {
    // const limit = Number($limit);
    // const skip = Number($skip);
    const total = await this.usersModel.countDocuments().exec();
    const data = await this.usersModel
      .find()
      .skip(skip)
      .limit(limit)
      .select({
        name: 1,
        email: 1,
        role: 1,
      })
      .exec();
    return {
      total,
      data,
      limit: limit,
      skip: skip,
    };
  }

  async findOne(id: string): Promise<UsersDocument> {
    return this.usersModel.findOne({ _id: id }).exec();
  }

  async findOneEmail(email: string): Promise<UsersDocument> {
    return this.usersModel.findOne({ email }).exec();
  }

  async delete(id: string) {
    const deletedUsers = await this.usersModel
      .findOneAndDelete({ _id: id })
      .exec();
    return deletedUsers;
  }

  async patch(id: string, patchUserDto: CreateUsersDto) {
    return await this.usersModel
      .findOneAndUpdate({ _id: id }, patchUserDto, { new: true })
      .exec();
  }

  sanitizeUser(user: UsersDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
