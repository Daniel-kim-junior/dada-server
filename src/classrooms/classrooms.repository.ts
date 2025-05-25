import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/databases/databases.module';
import { Symbols } from 'symbols';

export interface IClassRoomRepository {}

@Injectable()
export class ClassroomRepositoryDrizzle implements IClassRoomRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
}
