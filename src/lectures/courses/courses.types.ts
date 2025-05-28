import { Nullable } from 'src/common.types';
import { Class } from '../classes/classes.types';
import { Session } from '../sessions/sessions.types';
import { COURSE_PROFILE_STATUS } from './courses.constant';

export type Course = {
  id: number;
  name: string;
  sessionId: number;
  description: Nullable<string>;
};

export type ICoursesLoader = {
  getCourseById(id: number): Promise<Course>;
  getLecturesByCourseId(courseId: number): Promise<LectureAggregateWithoutCourseProfile>;
};

export type ICourseProfilesLoader = {
  getActiveLectureAggregateByProfileId(profileId: string): Promise<LectureAggregate[]>;
  getMyActiveSessionCourseProfiles(profileId: string): Promise<SessionCourseProfiles[]>;
};

export type LectureAggregate = {
  classes: Class;
  courses: Course;
  sessions: Session;
  course_profiles: {
    studentProfileId: string;
    courseId: number;
    status: string;
  };
};

export type LectureAggregateWithoutCourseProfile = Omit<LectureAggregate, 'course_profiles'>;

export type CourseProfileStatus = keyof typeof COURSE_PROFILE_STATUS;

export type CourseProfile = {
  id: number;
  courseId: number;
  studentProfileId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
};

export type SessionCourseProfiles = {
  sessions: Session;
  courses: Course;
  course_profiles: CourseProfile;
};

export type AddCourseProfile = {
  courseId: number;
  studentProfileId: string;
};

export type ICourseProfilesMutator = {
  addCourseProfile(param: AddCourseProfile): Promise<void>;
};
