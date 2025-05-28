import { Inject, Injectable } from '@nestjs/common';
import {
  Class,
  ClassDetailResponse,
  CreateClassParam,
  IClassesLoader,
  MyClassCoursesAndSessionsResponse,
} from './classes.types';
import { Symbols } from 'symbols';
import { isEmpty, isNullish } from 'remeda';
import { NotFoundError, UnAuthorizedError } from 'src/errors/errors';
import { IOrganizationOwnershipLoader } from 'src/organizations/organizations.types';
import { IClassesRepository } from './classes.repository';
import { RequestUser } from 'src/auth/auth.types';
import { Course, CourseProfile, CourseProfileStatus } from '../courses/courses.types';
import { Session } from '../sessions/sessions.types';
import { Nullable } from 'src/common.types';
import { COURSE_PROFILE_STATUS } from '../courses/courses.constant';
import { ClassDetailListDto } from './dto';

@Injectable()
export class ClassesService implements IClassesLoader {
  public constructor(
    @Inject(Symbols.OrganizationOwnershipLoader)
    private readonly _organizationOwnershipLoader: IOrganizationOwnershipLoader,
    @Inject(Symbols.ClassesRepository)
    private readonly _classesRepo: IClassesRepository
  ) {}

  public async getMyClassCoursesAndSessions(
    param: RequestUser & { classId: number }
  ): Promise<MyClassCoursesAndSessionsResponse> {
    const { classId, profileId: requestProfileId, profileRole } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    if (profileRole !== 'STUDENT') {
      throw new UnAuthorizedError('학생 프로필로 로그인해주세요.');
    }
    const founds = await this._classesRepo.getMyClassCoursesAndSessionsById(
      classId,
      requestProfileId
    );
    if (isEmpty(founds)) {
      throw new NotFoundError('존재하지 않는 수업입니다.');
    }
    const courseIdInSessions: {
      [sessionId: number]: {
        session: Session;
        courses: {
          course: Course;
          course_profile: Nullable<CourseProfile>;
        }[];
      };
    } = {};
    founds.map((found) => {
      const sessionId = found.sessions.id;
      if (!courseIdInSessions[sessionId]) {
        courseIdInSessions[sessionId] = {
          session: found.sessions,
          courses: [
            {
              course: found.courses,
              course_profile: found.course_profiles ?? null,
            },
          ],
        };
      } else {
        courseIdInSessions[sessionId] = {
          ...courseIdInSessions[sessionId],
          courses: [
            ...courseIdInSessions[sessionId].courses,
            {
              course: found.courses,
              course_profile: found.course_profiles ?? null,
            },
          ],
        };
      }
    });
    const sessionCourses: {
      session: Session;
      courses: { course: Course; course_profile: CourseProfile }[];
    }[] = Object.values(courseIdInSessions);
    return {
      classId: founds[0].classes.id,
      className: founds[0].classes.name,
      classOpenDate: founds[0].classes.openDate,
      classCloseDate: founds[0].classes.closeDate,
      description: founds[0].classes.description,
      sessions: sessionCourses.map((found) => ({
        sessionId: found.session.id,
        sessionNumber: found.session.sessionNumber,
        courses: found.courses.map((f) => ({
          courseId: f.course.id,
          courseName: f.course.name,
          description: f.course.description,
          status:
            (f.course_profile?.status as CourseProfileStatus) ?? COURSE_PROFILE_STATUS.PENDING,
        })),
      })),
    };
  }

  /**
   * 수업 상세 조회
   * @param param - 요청 사용자 정보와 클래스 ID
   */
  public async getClassDetailSchedules(
    param: RequestUser & { classId: number }
  ): Promise<ClassDetailListDto> {
    const { classId, profileId: requestProfileId } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }

    const classDetail = await this._classesRepo.getClassDetailById(classId);
    if (isEmpty(classDetail)) {
      throw new NotFoundError('존재하지 않는 수업입니다.');
    }
    return ClassDetailListDto.of(classDetail);
  }

  public async getClassById(id: number): Promise<Class> {
    return await this._classesRepo.getClassById(id);
  }

  public async addClassToOrganization(param: CreateClassParam) {
    const { profileId: requestProfileId, organizationId } = param;
    const ownership =
      await this._organizationOwnershipLoader.findOwnershipByProfileIdAndOrganizationId({
        profileId: requestProfileId,
        organizationId,
      });

    if (isNullish(ownership)) {
      throw new UnAuthorizedError(
        '조직 관리자/부관리자가 아닙니다. 조직 관리자/부관리자 프로필로 로그인해주세요.'
      );
    }

    await this._classesRepo.createClass(param);
  }
}
