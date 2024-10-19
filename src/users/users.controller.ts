import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './schemas/users.schema';
import { Roles } from './decorator/roles.decorator';
import { UserRole } from './constants/UserRole';
import { PaginatedResponse } from '../types/PaginatedResponse';
import { ModifyBody, setCreatedBy } from '../decorator/ModifyBody.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async create(@ModifyBody(setCreatedBy()) createUsersDto: CreateUsersDto) {
    return await this.usersService.create(createUsersDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async findAll(
    @Query('$skip', new DefaultValuePipe(0), new ParseIntPipe()) $skip: number,
    @Query('$limit', new DefaultValuePipe(10), new ParseIntPipe())
    $limit: number,
  ): Promise<PaginatedResponse<Users>> {
    return this.usersService.findAll($limit, $skip);
  }

  // @Get(':id')
  // @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  // async findOne(@Param('id') id: string): Promise<Users> {
  //   return this.usersService.findOne(id);
  // }

  // @Delete(':id')
  // @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  // async delete(@Param('id') id: string) {
  //   return this.usersService.delete(id);
  // }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async patch(
    @Param('id') id: string,
    @Body('patchUserDto') patchUserDto: CreateUsersDto,
  ) {
    return this.usersService.patch(id, patchUserDto);
  }
}
