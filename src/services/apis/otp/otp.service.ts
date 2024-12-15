import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OtpService extends GlobalService<Otp, OtpDocument> {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpModel: Model<OtpDocument>,
  ) {
    super(otpModel);
  }
}
