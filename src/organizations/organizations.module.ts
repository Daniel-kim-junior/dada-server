import { Module } from '@nestjs/common';
import { OrganiztionsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { DatabaseModule } from 'src/databases/databases.module';
import { Symbols } from 'symbols';
import { OrganizationsRepositoryDrizzle } from './organizations.repository';
import { ProfilesModule } from 'src/users/profiles/profiles.module';

@Module({
  imports: [DatabaseModule, ProfilesModule],
  controllers: [OrganizationsController],

  providers: [
    {
      provide: Symbols.OrganizationsService,
      useClass: OrganiztionsService,
    },
    {
      provide: Symbols.OrganizationsRepository,
      useClass: OrganizationsRepositoryDrizzle,
    },
  ],
})
export class OrganiztionsModule {}
