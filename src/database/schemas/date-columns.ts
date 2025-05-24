import { timestamp } from 'drizzle-orm/mysql-core';

export const DateColumns = {
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
};
