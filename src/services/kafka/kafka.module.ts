import { DynamicModule, Global, Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaModuleOption } from 'src/types/kafka';
import { KafkaService } from './kafka.service';

// @Global()
// @Module({
//   imports: [ConfigModule],
//   providers: [ProducerService, ConsumerService, ConfigService],
//   exports: [ProducerService, ConsumerService],
// })
// export class KafkaModule { }

@Global()
@Module({})
export class KafkaModulev2 {
  static register(options: KafkaModuleOption[]): DynamicModule {
    const clients = (options || []).map((item) => ({
      provide: item.name,
      useValue: new KafkaService(item.options),
    }));

    return {
      module: KafkaModulev2,
      providers: clients,
      exports: clients,
    };
  }
}
