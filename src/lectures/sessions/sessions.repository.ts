import { Nullable } from 'src/common.types';
import { Session } from './sessions.types';
import { Database } from 'src/databases/databases.module';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { Sessions } from 'src/databases/schemas';
import { eq } from 'drizzle-orm';
import { isEmpty } from 'remeda';

export type ISessionsRepository = {
  getSessionById(id: number): Promise<Nullable<Session>>;
};

@Injectable()
export class SessionsRepositoryDrizzle implements ISessionsRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async getSessionById(id: number): Promise<Nullable<Session>> {
    const found = await this._db.select().from(Sessions).where(eq(Sessions.id, id));
    return isEmpty(found) ? null : found[0];
  }
}
