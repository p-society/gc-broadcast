import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Users, UsersDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService extends GlobalService<Users, UsersDocument> {
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }

  sanitizeUser(user: Users) {
    // @ts-ignore
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
