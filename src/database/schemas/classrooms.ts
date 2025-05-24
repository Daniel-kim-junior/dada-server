import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 강의실
 */
export const Classrooms = mysqlTable('classrooms', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }),
  organizationId: serial('organization_id').notNull(),
  ...DateColumns,
});
