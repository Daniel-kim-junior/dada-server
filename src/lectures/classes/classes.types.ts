import { RequestUser } from 'src/auth/auth.types';
import { CreateClassValidator } from './classes.validator';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> & RequestUser;
