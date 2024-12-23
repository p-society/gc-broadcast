import { Body, Controller, Post } from '@nestjs/common';
import { GenrateOtpService } from './genrateOtp.service';
import { OtpDto } from './dto/genrateOtp.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('generate-OTP')
export class GenerateOtpController {
  constructor(private readonly genrateOtpService: GenrateOtpService) {}

  @Public()
  @Post()
  async create(@Body() genrateOtpDto: OtpDto) {
    return await this.genrateOtpService.enqueueOtpJob(genrateOtpDto);
  }
}
