import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';

@Module({
  providers: [LecturesService],
  controllers: [LecturesController]
})
export class LecturesModule {}
