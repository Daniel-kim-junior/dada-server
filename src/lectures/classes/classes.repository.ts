import { Inject, Injectable } from '@nestjs/common';
import { Class, CreateClassParam } from './classes.types';
import { Symbols } from 'symbols';
import { Database } from 'src/databases/databases.module';
import { Classes } from 'src/databases/schemas';
import { Nullable } from 'src/common.types';
import { eq } from 'drizzle-orm';
import { isEmpty } from 'remeda';

export interface IClassesRepository {
  createClass(param: CreateClassParam): Promise<void>;
  getClassById(id: number): Promise<Nullable<Class>>;
}

@Injectable()
export class ClassesRepositoryDrizzle implements IClassesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async getClassById(id: number): Promise<Nullable<Class>> {
    const found = await this._db.select().from(Classes).where(eq(Classes.id, id));

    return isEmpty(found) ? null : found[0];
  }

  public async createClass(param: CreateClassParam): Promise<void> {
    const { organizationId, name, description } = param;

    await this._db
      .insert(Classes)
      .values({
        organizationId,
        name,
        description,
      })
      .execute();
  }
}
