import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const OrganizationRosters = mysqlTable('organizations_roster', {
  profileId: varchar('profile_id', { length: 36 }).notNull(), // UUID of the profile
  organizationId: bigint('organization_id', { mode: 'number' }).notNull(), // ID of the organization
});
