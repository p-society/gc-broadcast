import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SoftDeleteSchema } from 'src/common/soft-delete-schema';
import EnsureObjectId from 'src/common/EnsureObjectId';
import { Users } from '../../users/schemas/users.schema';
import SportsEnum, { SportsEnumList } from 'src/constants/sports-enum';

export type ProfilesDocument = HydratedDocument<Profiles>;

@Schema({
  timestamps: true,
})
export class Profiles extends SoftDeleteSchema {
  @Prop({
    type: String,
    enum: SportsEnumList,
    required: true,
  })
  sport: SportsEnum;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    index: true,
    required: true,
    set: EnsureObjectId,
  })
  user: Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
  })
  position: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  approved: boolean;

  @Prop({
    type: Number,
    default: 0,
    required: true,
  })
  experience: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  @Prop({
    //Add this when the Captain service is made
    type: Types.ObjectId,
    ref: Users.name,
    index: true,
    set: EnsureObjectId,
  })
  approvedBy: Types.ObjectId;

  @Prop({
    type: [
      {
        achievementTitle: {
          type: String,
          trim: true,
          maxlength: 30,
          minLength: 3,
        },
        date: { type: Date, default: Date.now(), index: true },
        description: { type: String, maxlength: 150, minlength: 25 },
      },
    ],
    index: true,
  })
  achievements: {
    achievementTitle: string;
    date: Date;
    description?: string;
  }[];

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    index: true,
    required: true,
    set: EnsureObjectId,
  })
  createdBy: Types.ObjectId;

  _id: Types.ObjectId;
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);
