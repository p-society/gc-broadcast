import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConsumer } from '../../../types/consumer.interface';
import { KafkajsConsumer } from './kafkajs.consumer';
import { kafkaConsumerOptions } from 'src/constants/kafkajs-consumer-options';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(private readonly configService: ConfigService) {}
  // use this whever we required to consume the messages in form of an topics array []
  /** 
   * example of how to use this
    await this.consumerService.consume({
      topic: { topics: ['test'] }, -> this is the topic to which we are subscribing
      config: { groupId: 'test-consumer' }, -> this is the group id of the consumer
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
   */
  async consume({ topic, config, onMessage }: kafkaConsumerOptions) {
    const consumer = new KafkajsConsumer(
      topic,
      config,
      this.configService.get('KAFKA_BROKER'),
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
