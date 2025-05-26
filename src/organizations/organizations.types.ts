import { RequestUser } from 'src/auth/auth.types';
import { CreateClassValidator, CreateOrganizationValidator } from './organizations.validator';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> &
  RequestUser & {
    organizationId: number;
  };

export type CreateOrganizationParam = InstanceType<typeof CreateOrganizationValidator> &
  RequestUser;
