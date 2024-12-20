import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateSendOtpValidation } from './dto/sendOtp.dto';
// import Mailer from 'src/common/mailer';
import { Public } from '../auth/decorators/public.decorator';
import { OtpService } from '../otp/otp.service';
import generateRandomNumber from 'src/common/generate-random-number';
import { MailerService } from '../mailer/mailer.service';
import { RedisService } from 'src/services/redis/redis.service';
import { KafkaService } from 'src/services/kafka/kafka.service';
import { TOPIC_NAME } from 'src/services/kafka/consumer/consumer.service';
import {
  SUBSCRIBER_MAP,
  SubscribeTo,
} from 'src/services/kafka/kafka.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendOtpService } from './sendOtp.service';
let i = 0;

@Controller('send-otp')
export class SendOtpController {
  constructor(
    // private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    private readonly sendOtpService: SendOtpService,
    @Inject('KAFKA_SERVICE_1') private client: KafkaService,
  ) {
    this.client.subscribeToResponseOf('notifications', this.sendOtpService);

    SUBSCRIBER_MAP.set(
      'notifications',
      this.sendOtpService.handleNotification.bind(this.sendOtpService),
    );
  }

  onModuleInit(): void {
    console.log('hahah');
    this.client.subscribeToResponseOf('notifications', this);
  }

  @Public()
  @Post()
  async sendOtpToEmail(@Body('email') email: string) {
    ({ email } = CreateSendOtpValidation.parse({ email }));

    const otp = generateRandomNumber();
    // await this.mailerService.sendMail(email,'X','Y','Z');
    // await this.otpService._create({
    //   dest: email,
    //   otp,
    //   type: 'email',
    // });
    console.log({ i });
    await this.redisService.set(
      `verification::email:${String(email)}:otp:${String(otp)}`,
      String(new Date()),
    );
    await this.client.send({
      messages: [
        {
          key: 'stay',
          value: 'halal',
          partition: i++ % 2,
        },
      ],
      topic: 'notifications',
    });
    return {
      message: 'mail sent successfully!',
    };
  }

  // @subax('notifications')
  // async message(@Payload() data: any): Promise<void> {
  //   console.log({aaaya:true})
  //   console.log(data)
  // }
}
