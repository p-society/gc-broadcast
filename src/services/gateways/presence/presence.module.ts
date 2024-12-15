import { Module } from '@nestjs/common';
import { PresenceGatewayv1 } from './presence.gateway';
import { RedisService } from 'src/services/apis/redis/redis.service';
import { RedisModule } from 'src/services/apis/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [PresenceGatewayv1, RedisService],
})
export class PresenceModule {}
