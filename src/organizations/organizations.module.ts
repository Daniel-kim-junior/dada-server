import { Module } from '@nestjs/common';
import { OrganiztionsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganiztionsService],
})
export class OrganiztionsModule {}
