import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis/adapter/adapter.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const redisAdapter = new RedisIoAdapter();
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
