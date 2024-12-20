import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/apis/auth/auth.module';
import { AdapterModule } from './services/redis/adapter/adapter.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './services/redis/redis.module';
import { UsersModule } from './services/apis/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendOtpModule } from './services/apis/sendOtp/sendOtp.module';
import { ReactionsModule } from './services/apis/reactions/reactions.module';
import { KafkaModulev2 } from './services/kafka/kafka.module';
import { ProfilesModule } from './services/apis/profiles/profiles.module';
import { TOPIC_NAME } from './services/kafka/consumer/consumer.service';
import fs from 'fs';
import os from 'os';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    RedisModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    SendOtpModule,
    AdapterModule,
    ProfilesModule,
    ReactionsModule,
    KafkaModulev2.register([
      {
        name: 'KAFKA_SERVICE_1',
        options: {
          client: {
            clientId: 'gc-broadcast-server',
            brokers: ['localhost:9092'],
            retry: {
              retries: 2,
              initialRetryTime: 30,
            },
          },
          consumer: {
            groupId: 'notification',
            allowAutoTopicCreation: true,
          },
          seek: {
            [TOPIC_NAME]: new Date('2020-05-21'),
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
