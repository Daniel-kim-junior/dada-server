import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Symbols } from 'symbols';
import { ClassroomRepositoryDrizzle } from './classrooms.repository';

@Module({
  imports: [],
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
  controllers: [],
})
export class ClassroomsModule {}
