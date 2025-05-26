import { bigint, index, int, mysqlTable, serial } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

/**
 * 회차
 */
export const Sessions = mysqlTable(
  'sessions',
  {
    id: serial('id').primaryKey(), // 회차 ID
    classId: bigint('class_id', { mode: 'number' }).notNull(), // 수업 ID
    sessionNumber: int('session_number').notNull(), // 회차 번호
    ...DateColumns,
  },
  (table) => ({
    classIdIdx: index('class_id_idx').on(table.classId),
  })
);
