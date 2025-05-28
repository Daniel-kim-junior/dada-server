import { RequestUser } from 'src/auth/auth.types';
import { CreateClassValidator } from './classes.validator';
import { Nullable } from 'src/common.types';
import { Profile } from 'src/users/profiles/profiles.types';
import { Classroom } from 'src/classrooms/classrooms.types';
import { Course, CourseProfile, CourseProfileStatus } from '../courses/courses.types';
import { Session } from '../sessions/sessions.types';

export type CreateClassParam = InstanceType<typeof CreateClassValidator> & RequestUser;
export type IClassesLoader = {
  getClassById(id: number): Promise<Class>;
};

export type Class = {
  id: number;
  name: string;
  description: Nullable<string>;
  organizationId: number;
  openDate: Date;
  closeDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
};

export type LectureSchedule = {
  timeData: string;
  scheduleId: number;
  type: string;
  instructorProfileId: string;
  classroomId: Nullable<number>;
};

export type ClassDetail = {
  classes: Class;
  lecture_schedules: LectureSchedule;
  profiles: Profile;
  classrooms: Classroom;
};

export type ClassDetailResponse = {
  classId: number;
  className: string;
  classOpenDate: Date;
  classCloseDate: Date;
  description: Nullable<string>;
  schedules: {
    timeData: string;
    instructorProfileId: string;
    instructorName: string;
    classroomName: Nullable<string>;
    classroomId: Nullable<number>;
  }[];
};

export type ClassMyCoursesAndSessions = {
  classes: Class;
  courses: Course;
  sessions: Session;
  course_profiles?: CourseProfile;
};

export type MyClassCoursesAndSessionsResponse = {
  classId: number;
  className: string;
  classOpenDate: Date;
  classCloseDate: Date;
  description: Nullable<string>;
  sessions: {
    sessionId: number;
    sessionNumber: number;
    courses: {
      courseId: number;
      courseName: string;
      description: Nullable<string>;
      status: CourseProfileStatus;
    }[];
  }[];
};
