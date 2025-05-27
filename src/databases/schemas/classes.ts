import { bigint, mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const Classes = mysqlTable('classes', {
  id: serial('id').primaryKey(), // 수업 ID
  organizationId: bigint('organization_id', { mode: 'number' }).notNull(), // 조직 ID
  name: varchar('name', { length: 100 }).notNull(), // 수업 이름
  description: varchar('description', { length: 500 }), // 수업 설명
  openDate: timestamp('open_date').notNull(), // 수업 시작일
  closeDate: timestamp('close_date').notNull(), // 수업 종료일
  ...DateColumns,
});
