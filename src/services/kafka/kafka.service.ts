import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  Admin,
  Consumer,
  Kafka,
  Producer,
  ProducerRecord,
  RecordMetadata,
  SeekEntry,
} from 'kafkajs';
import { KafkaMessageSend, KafkaModuleOption } from 'src/types/kafka';
import { KafkaLogger } from '@nestjs/microservices/helpers/kafka-logger';
import { SUBSCRIBER_MAP, SUBSCRIBER_OBJECT_MAP } from './kafka.decorator';

/**
 * @docs https://docs.nestjs.com/fundamentals/lifecycle-events
 */
@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private admin: Admin;
  private autoConn: boolean;
  private options: KafkaModuleOption['options'];

  protected topicOffsets: Map<
    string,
    (SeekEntry & {
      high: string;
      low: string;
    })[]
  > = new Map();

  protected logger = new Logger(KafkaService.name);

  constructor(options: KafkaModuleOption['options']) {
    const {
      client,
      consumer: consumerConfig,
      producer: producerConfig,
    } = options;

    this.kafka = new Kafka({
      ...client,
      logCreator: KafkaLogger.bind(null, this.logger),
    });

    const { groupId } = consumerConfig;
    const consumerOptions = Object.assign(
      {
        groupId: this.getGroupIdSuffix(groupId),
      },
      consumerConfig,
    );

    this.autoConn = options.autoConnect ?? true;
    this.consumer = this.kafka.consumer(consumerOptions);
    this.producer = this.kafka.producer(producerConfig);
    this.admin = this.kafka.admin();

    this.options = options;
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    await this.getTopicOffsets();
    console.log({ SUBSCRIBER_MAP });
    SUBSCRIBER_MAP.forEach((functionRef, topic) => {
      this.subscribe(topic);
    });
    this.bindAllTopicToConsumer();
    const topics = [
      { name: 'notifications', numPartitions: 2, replicationFactor: 1 },
      { name: 'reaction-streams', numPartitions: 5, replicationFactor: 1 },
    ];

    this.ensureTopicsExist(topics);
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  async connect(): Promise<void> {
    if (!this.autoConn) {
      return;
    }

    await this.producer.connect();
    await this.consumer.connect();
    await this.admin.connect();
  }

  private async getTopicOffsets(): Promise<void> {
    const topics = SUBSCRIBER_MAP.keys();

    for await (const topic of topics) {
      try {
        const topicOffsets = await this.admin.fetchTopicOffsets(topic);
        this.topicOffsets.set(topic, topicOffsets);
      } catch (e) {
        this.logger.error('Error fetching topic offset: ', topic);
      }
    }
  }

  private async subscribe(topic: string): Promise<void> {
    await this.consumer.subscribe({
      topic,
      fromBeginning: this.options.consumeFromBeginning || false,
    });
  }

  async send(message: KafkaMessageSend): Promise<RecordMetadata[]> {
    if (!this.producer) {
      this.logger.error('There is no producer, unable to send message.');
      return;
    }
    return await this.producer.send(message);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
    await this.admin.disconnect();
  }

  public getGroupIdSuffix(groupId: string): string {
    return groupId + '-client';
  }

  subscribeToResponseOf<T>(topic: string, instance: T): void {
    SUBSCRIBER_OBJECT_MAP.set(topic, instance);
  }

  /**
   * Runs the consumer and calls the consumers when a message arrives.
   */
  private bindAllTopicToConsumer(): void {
    const runConfig = this.options.consumerRunConfig
      ? this.options.consumerRunConfig
      : {};
    this.consumer.run({
      ...runConfig,
      eachMessage: async ({ topic, partition, message }) => {
        const objectRef = SUBSCRIBER_OBJECT_MAP.get(topic);
        const callback = SUBSCRIBER_MAP.get(topic);

        try {
          await callback.apply(objectRef, [topic, partition, message]);
        } catch (e) {
          this.logger.error(`Error for message ${topic}: ${e}`);

          // Log and throw to ensure we don't keep processing the messages when there is an error.
          throw e;
        }
      },
    });
    if (this.options.seek !== undefined) {
      this.seekTopics();
    }
  }

  private seekTopics(): void {
    Object.keys(this.options.seek).forEach((topic) => {
      console.log({
        topic,
        'this.topicOffsets': this.topicOffsets.get('notifications'),
      });
      if (this.topicOffsets.size == 0) return;
      const topicOffsets = this.topicOffsets.get(topic);
      const seekPoint = this.options.seek[topic];

      if (topicOffsets) {
        topicOffsets.forEach((topicOffset) => {
          let seek = String(seekPoint);

          // Seek by timestamp
          if (typeof seekPoint == 'object') {
            const time = seekPoint as Date;
            seek = time.getTime().toString();
          }

          // Seek to the earliest timestamp.
          if (seekPoint === 'earliest') {
            seek = topicOffset.low;
          }

          this.consumer.seek({
            topic,
            partition: topicOffset.partition,
            offset: seek,
          });
        });
      }
    });
  }

  async ensureTopicsExist(topics) {
    await this.admin.connect();

    try {
      const existingTopics = await this.admin.listTopics();

      const internalTopics = ['__consumer_offsets'];

      const providedTopicNames = topics.map((topic) => topic.name);

      const topicsToCreate = topics
        .filter((topic) => !existingTopics.includes(topic.name))
        .map((topic) => ({
          topic: topic.name,
          numPartitions: topic.numPartitions,
          replicationFactor: topic.replicationFactor,
        }));

      const topicsToDelete = existingTopics
        .filter((topic) => !internalTopics.includes(topic))
        .filter((topic) => !providedTopicNames.includes(topic));

      // Delete extra topics
      if (topicsToDelete.length > 0) {
        await this.admin.deleteTopics({
          topics: topicsToDelete,
        });
        console.log('Deleted extra topics:', topicsToDelete);
      }

      // Create missing topics
      if (topicsToCreate.length > 0) {
        await this.admin.createTopics({
          topics: topicsToCreate,
        });
        console.log(
          'Created missing topics:',
          topicsToCreate.map((t) => t.topic),
        );
      }

      if (topicsToDelete.length === 0 && topicsToCreate.length === 0) {
        console.log(
          'All topics are already consistent with the provided array.',
        );
      }
    } catch (error) {
      console.error('Error ensuring topics are consistent:', error);
    } finally {
      await this.admin.disconnect();
    }
  }
}
