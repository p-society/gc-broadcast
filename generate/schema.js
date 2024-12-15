const getSchema = (Name, UserEntity = 'Users') => `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ${UserEntity} } from '../../users/schemas/users.schema';

export type ${Name}Document = HydratedDocument<${Name}>;

@Schema({
  timestamps: true,
})
export class ${Name} {
  @Prop({ trim: true })
  name?: string;

  @Prop({
    type: Types.ObjectId,
    ref: ${UserEntity}.name,
  })
  createdBy: Types.ObjectId;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: ${UserEntity}.name,
  })
  deletedBy: Types.ObjectId;

  @Prop({
    type: Date
  })
  deletedAt: Date;
}

export const ${Name}Schema = SchemaFactory.createForClass(${Name});
`;

module.exports = getSchema;
