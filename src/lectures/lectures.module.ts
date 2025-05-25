import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { SessionsModule } from './sessions/sessions.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  providers: [LecturesService],
  controllers: [LecturesController],
  imports: [SessionsModule, ClassesModule, CoursesModule],
})
export class LecturesModule {}
