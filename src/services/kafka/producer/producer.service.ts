import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'kafkajs';
import { KafkajsProducer } from './kafkajs.producer';
import { IProducer } from '../../../types/producer.interface';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();
  // here producer is our type that we have crated and first agrument being topic to which it is producing

  constructor(private readonly configService: ConfigService) {}
  // just use thhis whever producing to a topic is required
  /** 
    await this.producerService.produce('test', {
      value: 'Hello World',
    });
   */
  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string) {
    // making sure we have only one producer for a topic
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get('KAFKA_BROKER'),
      );
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
