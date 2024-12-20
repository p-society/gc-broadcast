// src/redis/redis.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  constructor(private readonly configService: ConfigService) {}
  async onModuleInit() {
    this.client = createClient({
      password: this.configService.get<string>('REDIS_PASSWORD'),
      socket: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      },
    });

    await this.client.connect();

    const pong = await this.client.ping();
    console.log('Redis connection established:', pong);
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('Redis disconnected.');
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async keys(pattern: string): Promise<string[] | null> {
    return await this.client.keys(pattern);
  }
  async set(
    key: string,
    value: string,
    expirationInSeconds?: number,
  ): Promise<string> {
    if (expirationInSeconds !== undefined) {
      return await this.client.set(key, value, { EX: expirationInSeconds });
    }

    return await this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }

  async mget(keys: string[]): Promise<(string | null)[]> {
    if (keys.length === 0) {
      return [];
    }
    return await this.client.mGet(keys);
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    return await this.client.sAdd(key, members);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.client.sMembers(key);
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    return await this.client.sRem(key, members);
  }

  async sismember(key: string, member: string): Promise<boolean> {
    return await this.client.sIsMember(key, member);
  }

  async sendCommand<T = any>(command: string[]): Promise<T> {
    return await this.client.sendCommand(command);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    const result = await this.client.expire(key, seconds);
    return result;
  }

  async ttl(key: string): Promise<number> {
    return await this.client.ttl(key);
  }
}
