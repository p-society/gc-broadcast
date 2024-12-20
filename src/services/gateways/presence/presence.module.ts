import { Module } from '@nestjs/common';
import { RedisService } from 'src/services/redis/redis.service';
import { RedisModule } from 'src/services/redis/redis.module';
import { PresenceGateway } from './presence.gateway';

@Module({
  imports: [RedisModule],
  providers: [PresenceGateway, RedisService],
})
export class PresenceModule {}
