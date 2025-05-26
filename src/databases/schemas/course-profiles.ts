import { bigint, index, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

/**
 * 분반 프로필
 */
export const CourseProfiles = mysqlTable(
  'course_profiles',
  {
    id: serial('id').primaryKey().notNull(),
    courseId: bigint('course_id', { mode: 'number' }).notNull(), // 분반 ID
    studentProfileId: varchar('student_profile_id', { length: 36 }).notNull(), // UUID of the profile
    status: varchar('status', { length: 50 }).notNull(), // 'enrolled', 'completed', 'dropped'
    ...DateColumns,
  },
  (table) => ({
    courseIdIdx: index('course_id_idx').on(table.courseId),
    studentProfileIdAndStatusIdx: index('student_profile_id_and_status_idx').on(
      table.studentProfileId,
      table.status
    ),
  })
);
