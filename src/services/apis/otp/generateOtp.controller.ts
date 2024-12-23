import { Body, Controller, Post } from '@nestjs/common';
import { GenerateOtpService } from './generateOtp.service';
import {
  OtpDto,
  OtpValidation,
  VerifyOtpDto,
  VerifyOtpValidation,
} from './dto/generateOtp.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('otp')
export class GenerateOtpController {
  constructor(private readonly generateOtpService: GenerateOtpService) {}

  @Public()
  @Post('generate')
  async create(@Body() generateOtpDto: OtpDto) {
    generateOtpDto = OtpValidation.parse(generateOtpDto);
    return await this.generateOtpService.enqueueOtpJob(generateOtpDto);
  }

  @Public()
  @Post('verify')
  async verify(@Body() verifyOtpDto: VerifyOtpDto) {
    verifyOtpDto = VerifyOtpValidation.parse(verifyOtpDto);
    return (await this.generateOtpService.compareOtp(verifyOtpDto))
      ? 'OTP is correct'
      : 'OTP is incorrect';
  }
}
