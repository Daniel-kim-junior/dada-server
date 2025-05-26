import { RequestUser } from 'src/auth/auth.types';
import { CreateClassValidator } from './classes.validator';
import { Nullable } from 'src/common.types';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> & RequestUser;
export type IClassesLoader = {
  getClassById(id: number): Promise<Class>;
};

export type Class = {
  id: number;
  name: string;
  description: Nullable<string>;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
};
