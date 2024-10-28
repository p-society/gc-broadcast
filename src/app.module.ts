import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdapterModule } from './redis/adapter/adapter.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    RedisModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://soubhik:soubhik@sports.vj9j4tb.mongodb.net/?retryWrites=true&w=majority&appName=Sports'),  // Removed useNewUrlParser
    AuthModule,
    UsersModule,
    AdapterModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule {}
