import { Module } from '@nestjs/common';
import { OrganiztionsService } from './organizations.service';
import { OrganiztionsController } from './organizations.controller';

@Module({
  controllers: [OrganiztionsController],
  providers: [OrganiztionsService],
})
export class OrganiztionsModule {}
