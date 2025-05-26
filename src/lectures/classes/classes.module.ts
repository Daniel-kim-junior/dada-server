import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Symbols } from 'symbols';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { ClassesRepositoryDrizzle } from './classes.repository';

@Module({
  imports: [OrganizationsModule],
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
  ],
  exports: [],
})
export class ClassesModule {}
