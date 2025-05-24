import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { DateColumns } from './date-columns';

export const Profiles = mysqlTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  userId: varchar('user_id', { length: 36 }).notNull(), // UUID
  role: varchar('role', { length: 50 }).notNull(), // 'student', 'teacher', 'parents' etc...
  profilePicture: varchar('profile_picture', { length: 255 }), // URL to profile picture
  nickname: varchar('nickname', { length: 50 }).notNull(), // User's nickname
  introduction: varchar('introduction', { length: 500 }), // User's introduction
  ...DateColumns,
});
