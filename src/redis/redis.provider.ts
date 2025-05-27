import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { Symbols } from 'symbols';

export const RedisProvider: Provider = {
  provide: Symbols.RedisProvider,
  useFactory: () => {
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB) || 0,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
    });
    redis.on('connect', () => {
      console.log('Redis 연결 성공');
    });

    redis.on('error', (err) => {
      console.error('Redis 연결 오류:', err);
    });
    return redis;
  },
};
