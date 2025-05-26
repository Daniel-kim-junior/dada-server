import { Inject, Injectable } from '@nestjs/common';
import {
  Course,
  ICoursesLoader,
  ICourseProfilesLoader,
  LectureAggregate,
  LectureAggregateWithoutCourseProfile,
} from './courses.types';
import { Symbols } from 'symbols';
import { ICoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService implements ICoursesLoader, ICourseProfilesLoader {
  public constructor(
    @Inject(Symbols.CoursesRepository) private readonly _coursesRepository: ICoursesRepository
  ) {}
  public async getLecturesByCourseId(
    courseId: number
  ): Promise<LectureAggregateWithoutCourseProfile> {
    return await this._coursesRepository.getLecturesByCourseId(courseId);
  }

  public async getActiveLectureAggregateByProfileId(
    profileId: string
  ): Promise<LectureAggregate[]> {
    return await this._coursesRepository.getActiveLectureAggregateByProfileId(profileId);
  }

  public async getCourseById(id: number): Promise<Course> {
    return await this._coursesRepository.getCourseById(id);
  }
}
