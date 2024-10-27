import { Module } from '@nestjs/common';
import { PresenceGateway } from './presence.gateway';  
import { RedisModule } from '../redis/redis.module';    

@Module({
  imports: [RedisModule],  
  providers: [PresenceGateway, RedisService], 
})
export class PresenceModule {}
