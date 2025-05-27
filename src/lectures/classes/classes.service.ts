import { Inject, Injectable } from '@nestjs/common';
import { Class, ClassDetailResponse, CreateClassParam, IClassesLoader } from './classes.types';
import { Symbols } from 'symbols';
import { isEmpty, isNullish } from 'remeda';
import { NotFoundError, UnAuthorizedError } from 'src/errors/errors';
import { IOrganizationOwnershipLoader } from 'src/organizations/organizations.types';
import { IClassesRepository } from './classes.repository';
import { RequestUser } from 'src/auth/auth.types';

@Injectable()
export class ClassesService implements IClassesLoader {
  public constructor(
    @Inject(Symbols.OrganizationOwnershipLoader)
    private readonly _organizationOwnershipLoader: IOrganizationOwnershipLoader,
    @Inject(Symbols.ClassesRepository)
    private readonly _classesRepo: IClassesRepository
  ) {}

  /**
   * 수업 상세 조회
   * @param param - 요청 사용자 정보와 클래스 ID
   */
  public async getClassDetailSchedules(
    param: RequestUser & { classId: number }
  ): Promise<ClassDetailResponse> {
    const { classId, profileId: requestProfileId } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }

    const classDetail = await this._classesRepo.getClassDetailById(classId);
    if (isEmpty(classDetail)) {
      throw new NotFoundError('존재하지 않는 수업입니다.');
    }
    const { id, name, description, openDate, closeDate } = classDetail[0].classes;

    return {
      classId: id,
      className: name,
      description,
      classOpenDate: openDate,
      classCloseDate: closeDate,
      schedules: classDetail.map((detail) => ({
        scheduleId: detail.lecture_schedules.scheduleId,
        startTime: detail.lecture_schedules.startTime,
        endTime: detail.lecture_schedules.endTime,
        instructorProfileId: detail.lecture_schedules.instructorProfileId,
        instructorName: detail.profiles.nickname,
        classroomId: detail.lecture_schedules.classroomId,
        classroomName: detail.classrooms.name,
      })),
    };
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
