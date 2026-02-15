/* eslint-disable */
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private client?: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_URL;

    // Disable Redis if not configured or explicitly disabled
    if (!redisUrl || redisUrl === 'disabled') {
      console.log('Redis disabled');
      return;
    }

    this.client = new Redis(redisUrl, {
      tls: redisUrl.startsWith('rediss://') ? {} : undefined,
    });
  }

  async set(key: string, value: string, ttl: number) {
    if (!this.client) return;
    return this.client.set(key, value, 'EX', ttl);
  }

  async get(key: string) {
    if (!this.client) return null;
    return this.client.get(key);
  }

  async del(key: string) {
    if (!this.client) return;
    return this.client.del(key);
  }
}