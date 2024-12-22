import { Body, Controller, Post } from '@nestjs/common';
import { GenrateOtpService } from './genrateOtp.service';
import { OtpDto } from './dto/genrateOtp.dto';

@Controller('generate-OTP')
export class GenerateOtpController {
  constructor(private readonly genrateOtpService: GenrateOtpService) {}

  @Post()
  async create(@Body() genrateOtpDto: OtpDto) {
    return await this.genrateOtpService.enqueueOtpJob(genrateOtpDto);
  }
}
