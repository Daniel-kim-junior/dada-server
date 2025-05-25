import { and, eq } from 'drizzle-orm';
import { Database } from 'src/databases/databases.module';
import { Auth } from 'src/databases/schemas';
import { AuthEntity } from './auth.entity';
import { Nullable } from 'src/common.types';
import { Inject } from '@nestjs/common';
import { Symbols } from 'symbols';

export type IAuthRepository = {
  getAuthByIdentifierAndType(identifier: string, type: string): Promise<Nullable<AuthEntity>>;
};

export class AuthRepositoryDrizzle implements IAuthRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async getAuthByIdentifierAndType(
    identifier: string,
    type: string
  ): Promise<Nullable<AuthEntity>> {
    const auth = await this._db
      .select()
      .from(Auth)
      .where(and(eq(Auth.identifier, identifier), eq(Auth.type, type)))
      .limit(1);

    return auth.length > 0 ? AuthEntity.of(auth[0]) : null;
  }
}
