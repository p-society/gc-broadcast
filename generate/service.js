const getService = (Name, name) => `import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Create${Name}Dto } from './dto/create-${name}.dto';
import { ${Name} } from './schemas/${name}.schema';
import { PaginatedResponse } from '../types/PaginatedResponse';

@Injectable()
export class ${Name}Service {
  constructor(
    @InjectModel(${Name}.name) private readonly ${name}Model: Model<${Name}>,
  ) {}

  async create(create${Name}Dto: Create${Name}Dto): Promise<${Name}> {
    return await this.${name}Model.create(create${Name}Dto);
  }
  
  async findAll(
    $limit: number | string = 10,
    $skip: number | string = 0,
  ): Promise<PaginatedResponse<${Name}>> {
    const limit = Number($limit);
    const skip = Number($skip);
    const total = await this.${name}Model.countDocuments().exec();
    const data = await this.${name}Model
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    return {
      total,
      data,
      limit: limit,
      skip: skip,
    };
  }

  async findOne(id: string): Promise<${Name}> {
    return this.${name}Model.findOne({ _id: id }).exec();
  }
  
  async patch(id: string, update${Name}Dto: Create${Name}Dto) {
    return await this.${name}Model
      .findOneAndUpdate({ _id: id }, update${Name}Dto, { new: true })
      .exec();
  }

  async delete(id: string) {
    const deleted${Name} = await this.${name}Model
      .findOneAndDelete({ _id: id })
      .exec();
    return deleted${Name};
  }
}
`;

module.exports = getService;
