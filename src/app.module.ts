import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { UsersModule } from './users/users.module';
import { LecturesModule } from './lectures/lectures.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ResourcesModule } from './resources/resources.module';
import { OrganiztionsModule } from './organizations/organizations.module';

@Module({
  imports: [
    AuthModule,
    ClassroomsModule,
    UsersModule,
    LecturesModule,
    ProfilesModule,
    OrganiztionsModule,
    ResourcesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
