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
import { Create${Name}DTO, Patch${Name}DTO } from './dto/${name}.dto';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';

@Controller('${url}')
export class ${Name}Controller {
  constructor(private readonly ${name}Service: ${Name}Service) {}

  @Get()
  async find(@Query() query: Record<string,any>) {
    return await this.${name}Service._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string,any>, @Param('id') id: string) {
    return await this.${name}Service._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) create${Name}Dto: Create${Name}DTO
  ) {
    return await this.${name}Service._create(create${Name}Dto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patch${Name}Dto: Patch${Name}DTO,
    @Param('id') id,
  ) {
    return await this.${name}Service._patch(id, patch${Name}Dto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.${name}Service._remove(id, query, user);
  }
}
`;

module.exports = getController;
