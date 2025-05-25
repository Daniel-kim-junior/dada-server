import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const Auth = mysqlTable('auth', {
  userId: varchar('user_id', { length: 36 }).primaryKey(), // UUID
  identifier: varchar('identifier', { length: 255 }).notNull(), // identifier
  password: varchar('password', { length: 255 }).notNull(), // hashed password
  type: varchar('type', { length: 50 }).notNull(), // 'local', 'google', etc.
  ...DateColumns,
});
