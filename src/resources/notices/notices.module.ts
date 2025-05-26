import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { Symbols } from 'symbols';
import { ProfilesModule } from 'src/users/profiles/profiles.module';
import { NoticesRepositoryDrizzle } from './notices.repository';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { SessionsModule } from 'src/lectures/sessions/sessions.module';
import { ClassesModule } from 'src/lectures/classes/classes.module';
import { CoursesModule } from 'src/lectures/courses/courses.module';
import { NoticesReferenceChecker } from './notices-reference-checker';

@Module({
  imports: [ProfilesModule, OrganizationsModule, ClassesModule, SessionsModule, CoursesModule],
  controllers: [NoticesController],
  providers: [
    {
      provide: Symbols.NoticesService,
      useClass: NoticesService,
    },
    {
      provide: Symbols.NoticeRepository,
      useClass: NoticesRepositoryDrizzle,
    },
    NoticesReferenceChecker,
  ],
  exports: [],
})
export class NoticesModule {}
