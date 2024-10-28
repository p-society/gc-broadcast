const getSchema = (
  Name,
) => `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ${Name}Document = HydratedDocument<${Name}>;

@Schema({
  timestamps: true,
})
export class ${Name} {
  @Prop()
  name: string;
}

export const ${Name}Schema = SchemaFactory.createForClass(${Name});
`;

module.exports = getSchema;
