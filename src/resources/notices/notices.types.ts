import { RequestUser } from 'src/auth/auth.types';
import { CreateNoticeValidator } from './notices.validator';
import { Nullable } from 'src/common.types';

export type CreateNoticeParam = InstanceType<typeof CreateNoticeValidator> & RequestUser;
export type NoticeType = 'CLASS' | 'ORGANIZATION' | 'SESSION' | 'COURSE';
export type NoticeAggregate = {
  id: number;
  title: string;
  content: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  referenceId: number;
};
