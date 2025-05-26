import { Nullable } from 'src/common.types';
import { Session } from './sessions.types';
import { Database } from 'src/databases/databases.module';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { Classes, Sessions } from 'src/databases/schemas';
import { eq } from 'drizzle-orm';
import { isEmpty } from 'remeda';
import { Class } from '../classes/classes.types';

export type ISessionsRepository = {
  getSessionById(id: number): Promise<Nullable<Session>>;
  getSessionAndClassById(id: number): Promise<{
    sessions: Session;
    classes: Class;
  }>;
};

@Injectable()
export class SessionsRepositoryDrizzle implements ISessionsRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async getSessionAndClassById(id: number): Promise<{
    sessions: Session;
    classes: Class;
  }> {
    const found = await this._db
      .select()
      .from(Sessions)
      .innerJoin(Classes, eq(Sessions.classId, Classes.id))
      .where(eq(Sessions.id, id));
    return isEmpty(found) ? null : found[0];
  }

  public async getSessionById(id: number): Promise<Nullable<Session>> {
    const found = await this._db.select().from(Sessions).where(eq(Sessions.id, id));
    return isEmpty(found) ? null : found[0];
  }
}
