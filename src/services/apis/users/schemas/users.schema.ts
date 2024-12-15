import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ trim: true })
  name?: string;

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
