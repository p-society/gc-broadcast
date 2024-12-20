import { Module } from '@nestjs/common';
import { RedisService } from 'src/services/redis/redis.service';
import { RedisModule } from 'src/services/redis/redis.module';
import { PresenceGateway } from './presence.gateway';
import { UsersModule } from 'src/services/apis/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
