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
import { OtpService } from './otp.service';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { User } from '../users/decorator/user.decorator';
import { Otp } from './schemas/otp.schema';
import { Public } from '../auth/decorators/public.decorator';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Public()
  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.otpService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.otpService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createOtpDto: Otp) {
    return await this.otpService._create(createOtpDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchOtpDto: Partial<Otp>,
    @Param('id') id,
  ) {
    return await this.otpService._patch(id, patchOtpDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.otpService._remove(id, query, user);
  }
}
