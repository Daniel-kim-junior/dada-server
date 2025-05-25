import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 분반 프로필
 */
export const CourseProfiles = mysqlTable('course_profiles', {
  courceId: serial('course_id').notNull(), // 분반 ID
  studentProfileId: varchar('student_profile_id', { length: 36 }).notNull(), // UUID of the profile
  status: varchar('status', { length: 50 }).notNull(), // 'enrolled', 'completed', 'dropped'
  ...DateColumns,
});
