import { Database } from 'src/databases/databases.module';
import { Course, LectureAggregate, LectureAggregateWithoutCourseProfile } from './courses.types';
import { Inject } from '@nestjs/common';
import { Symbols } from 'symbols';
import { isEmpty } from 'remeda';
import { and, eq } from 'drizzle-orm';
import { Classes, CourseProfiles, Courses, Sessions } from 'src/databases/schemas';
import { Nullable } from 'src/common.types';
import { COURSE_PROFILE_STATUS } from './courses.constant';

export type ICoursesRepository = {
  getCourseById(id: number): Promise<Course>;
  /**
   * 프로필 ID를 기반으로 활성화된 내 강의의 정보를 조회
   */
  getActiveLectureAggregateByProfileId(profileId: string): Promise<Nullable<LectureAggregate[]>>;

  /**
   * 강의 ID를 기반으로 강의 정보를 조회
   */
  getLecturesByCourseId(courseId: number): Promise<Nullable<LectureAggregateWithoutCourseProfile>>;
};

export class CoursesRepositoryDrizzle implements ICoursesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async getLecturesByCourseId(
    courseId: number
  ): Promise<Nullable<LectureAggregateWithoutCourseProfile>> {
    const lectures = await this._db
      .select()
      .from(Courses)
      .innerJoin(Sessions, eq(Courses.sessionId, Sessions.id))
      .innerJoin(Classes, eq(Sessions.classId, Classes.id))
      .where(eq(Courses.id, courseId));

    return isEmpty(lectures) ? null : lectures[0];
  }

  public async getActiveLectureAggregateByProfileId(profileId: string) {
    return await this._db
      .select()
      .from(Courses)
      .innerJoin(CourseProfiles, eq(Courses.id, CourseProfiles.courseId))
      .innerJoin(Sessions, eq(Courses.sessionId, Sessions.id))
      .innerJoin(Classes, eq(Sessions.classId, Classes.id))
      .where(
        and(
          eq(CourseProfiles.studentProfileId, profileId),
          eq(CourseProfiles.status, COURSE_PROFILE_STATUS.APPROVED)
        )
      );
  }

  public async getCourseById(id: number): Promise<Course> {
    const found = await this._db.select().from(Courses).where(eq(Courses.id, id));
    return isEmpty(found) ? null : found[0];
  }
}
