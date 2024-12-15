import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Users } from './schemas/users.schema';
import { OtpService } from '../otp/otp.service';
import { Otp } from '../otp/schemas/otp.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
  ) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.usersService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.usersService._get(id, query);
  }

  @Post()
  async create(@Body() createUsersDto: Users) {
    await this.verifyOTP(createUsersDto);
    const resp = await this.usersService._create(createUsersDto);
    await this.removeOTP(createUsersDto['email']);
    return resp;
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchUsersDto: Partial<Users>,
    @Param('id') id,
  ) {
    return await this.usersService._patch(id, patchUsersDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.usersService._remove(id, query, user);
  }

  async verifyOTP(createUsersDto: Users) {
    if (!Object.keys(createUsersDto).includes('otp')) {
      throw new BadRequestException('OTP not provided!');
    }

    const [code] = (await this.otpService._find({
      $populate: false,
      dest: createUsersDto['email'],
      $sort: {
        createdAt: -1,
      },
    })) as Otp[];

    if (!code) {
      throw new BadRequestException('otp not found!');
    }

    if (code.otp !== createUsersDto['otp']) {
      throw new BadRequestException('OTP Mismatched!');
    }
    return;
  }

  async removeOTP(createUsersDto: Users) {
    await this.otpService._remove(
      null,
      {
        dest: createUsersDto['email'],
      },
      null,
      {
        handleSoftDelete: false,
      },
    );
  }
}
