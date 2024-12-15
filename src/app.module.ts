import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/apis/auth/auth.module';
import { AdapterModule } from './services/apis/redis/adapter/adapter.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './services/apis/redis/redis.module';
import { UsersModule } from './services/apis/users/users.module';

@Module({
  imports: [
    RedisModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://soubhik:soubhik@sports.vj9j4tb.mongodb.net/?retryWrites=true&w=majority&appName=Sports',
    ), 
    UsersModule,
    AuthModule,
    AdapterModule,
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
