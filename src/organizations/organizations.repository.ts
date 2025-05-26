import { Database } from 'src/databases/databases.module';
import { CreateClassParam, CreateOrganizationParam } from './organizations.types';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { Classes, OrganizationOwnerships, Organizations } from 'src/databases/schemas';
import { ORGANIZATION_OWNERSHIP_ROLES } from './constants';

export type IOrganizationsRepository = {
  createClass(param: CreateClassParam): Promise<void>;
  createOrganizationAndOwnership(param: CreateOrganizationParam): Promise<void>;
};

@Injectable()
export class OrganizationsRepositoryDrizzle implements IOrganizationsRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async createOrganizationAndOwnership(param: CreateOrganizationParam): Promise<void> {
    const { logo, name, description, profileId } = param;
    await this._db.transaction(async (tx) => {
      const [organization] = await tx
        .insert(Organizations)
        .values({
          logo,
          name,
          description,
        })
        .$returningId();
      await tx.insert(OrganizationOwnerships).values({
        organizationId: organization.id,
        role: ORGANIZATION_OWNERSHIP_ROLES.MAIN,
        profileId,
      });
    });
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
