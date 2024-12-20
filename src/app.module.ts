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
            brokers: ['gc-broadcast-gcbroadcast.i.aivencloud.com:24100'],
            sasl: {
              mechanism: 'scram-sha-256',
              username: 'avnadmin',
              password: 'AVNS_dJQDstsgKDn7FnlBrWJ',
            },
            ssl: {
              ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUNT1SK3mbJMQ3GRSd3r6kjKB6Hb8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOWE0ZWNiZTYtNDkxNS00NDE1LWIyM2UtYjFiYThlN2Fm
NGU4IFByb2plY3QgQ0EwHhcNMjQxMjIwMTEwNDExWhcNMzQxMjE4MTEwNDExWjA6
MTgwNgYDVQQDDC85YTRlY2JlNi00OTE1LTQ0MTUtYjIzZS1iMWJhOGU3YWY0ZTgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJ/yyw9u
wvBsh/jJ/CApjdg0lAY9XS8gVR8AMrb/OI3Ee2kT2i2cV+2yv8S5zjcdYkA4qvi6
heGbbzLRIBMRvBNZBvp9tx0JYh3eHvYw/v3PqgEMKAyfWzHc95iTtjhiueleAbOC
Ddp00n3Ba3y3YCRQzaNM17Y2qRGRhZNZFUIi3h5jjTjU3B+Q9geMSh72zs6J4P17
0gX3UZdCxkkctoRrrHm19dqKtNGrWHxEt4u52VhlGflh43+OLdWDFj2dzMZL7arC
p9GshgASjq03tDJHVgHpx31bA9z9hEC7m38fFQdIfxRZOdrZN1oVxIyxorz7LqaS
wR5HUGV6TvjDkNz5AbVqgcrAXKCjDd2YQOZPQWmtyIqSLhyfZZA2jKS5Xqz7L6X3
Tu+1lylCppN82nZVfNXrFPqkZEzCjbd4xeKTlEg3kkzlm5GbU1ITH5QIScWC+qgy
oHA8qXVSubROussEILp8WL5rwf1k+JbHVwsK1F48MqHVZ4+ek8Y8yctDawIDAQAB
oz8wPTAdBgNVHQ4EFgQUzkfGKywQ88ByOVTjx2O7zEYd0E0wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFRShYpapDQ5RnCn
3EedWCBP8HucYgYi755vEYLU7bls9uM2PyyolLYMSZvsSC7KeBqlylNpHwHvnjM+
rq3ke1lbImdETm6kYX2mzo32ZSCi5lHEf73kunpiv1kiAyX6bPbuGQLJXyMt+xXI
nC8hicw22kReRWAoRP1F/ZRA2ChMkFzpN2Vecym/zK5O3/0We2NVnx6tqRX18dZF
C0y+S/Wn7KZP8PbWj1nXLtbaRa2vlCSBJFB8QXNwKXjyK0oZXNw6gc8ocbU2BWm+
SVUoVYPt785FxnwtzskPPHbSvrTNurfgSlTWDu9xSn6V0M1th9uY3GXEF7ZyaLlY
SKqtKkVsKlBD/Sc5gjqDR+pGv0rjD5QXAt0N6lJPLkrG2xug+43GJPqEnnzdoi1A
kvT5uVF9UJwKn4dc0ZxMUrAcHYGwXLAfWphBACdgTr2PoYSItvTP0pZ3OqekTMvl
ziK/VCaa29YKVUrWPKD4lsr7s7fVvoquM/drW+kTZPbGwKaTxg==
-----END CERTIFICATE-----
`,
            },
            retry: {
              retries: 20,
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
