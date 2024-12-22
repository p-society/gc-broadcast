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
import { ReactionsModule } from './services/apis/reactions/reactions.module';
import { ProfilesModule } from './services/apis/profiles/profiles.module';
import { QueueModule } from './services/bullmq/queue.module';
import { BullModule } from '@nestjs/bullmq';
import { GenerateOtpModule } from './services/apis/generateOtp/generateOtp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    RedisModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    QueueModule,
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
    AdapterModule,
    ProfilesModule,
    ReactionsModule,
    GenerateOtpModule,
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
