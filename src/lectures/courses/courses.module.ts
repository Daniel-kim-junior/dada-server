import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Symbols } from 'symbols';
import { CoursesRepositoryDrizzle } from './courses.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: Symbols.CoursesService,
      useClass: CoursesService,
    },
    {
      provide: Symbols.CoursesLoader,
      useExisting: Symbols.CoursesService,
    },
    {
      provide: Symbols.CoursesRepository,
      useClass: CoursesRepositoryDrizzle,
    },
    {
      provide: Symbols.CourseProfilesLoader,
      useExisting: Symbols.CoursesService,
    },
    {
      provide: Symbols.CourseProfilesMutator,
      useExisting: Symbols.CoursesService,
    },
  ],
  exports: [Symbols.CoursesLoader, Symbols.CourseProfilesLoader, Symbols.CourseProfilesMutator],
})
export class CoursesModule {}
