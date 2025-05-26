import { Database } from 'src/databases/databases.module';
import { Course } from './courses.types';
import { Inject } from '@nestjs/common';
import { Symbols } from 'symbols';
import { isEmpty } from 'remeda';
import { eq } from 'drizzle-orm';
import { Courses } from 'src/databases/schemas';

export type ICoursesRepository = {
  getCourseById(id: number): Promise<Course>;
};

export class CoursesRepositoryDrizzle implements ICoursesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async getCourseById(id: number): Promise<Course> {
    const found = await this._db.select().from(Courses).where(eq(Courses.id, id));
    return isEmpty(found) ? null : found[0];
  }
}
