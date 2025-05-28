import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Symbols } from 'symbols';
import { SessionsRepositoryDrizzle } from './sessions.repository';
import { ClassesModule } from '../classes/classes.module';
import { CoursesModule } from '../courses/courses.module';
import { ProfilesModule } from 'src/users/profiles/profiles.module';

@Module({
  imports: [ClassesModule, CoursesModule, ProfilesModule],
  controllers: [SessionsController],
  providers: [
    {
      provide: Symbols.SessionsService,
      useClass: SessionsService,
    },
    {
      provide: Symbols.SessionsLoader,
      useExisting: Symbols.SessionsService,
    },
    {
      provide: Symbols.SessionsRepository,
      useClass: SessionsRepositoryDrizzle,
    },
  ],

  exports: [Symbols.SessionsLoader],
})
export class SessionsModule {}
