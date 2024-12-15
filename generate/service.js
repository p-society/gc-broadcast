const getService = (Name, name) => `import { Injectable } from "@nestjs/common";
import { GlobalService } from "src/common/global-service";
import { ${Name}, ${Name}Document } from "./schemas/${name}.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ${Name}Service extends GlobalService<${Name},${Name}Document>{
  constructor(
    @InjectModel(${Name}.name)
    private readonly ${name}Model: Model<${Name}Document>,
  ){
    super(${name}Model);
  }
}
`;

module.exports = getService;
