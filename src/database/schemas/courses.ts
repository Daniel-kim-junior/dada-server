import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

/**
 * 분반
 */
export const Cources = mysqlTable('courses', {
  id: serial('id').primaryKey(),
  sessionId: serial('session_id').notNull(), // 회차 ID
  name: varchar('name', { length: 255 }).notNull(), // 분반 이름
  description: varchar('description', { length: 500 }), // 분반 설명
  ...DateColumns,
});
