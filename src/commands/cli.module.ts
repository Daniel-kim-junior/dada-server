import { Module } from '@nestjs/common';
import { GenerateHashCommand } from './generate-hash.command';

@Module({
  providers: [GenerateHashCommand],
})
export class CliModule {}
