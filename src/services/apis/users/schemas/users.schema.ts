import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import EnsureObjectId from 'src/common/EnsureObjectId';
import { SoftDeleteSchema } from 'src/common/soft-delete-schema';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users extends SoftDeleteSchema {
  @Prop({
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  })
  firstName: string;

  @Prop({
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
  })
  middleName?: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  })
  lastName: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true,
    match: /^[0-9]{10}$/,
  })
  phone: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    enum: ['male', 'female', 'other'],
  })
  gender: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  batch: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  branch: string;

  @Prop({
    type: String,
    required: true,
    select: false, // Exclude from queries by default
  })
  password: string;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    index: true, // Index for faster queries
    set: EnsureObjectId,
  })
  createdBy: Types.ObjectId;

  _id: Types.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
