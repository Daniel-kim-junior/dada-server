import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Symbols } from 'symbols';
import { CoursesRepositoryDrizzle } from './courses.repository';

@Module({
  imports: [],
  controllers: [CoursesController],
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
      useClass: CoursesRepositoryDrizzle, // Assuming CoursesService implements ICoursesRepository
    },
    {
      provide: Symbols.CourseProfilesLoader,
      useExisting: Symbols.CoursesService,
    },
  ],
  exports: [Symbols.CoursesLoader, Symbols.CourseProfilesLoader],
})
export class CoursesModule {}
