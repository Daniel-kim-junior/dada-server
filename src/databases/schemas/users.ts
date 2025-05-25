import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const Users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  phoneNumber: varchar('phone_number', { length: 30 }).notNull(),
  name: varchar('name', { length: 30 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  birth: varchar('birth', { length: 10 }).notNull(), // YYYY-MM-DD
  agreedPrivacy: varchar('agreed_privacy', { length: 5 }).notNull(), // 'true' or 'false'
  agreedThirdParty: varchar('agreed_third_party', { length: 5 }).notNull(), // 'true' or 'false'
  agreedMarketing: varchar('agreed_marketing', { length: 5 }).notNull(), // 'true' or 'false'
  ...DateColumns,
});
