import { index, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const ProfileConnections = mysqlTable(
  'profile_connections',
  {
    id: serial('id').primaryKey(),
    status: varchar('status', { length: 50 }).notNull(), // 'pending', 'accepted', 'rejected'
    requesterProfileId: varchar('requester_profile_id', { length: 36 }).notNull(), // UUID of the profile that sent the request
    targetProfileId: varchar('target_profile_id', { length: 36 }).notNull(), // UUID of the profile that received the request
    message: varchar('message', { length: 255 }),
    ...DateColumns,
  },
  (table) => ({
    requeterProfileIdIdx: index('idx_profile_connections_requester_profile_id').on(
      table.requesterProfileId
    ),
    targetProfileIdIdx: index('idx_profile_connections_target_profile_id').on(
      table.targetProfileId
    ),
  })
);
