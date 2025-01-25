import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './services/redis/adapter/adapter.service';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const redisAdapter = new RedisIoAdapter();
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);

  const httpServer = app.getHttpServer();
  app.useWebSocketAdapter(new IoAdapter(httpServer));

  const port = process.env.PORT || 3030;
  await app.listen(port);
}

bootstrap();
