import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';

export type MatchesDocument = HydratedDocument<Matches>;

@Schema({
  timestamps: true,
})
export class Matches {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Squad',
    required: true,
  })
  squadId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
    required: true,
  })
  teamId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  captainId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Date,
    required: true,
  })
  matchDate: Date;

  @Prop({
    type: String,
    enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED',
  })
  status: string;

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

export const MatchesSchema = SchemaFactory.createForClass(Matches);
