import { int, mysqlTable, primaryKey, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 공지사항 소유권
 * 이 테이블은 공지사항에 대한 소유권 정보를 저장합니다.
 * 소유권 ID, 소유권 유형(예: 조직, 분반, 수업, 회차 등), 생성 및 수정 날짜를 포함합니다.
 * 소유자 프로필 id
 */
export const NoticeOwnerships = mysqlTable(
  'notice_ownerships',
  {
    ownershipId: int('ownership_id').notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    registerProfileId: varchar('register_profile_id', { length: 36 }).notNull(), // UUID of the profile that owns the notice
    noticeId: serial('notice_id').notNull(), // ID of the notice
    ...DateColumns,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ownershipId, table.type] }),
  })
);
