import { bigint, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const OrganizationRosters = mysqlTable(
  'organizations_roster',
  {
    id: serial('id').primaryKey(),
    profileId: varchar('profile_id', { length: 36 }).notNull(),
    organizationId: bigint('organization_id', { mode: 'number' }).notNull(),
    inviteProfileId: varchar('invite_profile_id', { length: 36 }).notNull(),
  },
  (table) => ({
    profileOrgRosterUnique: uniqueIndex('profile_org_roster_unique').on(
      table.profileId,
      table.organizationId
    ),
  })
);
