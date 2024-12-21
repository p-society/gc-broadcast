import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';

@Schema({
  timestamps: true,
})
export class Team {
  @Prop({
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Squad',
    required: true,
  })
  squadId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Match',
    required: true,
  })
  matchId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  captainId: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  maxPlayers: number; // e.g., 11 for cricket

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  createdBy: Types.ObjectId;

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

export const TeamSchema = SchemaFactory.createForClass(Team);
