import { Inject, Injectable } from '@nestjs/common';
import { Class, ClassMyCoursesAndSessions, ClassDetail, CreateClassParam } from './classes.types';
import { Symbols } from 'symbols';
import { Database } from 'src/databases/databases.module';
import {
  Classes,
  Classrooms,
  CourseProfiles,
  Courses,
  LectureSchedules,
  Profiles,
  Sessions,
} from 'src/databases/schemas';
import { Nullable } from 'src/common.types';
import { and, eq } from 'drizzle-orm';
import { isEmpty } from 'remeda';
import { SCHEDULE_TYPE } from './classes.constant';

export interface IClassesRepository {
  createClass(param: CreateClassParam): Promise<void>;
  getClassById(id: number): Promise<Nullable<Class>>;
  getClassDetailById(id: number): Promise<ClassDetail[]>;
  getMyClassCoursesAndSessionsById(
    id: number,
    profileId: string
  ): Promise<ClassMyCoursesAndSessions[]>;
}

@Injectable()
export class ClassesRepositoryDrizzle implements IClassesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async getMyClassCoursesAndSessionsById(
    id: number,
    profileId: string
  ): Promise<ClassMyCoursesAndSessions[]> {
    return await this._db
      .select()
      .from(Classes)
      .innerJoin(Sessions, eq(Sessions.classId, Classes.id))
      .innerJoin(Courses, eq(Courses.sessionId, Sessions.id))
      .leftJoin(CourseProfiles, eq(CourseProfiles.studentProfileId, profileId))
      .where(and(eq(Classes.id, id)));
  }

  public async getClassById(id: number): Promise<Nullable<Class>> {
    const found = await this._db.select().from(Classes).where(eq(Classes.id, id));

    return isEmpty(found) ? null : found[0];
  }

  public async getClassDetailById(id: number): Promise<ClassDetail[]> {
    return await this._db
      .select()
      .from(Classes)
      .innerJoin(LectureSchedules, eq(LectureSchedules.scheduleId, Classes.id))
      .innerJoin(Profiles, eq(LectureSchedules.instructorProfileId, Profiles.id))
      .innerJoin(Classrooms, eq(LectureSchedules.classroomId, Classrooms.id))
      .where(and(eq(Classes.id, id), eq(LectureSchedules.type, SCHEDULE_TYPE.CLASS)));
  }

  public async createClass(param: CreateClassParam): Promise<void> {
    const { organizationId, name, description, openDate, closeDate, schedules } = param;
    await this._db.transaction(async (tx) => {
      const [classes] = await tx
        .insert(Classes)
        .values({
          organizationId,
          name,
          openDate,
          closeDate,
          description,
        })
        .$returningId();
      await Promise.all(
        schedules.map(async (schedule) => {
          const { timeData, instructorProfileId, classroomId } = schedule;
          await tx.insert(LectureSchedules).values({
            timeData,
            scheduleId: classes.id,
            type: SCHEDULE_TYPE.CLASS,
            instructorProfileId,
            classroomId,
          });
        })
      );
    });
  }
}
