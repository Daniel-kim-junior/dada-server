import { RequestUser } from 'src/auth/auth.types';
import {
  AddProfileToRosterValidator,
  CreateOrganizationValidator,
} from './organizations.validator';
import { Nullable } from 'src/common.types';

export type CreateOrganizationParam = InstanceType<typeof CreateOrganizationValidator> &
  RequestUser;
export type AddProfileToRosterParam = InstanceType<typeof AddProfileToRosterValidator> &
  RequestUser & { organizationId: number };

export type OrganizationOwnership = {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  id: number;
  profileId: string;
  organizationId: number;
  role: string;
};

export type Organization = {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  description: string;
  logo: string;
};

export type OrganizationRoster = {
  profileId: string;
  organizationId: number;
};

export type IOrganizationOwnershipLoader = {
  findOwnershipByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationOwnership>>;
};
