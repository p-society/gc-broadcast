import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Users } from 'src/services/apis/users/schemas/users.schema';

export class SoftDeleteSchema {
  @Prop({ default: false })
  deleted: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
  })
  deletedBy: Types.ObjectId;

  @Prop({
    type: Date,
  })
  deletedAt: Date;
}
