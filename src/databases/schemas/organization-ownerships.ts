import { bigint, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const OrganizationOwnerships = mysqlTable(
  'organization_ownerships',
  {
    id: serial('id').primaryKey(),
    profileId: varchar('profile_id', { length: 36 }).notNull(), // UUID of the profile that owns the organization
    organizationId: bigint('organization_id', { mode: 'number' }).notNull(), // ID of the organization
    role: varchar('role', { length: 50 }).notNull(), // 'main_admin', 'sub_admin'
    ...DateColumns,
  },
  (table) => ({
    profileOrgUnique: uniqueIndex('profile_org_unique').on(table.profileId, table.organizationId),
  })
);
