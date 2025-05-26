import { Inject, Injectable } from '@nestjs/common';
import { Course, ICoursesLoader } from './courses.types';
import { Symbols } from 'symbols';
import { ICoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService implements ICoursesLoader {
  public constructor(
    @Inject(Symbols.CoursesRepository) private readonly _coursesRepository: ICoursesRepository
  ) {}

  public async getCourseById(id: number): Promise<Course> {
    return await this._coursesRepository.getCourseById(id);
  }
}
