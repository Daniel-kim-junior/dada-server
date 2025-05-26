import { NoticeType } from './notices.types';

export const NOTICE_TYPE = {
  CLASS: 'CLASS',
  ORGANIZATION: 'ORGANIZATION',
  SESSION: 'SESSION',
  COURSE: 'COURSE',
} as Record<NoticeType, NoticeType>;

export const NOTICE_TYPE_LIST: NoticeType[] = Object.values(NOTICE_TYPE);
