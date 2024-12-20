import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Profiles } from './schemas/profiles.schema';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.profilesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.profilesService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createProfilesDto: Profiles) {
    return await this.profilesService._create(createProfilesDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchProfilesDto: Partial<Profiles>,
    @Param('id') id,
  ) {
    return await this.profilesService._patch(id, patchProfilesDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.profilesService._remove(id, query, user);
  }
}
