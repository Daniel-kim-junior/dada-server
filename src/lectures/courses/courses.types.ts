import { Nullable } from 'src/common.types';

export type Course = {
  id: number;
  name: string;
  sessionId: number;
  description: Nullable<string>;
};

export type ICoursesLoader = {
  getCourseById(id: number): Promise<Course>;
};
