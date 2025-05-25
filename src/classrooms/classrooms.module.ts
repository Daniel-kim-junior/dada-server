import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { DatabaseModule } from 'src/databases/databases.module';
import { Symbols } from 'symbols';
import { ClassroomRepositoryDrizzle } from './classrooms.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: Symbols.ClassroomsService,
      useClass: ClassroomsService,
    },
    {
      provide: Symbols.ClassroomsRepository,
      useClass: ClassroomRepositoryDrizzle,
    },
  ],
  controllers: [ClassroomsController],
})
export class ClassroomsModule {}
