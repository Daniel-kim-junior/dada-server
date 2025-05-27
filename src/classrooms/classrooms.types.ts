import { Nullable } from 'src/common.types';

export type Classroom = {
  id: number;
  name: string;
  description: Nullable<string>;
  organizationId: number;
};
