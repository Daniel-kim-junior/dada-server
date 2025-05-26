import { Database } from 'src/databases/databases.module';
import {
  AddProfileToRosterParam,
  CreateOrganizationParam,
  Organization,
  OrganizationOwnership,
  OrganizationRole,
  OrganizationRoster,
  OrganizationRosterProfile,
  OrganizationRosterWithOrganization,
} from './organizations.types';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import {
  Classes,
  OrganizationOwnerships,
  OrganizationRosters,
  Organizations,
  Profiles,
} from 'src/databases/schemas';
import { ORGANIZATION_OWNERSHIP_ROLES } from './constants';
import { Nullable } from 'src/common.types';
import { and, eq } from 'drizzle-orm';

export type IOrganizationsRepository = {
  createOrganizationAndOwnership(param: CreateOrganizationParam): Promise<void>;
  addProfileToRoster(param: AddProfileToRosterParam): Promise<void>;
  findAllOrganizations(): Promise<Organization[]>;
  findRostersByOrgnizationId(organizationId: number): Promise<OrganizationRosterProfile[]>;
  createOrganizationOwnership({
    organizationId,
    addProfileId,
    role,
  }: {
    organizationId: number;
    addProfileId: string;
    role: OrganizationRole;
  }): Promise<void>;
  findOwnershipByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationOwnership>>;
  findOrganizationById(organizationId: number): Promise<Nullable<Organization>>;
  findRosterByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationRoster>>;
  findRostersByProfileId(profileId: string): Promise<OrganizationRosterWithOrganization[]>;
};

@Injectable()
export class OrganizationsRepositoryDrizzle implements IOrganizationsRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async createOrganizationOwnership({
    organizationId,
    addProfileId,
    role,
  }: {
    organizationId: number;
    addProfileId: string;
    role: OrganizationRole;
  }): Promise<void> {
    await this._db.insert(OrganizationOwnerships).values({
      organizationId,
      profileId: addProfileId,
      role,
    });
  }

  public async findRostersByOrgnizationId(
    organizationId: number
  ): Promise<OrganizationRosterProfile[]> {
    return await this._db
      .select({
        nickname: Profiles.nickname,
        role: Profiles.role,
        profilePicture: Profiles.profilePicture,
        introduction: Profiles.introduction,
      })
      .from(OrganizationRosters)
      .innerJoin(Profiles, eq(Profiles.id, OrganizationRosters.profileId))
      .where(eq(OrganizationRosters.organizationId, organizationId));
  }
  public async findAllOrganizations(): Promise<Organization[]> {
    return await this._db.select().from(Organizations);
  }

  public async findRostersByProfileId(
    profileId: string
  ): Promise<OrganizationRosterWithOrganization[]> {
    return this._db
      .select({
        organizationName: Organizations.name,
        organizationId: Organizations.id,
        organizationLogo: Organizations.logo,
        organizationDescription: Organizations.description,
      })
      .from(OrganizationRosters)
      .innerJoin(Organizations, eq(Organizations.id, OrganizationRosters.organizationId))
      .where(eq(OrganizationRosters.profileId, profileId));
  }

  public async findRosterByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationRoster>> {
    const found = await this._db
      .select()
      .from(OrganizationRosters)
      .where(
        and(
          eq(OrganizationRosters.profileId, profileId),
          eq(OrganizationRosters.organizationId, organizationId)
        )
      );
    return found.length > 0 ? found[0] : null;
  }

  public async findOrganizationById(organizationId: number): Promise<Nullable<Organization>> {
    const found = await this._db
      .select()
      .from(Organizations)
      .where(eq(Organizations.id, organizationId));
    return found.length > 0 ? found[0] : null;
  }

  public async addProfileToRoster(param: AddProfileToRosterParam): Promise<void> {
    const { organizationId, addProfileId, profileId: inviteProfileId } = param;
    await this._db.insert(OrganizationRosters).values({
      organizationId,
      profileId: addProfileId,
      inviteProfileId,
    });
  }

  public async findOwnershipByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationOwnership>> {
    const found = await this._db
      .select()
      .from(OrganizationOwnerships)
      .where(
        and(
          eq(OrganizationOwnerships.profileId, profileId),
          eq(OrganizationOwnerships.organizationId, organizationId)
        )
      );
    return found.length > 0 ? found[0] : null;
  }

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
}
