import { Injectable } from '@nestjs/common';

@Injectable()
export class SendOtpService {
  handleNotification(topic: string, partition: number, message: any) {
    console.log(`Received message from ${topic} - Partition: ${partition}`);
    console.log(`Message:`, message.value.toString());
  }
}
