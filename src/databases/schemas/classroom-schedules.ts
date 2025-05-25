import { bigint, mysqlTable, primaryKey, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';
/**
 * 강의실 스케줄
 */
export const ClassroomSchedules = mysqlTable(
  'classroom_schedules',
  {
    scheduleId: serial('schedule_id').primaryKey(), // 스케줄 ID
    type: varchar('type', { length: 50 }).notNull(), // 스케줄 유형 (분반/수업)
    classroomId: bigint('classroom_id', { mode: 'number' }).notNull(), // 강의실 ID
    instructorProfileId: varchar('instructor_profile_id', { length: 36 }).notNull(), // 강사 프로필 ID
    startTime: timestamp('start_time').notNull(), // 시작 시간
    endTime: timestamp('end_time').notNull(), // 종료 시간
    ...DateColumns,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.scheduleId, table.type] }),
  })
);
