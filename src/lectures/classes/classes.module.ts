import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Symbols } from 'symbols';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { ClassesRepositoryDrizzle } from './classes.repository';
import { ProfilesModule } from 'src/users/profiles/profiles.module';

@Module({
  imports: [OrganizationsModule, ProfilesModule],
  controllers: [ClassesController],
  providers: [
    {
      provide: Symbols.ClassesService,
      useClass: ClassesService,
    },
    {
      provide: Symbols.ClassesRepository,
      useClass: ClassesRepositoryDrizzle,
    },
    {
      provide: Symbols.ClassesLoader,
      useExisting: Symbols.ClassesService,
    },
  ],
  exports: [Symbols.ClassesLoader],
})
export class ClassesModule {}
