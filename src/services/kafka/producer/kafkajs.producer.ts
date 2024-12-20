import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { IProducer } from '../../../types/producer.interface';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: string,
    broker: string,
  ) {
    this.kafka = new Kafka({
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  // we just have to use this method wherever we want to produce a message
  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] });
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
