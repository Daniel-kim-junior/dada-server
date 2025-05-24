import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { UsersModule } from './users/users.module';
import { LecturesModule } from './lectures/lectures.module';
import { ProfilesModule } from './profiles/profiles.module';
import { OrganiztionsModule } from './organiztions/organiztions.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [AuthModule, ClassroomsModule, UsersModule, LecturesModule, ProfilesModule, OrganiztionsModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
