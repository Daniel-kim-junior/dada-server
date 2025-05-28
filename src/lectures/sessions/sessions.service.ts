import { Inject, Injectable } from '@nestjs/common';
import { ISessionsLoader, Session, SessionApplyParam } from './sessions.types';
import { Symbols } from 'symbols';
import { ISessionsRepository } from './sessions.repository';
import { Class, IClassesLoader } from '../classes/classes.types';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';
import {
  ICourseProfilesLoader,
  ICourseProfilesMutator,
  ICoursesLoader,
} from '../courses/courses.types';
import { IProfilesLoader } from 'src/users/profiles/profiles.types';

@Injectable()
export class SessionsService implements ISessionsLoader {
  public constructor(
    @Inject(Symbols.ClassesLoader) private readonly _classesLoader: IClassesLoader,
    @Inject(Symbols.SessionsRepository) private readonly _sessionRepository: ISessionsRepository,
    @Inject(Symbols.CourseProfilesLoader)
    private readonly _courseProfilesLoader: ICourseProfilesLoader,
    @Inject(Symbols.CourseProfilesMutator)
    private readonly _courseProfilesMutator: ICourseProfilesMutator,
    @Inject(Symbols.CoursesLoader) private readonly _coursesLoader: ICoursesLoader,
    @Inject(Symbols.ProfilesLoader) private readonly _profilesLoader: IProfilesLoader
  ) {}

  public async getSessionAndClassById(id: number): Promise<{ sessions: Session; classes: Class }> {
    return await this._sessionRepository.getSessionAndClassById(id);
  }

  public async getSessionById(id: number): Promise<Session> {
    return await this._sessionRepository.getSessionById(id);
  }

  public async applySession(param: SessionApplyParam): Promise<void> {
    const { classId, sessionId, courseId, profileId: requestProfileId, profileRole } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필 선택이 필요합니다');
    }
    const requestProfile = await this._profilesLoader.getProfileById(requestProfileId);
    if (isNullish(requestProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다');
    }

    if (!requestProfile.isStudent()) {
      throw new UnAuthorizedError('학생 프로필로 로그인해주세요');
    }

    const currentClass = await this._classesLoader.getClassById(classId);
    if (isNullish(currentClass)) {
      throw new UnAuthorizedError('존재하지 않는 강의입니다');
    }
    const currentDate = new Date();
    if (currentClass.openDate > currentDate || currentClass.closeDate < currentDate) {
      throw new UnAuthorizedError('신청 기간이 아닙니다');
    }
    const hopeApplySession = await this._sessionRepository.getSessionById(sessionId);
    if (isNullish(hopeApplySession)) {
      throw new UnAuthorizedError('요청한 회차는 존재하지 않는 회차입니다');
    }
    const foundCourse = await this._coursesLoader.getCourseById(courseId);
    if (isNullish(foundCourse)) {
      throw new UnAuthorizedError('존재하지 않는 분반입니다');
    }
    const myActive =
      await this._courseProfilesLoader.getActiveLectureAggregateByProfileId(requestProfileId);
    const idAlreadyJoin = myActive.some(
      (e) =>
        e.sessions.sessionNumber === hopeApplySession.sessionNumber &&
        e.sessions.classId === classId
    );
    if (idAlreadyJoin) {
      throw new UnAuthorizedError('이미 신청한 수업의 회차입니다');
    }

    await this._courseProfilesMutator.addCourseProfile({
      courseId,
      studentProfileId: requestProfileId,
    });
  }
}
