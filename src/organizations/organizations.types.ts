import { RequestUser } from 'src/auth/auth.types';
import {
  AddProfileToOrganizationOwnershipValidator,
  AddProfileToRosterValidator,
  CreateOrganizationValidator,
} from './organizations.validator';
import { Nullable } from 'src/common.types';
import { ProfileRole } from 'src/users/profiles/profiles.types';
import { ORGANIZATION_OWNERSHIP_ROLES } from './constants';

export type CreateOrganizationParam = InstanceType<typeof CreateOrganizationValidator> &
  RequestUser;
export type AddProfileToRosterParam = InstanceType<typeof AddProfileToRosterValidator> &
  RequestUser & { organizationId: number };
export type AddProfileToOrganizationOwnershipParam = InstanceType<
  typeof AddProfileToOrganizationOwnershipValidator
> &
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

export type OrganizationRosterProfile = {
  nickname: string;
  role: ProfileRole;
  profilePicture: string;
  introduction: string;
};

export type OrganizationRoster = {
  id: number;
  profileId: string;
  organizationId: number;
  inviteProfileId: string;
};

export type OrganizationRosterWithOrganization = {
  organizationName: string;
  organizationId: number;
  organizationLogo: string;
  organizationDescription: string;
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

export type OrganizationRole = keyof typeof ORGANIZATION_OWNERSHIP_ROLES;
