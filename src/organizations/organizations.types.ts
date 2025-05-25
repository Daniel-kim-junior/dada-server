import { RequestUser } from 'src/auth/auth.types';
import { CreateClassValidator } from './organizations.validator';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> &
  RequestUser & {
    organizationId: number;
  };
