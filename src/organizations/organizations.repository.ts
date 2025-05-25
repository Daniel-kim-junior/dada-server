import { Database } from 'src/databases/databases.module';
import { CreateClassParam } from './organizations.types';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { Classes } from 'src/databases/schemas';

export type IOrganizationsRepository = {
  createClass(param: CreateClassParam): Promise<void>;
};

@Injectable()
export class OrganizationsRepositoryDrizzle implements IOrganizationsRepository {
  public constructor(@Inject(Symbols.Database) private readonly database: Database) {}

  public async createClass(param: CreateClassParam): Promise<void> {
    const { organizationId, name, description } = param;
    await this.database
      .insert(Classes)
      .values({
        organizationId,
        name,
        description,
      })
      .execute();
  }
}
