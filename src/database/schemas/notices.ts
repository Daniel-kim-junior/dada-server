import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 공지사항
 */
export const Notices = mysqlTable('notices', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(), // 공지 제목
  content: varchar('content', { length: 5000 }).notNull(), // 공지 내용
  ...DateColumns,
});
