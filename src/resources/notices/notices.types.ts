import { RequestUser } from 'src/auth/auth.types';
import { CreateNoticeValidator } from './notices.validator';

export type CreateNoticeParam = InstanceType<typeof CreateNoticeValidator> & RequestUser;
export type NoticeType = 'CLASS' | 'ORGANIZATION' | 'SESSION' | 'COURSE';
