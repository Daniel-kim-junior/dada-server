import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { UsersModule } from './users/users.module';
import { LecturesModule } from './lectures/lectures.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ResourcesModule } from './resources/resources.module';
import { OrganiztionsModule } from './organizations/organizations.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/databases.module';
import { AppController } from './app.controller';
import { mysqlConfig } from './mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      load: [mysqlConfig],
    }),
    DatabaseModule,
    AuthModule,
    ClassroomsModule,
    UsersModule,
    LecturesModule,
    ProfilesModule,
    OrganiztionsModule,
    ResourcesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
