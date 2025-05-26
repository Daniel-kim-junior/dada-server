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
};

/**
 * ICoursesProfileLoader는 프로필 ID를 기반으로 수업 데이터를 조회하는 인터페이스입니다.
 */
export type ICourseProfilesLoader = {
  getActiveLectureAggregateByProfileId(profileId: string): Promise<LectureAggregate[]>;
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

export type CourseProfileStatus = keyof typeof COURSE_PROFILE_STATUS;
