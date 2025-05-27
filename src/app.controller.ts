import { Controller, Get, Inject } from '@nestjs/common';
import { Symbols } from 'symbols';
import Redis from 'ioredis';

@Controller('app')
export class AppController {
  public constructor(@Inject(Symbols.RedisProvider) private readonly _redis: Redis) {}
  @Get()
  public async healthCheck(): Promise<void> {
    // Redis 연결 상태를 확인합니다.
    try {
      await this._redis.ping();
      console.log('Redis is connected');
    } catch (error) {
      console.error('Redis connection error:', error);
      throw new Error('Redis connection failed');
    }
  }
}
