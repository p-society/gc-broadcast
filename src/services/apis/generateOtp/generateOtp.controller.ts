import { Body, Controller, Post } from '@nestjs/common';
import { GenrateOtpService } from './genrateOtp.service';
import { OtpDto, VerifyOtpDto } from './dto/genrateOtp.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('otp')
export class GenerateOtpController {
  constructor(private readonly genrateOtpService: GenrateOtpService) {}

  @Public()
  @Post('generate')
  async create(@Body() genrateOtpDto: OtpDto) {
    return await this.genrateOtpService.enqueueOtpJob(genrateOtpDto);
  }

  @Public()
  @Post('verify')
  async verify(@Body() verifyOtpDto: VerifyOtpDto) {
    return (await this.genrateOtpService.compareOtp(verifyOtpDto))
      ? 'OTP is correct'
      : 'OTP is incorrect';
  }
}
