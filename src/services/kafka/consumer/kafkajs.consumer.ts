import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import { IConsumer } from '../../../types/consumer.interface';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopics,
    config: ConsumerConfig,
    broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topics}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic); // to subscribe to topic
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        // Can change this as per requirment on what to do with the message
        this.logger.debug(`Processing ${message} of partition: ${partition}`);
        await onMessage(message);
      },
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
