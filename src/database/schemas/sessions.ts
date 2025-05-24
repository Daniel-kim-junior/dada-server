import { int, mysqlTable, serial } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

/**
 * 회차
 */
export const Sessions = mysqlTable('sessions', {
  id: serial('id').primaryKey(), // 회차 ID
  classId: serial('class_id').notNull(), // 수업 ID
  sessionNumber: int('session_number').notNull(), // 회차 번호
  ...DateColumns,
});
