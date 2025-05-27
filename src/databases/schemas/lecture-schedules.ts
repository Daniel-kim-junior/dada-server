import {
  bigint,
  index,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 강의 스케줄
 */
export const LectureSchedules = mysqlTable(
  'lecture_schedules',
  {
    scheduleId: bigint('schedule_id', { mode: 'number' }).notNull(), // 스케줄 ID
    type: varchar('type', { length: 50 }).notNull(), // 스케줄 유형 (분반/수업)
    classroomId: bigint('classroom_id', { mode: 'number' }), // 강의실 ID
    instructorProfileId: varchar('instructor_profile_id', { length: 36 }).notNull(), // 강사 프로필 ID
    startTime: varchar('start_time', { length: 10 }).notNull(), // 시작 시간
    endTime: varchar('end_time', { length: 10 }).notNull(), // 종료 시간
    ...DateColumns,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.scheduleId, table.type] }),
    idxClasssroomId: index('idx_classroom_id').on(table.classroomId),
    idxInstructorProfileId: index('idx_instructor_profile_id').on(table.instructorProfileId),
  })
);
