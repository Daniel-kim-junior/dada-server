import { RequestUser } from 'src/auth/auth.types';
import {
  AddProfileToRosterValidator,
  CreateClassValidator,
  CreateOrganizationValidator,
} from './organizations.validator';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> &
  RequestUser & {
    organizationId: number;
  };

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
