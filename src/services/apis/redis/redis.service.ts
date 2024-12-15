// src/redis/redis.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: 'redis://default:EqmpkrOkVzEZvneMBKfZtHAiDBPZLhQm@junction.proxy.rlwy.net:25664',
    });

    await this.client.connect();

    const pong = await this.client.ping();
    console.log('Redis connection established:', pong);
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('Redis disconnected.');
  }

  async get(k: string): Promise<string | null> {
    return await this.client.get(k);
  }

  async set(
    key: string,
    value: string,
    expirationInSeconds?: number,
  ): Promise<any> {
    if (expirationInSeconds) {
      return await this.client.set(key, value, {
        EX: expirationInSeconds,
      });
    }
    return await this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }

  async mget(keys: string[]): Promise<string[]> {
    if (keys.length === 0) {
      return [];
    }

    return await this.client.mGet(keys);
  }
  async sendCommand<T = any>(pattern: string): Promise<T[]> {
    const command = ['SCAN', '0', 'MATCH', pattern, 'COUNT', '100'];
    const result: Array<any> = await this.client.sendCommand(command);

    return Array.from(result[1] || []);
  }
}
