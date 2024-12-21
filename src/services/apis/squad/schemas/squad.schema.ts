import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';

export type SquadDocument = HydratedDocument<Squad>;

@Schema({
  timestamps: true,
})
export class Squad {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
  })
  captainId: Types.ObjectId;

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

export const SquadSchema = SchemaFactory.createForClass(Squad);
