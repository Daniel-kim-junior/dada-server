import { Global, Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { Symbols } from 'symbols';

@Global()
@Module({
  providers: [RedisProvider],
  exports: [Symbols.RedisProvider],
})
export class RedisModule {}
