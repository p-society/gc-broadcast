import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import EnsureObjectId from './EnsureObjectId';

export class SoftDeleteSchema {
  @Prop({ default: false })
  deleted: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Users',
    set: EnsureObjectId,
  })
  deletedBy: Types.ObjectId;

  @Prop({
    type: Date,
  })
  deletedAt: Date;
}
