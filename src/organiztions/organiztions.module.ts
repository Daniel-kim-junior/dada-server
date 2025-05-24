import { Module } from '@nestjs/common';
import { OrganiztionsController } from './organiztions.controller';
import { OrganiztionsService } from './organiztions.service';

@Module({
  controllers: [OrganiztionsController],
  providers: [OrganiztionsService]
})
export class OrganiztionsModule {}
