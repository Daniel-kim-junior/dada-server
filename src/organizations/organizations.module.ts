import { Module } from '@nestjs/common';
import { OrganiztionsController } from './organiztions.controller';
import { OrganiztionsService } from './organizations.service';

@Module({
  controllers: [OrganiztionsController],
  providers: [OrganiztionsService],
})
export class OrganiztionsModule {}
