import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ProducerService, ConsumerService, ConfigService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
