import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';
import { Squad } from '../../squad/schemas/squad.schema'; // Import Squad schema for relationships.

export type SquadPlayerDocument = HydratedDocument<SquadPlayer>;

@Schema({
  timestamps: true,
})
export class SquadPlayer {
  @Prop({
    type: Types.ObjectId,
    ref: Squad.name,
    required: true,
  })
  squadId: Types.ObjectId; // Relationship: Links to Squad.

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  playerId: Types.ObjectId; // Relationship: Links to User (player).

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string; // Player request status: pending, approved, or rejected.

  @Prop({
    type: Date,
    default: null,
  })
  requestedAt: Date; // Timestamp for when the player requested to join.

  @Prop({
    type: Date,
    default: null,
  })
  approvedAt: Date; // Timestamp for when the player request was approved.

  @Prop({ default: false })
  deleted: boolean; // Soft delete flag.

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
  })
  deletedBy: Types.ObjectId; // Who deleted this record?

  @Prop({
    type: Date,
  })
  deletedAt: Date; // When it was deleted.
}

export const SquadPlayerSchema = SchemaFactory.createForClass(SquadPlayer);
