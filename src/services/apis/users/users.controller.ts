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
import { User } from '../users/decorator/user.decorator';
import { Users } from './schemas/users.schema';
import { Public } from '../auth/decorators/public.decorator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsersDTO } from './dto/users.dto';
import { GenerateOtpService } from '../otp/generateOtp.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly generateOtpService: GenerateOtpService,
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
  async create(@Body() createUsersDto: Users, @User() users: Users) {
    /**
     * @todo use zod for validations...
     */
    const saltOrRounds = 10;
    console.log({ users });
    if (users.type === 4096) {
      const password = await bcrypt.hash(createUsersDto.password, saltOrRounds);

      const user = (await this.usersService._create({
        ...createUsersDto,
        password,
      })) as Users;

      const sanitizedUser = this.usersService.sanitizeUser(user);
      const payload = { sub: { id: user._id }, user };

      return {
        user: sanitizedUser,
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    if (!createUsersDto.email || !createUsersDto['otp']) {
      throw new BadRequestException('Email or OTP not provided!');
    }

    await this.generateOtpService.compareOtp(
      {
        email: createUsersDto.email.trim(),
        otp: String(createUsersDto['otp']).trim(),
      },
      true, // removeEntryAfterCheck
    );

    const password = await bcrypt.hash(createUsersDto.password, saltOrRounds);

    const user = (await this.usersService._create({
      ...createUsersDto,
      password,
    })) as Users;

    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };

    return {
      user: sanitizedUser,
      accessToken: await this.jwtService.signAsync(payload),
    };
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
}
