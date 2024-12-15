import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ trim: true })
  firstName?: string;

  @Prop({ trim: true })
  middleName?: string;

  @Prop({ trim: true })
  lastName?: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  email: string;

  @Prop({ trim: true })
  gender: string;

  @Prop({ trim: true })
  batch: string;

  @Prop({ trim: true })
  branch: string;

  @Prop({ trim: true })
  password: string;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
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
  _id: any;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
