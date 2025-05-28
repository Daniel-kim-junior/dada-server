import { Inject, Injectable } from '@nestjs/common';
import {
  Course,
  ICoursesLoader,
  ICourseProfilesLoader,
  LectureAggregate,
  LectureAggregateWithoutCourseProfile,
  SessionCourseProfiles,
  ICourseProfilesMutator,
} from './courses.types';
import { Symbols } from 'symbols';
import { ICoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService
  implements ICoursesLoader, ICourseProfilesLoader, ICourseProfilesMutator
{
  public constructor(
    @Inject(Symbols.CoursesRepository) private readonly _coursesRepository: ICoursesRepository
  ) {}

  public async addCourseProfile(param: {
    courseId: number;
    studentProfileId: string;
    sessionId: number;
  }): Promise<void> {
    return await this._coursesRepository.addCourseProfile(param);
  }

  public async getLecturesByCourseId(
    courseId: number
  ): Promise<LectureAggregateWithoutCourseProfile> {
    return await this._coursesRepository.getLecturesByCourseId(courseId);
  }

  public async getMyActiveSessionCourseProfiles(
    profileId: string
  ): Promise<SessionCourseProfiles[]> {
    return await this._coursesRepository.getMyActiveSessionCourseProfiles(profileId);
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
