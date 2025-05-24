import { Module } from '@nestjs/common';
import { Symbols } from 'symbols';
import { ConfigReaderDotEnv } from './config.reader.dotenv';

@Module({
  providers: [
    {
      provide: Symbols.ConfigReader,
      useClass: ConfigReaderDotEnv,
    },
  ],
  exports: [Symbols.ConfigReader],
})
export class ConfigModule {}
