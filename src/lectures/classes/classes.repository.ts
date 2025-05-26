import { Inject, Injectable } from '@nestjs/common';
import { CreateClassParam } from './classes.types';
import { Symbols } from 'symbols';
import { Database } from 'src/databases/databases.module';
import { Classes } from 'src/databases/schemas';

export interface IClassesRepository {
  createClass(param: CreateClassParam): Promise<void>;
}

@Injectable()
export class ClassesRepositoryDrizzle implements IClassesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

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
