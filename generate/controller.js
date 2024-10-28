const getController = (Name, name, url) => `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ${Name}Service } from './${name}.service';
import { Create${Name}Dto } from './dto/create-${name}.dto';
import { ${Name} } from './schemas/${name}.schema';
import { PaginatedResponse } from '../types/PaginatedResponse';

@Controller('${url}')
export class ${Name}Controller {
  constructor(private readonly ${name}Service: ${Name}Service) {}

  @Post()
  async create(@Body() create${Name}Dto: Create${Name}Dto) {
    return await this.${name}Service.create(create${Name}Dto);
  }

  @Get()
  async findAll(
    @Query('$skip') $skip: string,
    @Query('$limit') $limit: string,
  ): Promise<PaginatedResponse<${Name}>> {
    return this.${name}Service.findAll($limit, $skip);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<${Name}> {
    return this.${name}Service.findOne(id);
  }
  
  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() update${Name}Dto: Create${Name}Dto,
  ) {
    return await this.${name}Service.patch(id, update${Name}Dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.${name}Service.delete(id);
  }
}
`;

module.exports = getController;
