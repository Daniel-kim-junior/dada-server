import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { NoticeType } from './notices.types';
import { NOTICE_TYPE } from './notices.constant';
import {
  IOrganizationOwnershipLoader,
  IOrganizationsLoader,
  IOrganizationRostersLoader,
} from 'src/organizations/organizations.types';
import { IClassesLoader } from 'src/lectures/classes/classes.types';
import { ISessionsLoader } from 'src/lectures/sessions/sessions.types';
import { ICoursesLoader, ICourseProfilesLoader } from 'src/lectures/courses/courses.types';
import { ProfilesEntity } from 'src/users/profiles/profiles.entity';
import { isNonNullish, isNullish } from 'remeda';

@Injectable()
export class NoticesReferenceChecker {
  public constructor(
    @Inject(Symbols.ClassesLoader) private readonly _classesLoader: IClassesLoader,
    @Inject(Symbols.OrganizationsLoader)
    private readonly _organizationsLoader: IOrganizationsLoader,
    @Inject(Symbols.OrganizationOwnershipLoader)
    private readonly _organizationOwnershipLoader: IOrganizationOwnershipLoader,
    @Inject(Symbols.OrganizationRostersLoader)
    private readonly _organizationRostersLoader: IOrganizationRostersLoader,
    @Inject(Symbols.SessionsLoader) private readonly _sessionsLoader: ISessionsLoader,
    @Inject(Symbols.CoursesLoader) private readonly _coursesLoader: ICoursesLoader,
    @Inject(Symbols.CourseProfilesLoader)
    private readonly _courseProfilesLoader: ICourseProfilesLoader
  ) {}

  public async isVisibleNotice({
    type,
    id,
    profile,
  }: {
    type: NoticeType;
    id: number;
    profile: ProfilesEntity;
  }) {
    /**
     * 내가 조직에 속해 있거나 조직의 강사나 관리자라면
     * 조직 공지사항을 조회할 수 있습니다
     */
    const ownership =
      await this._organizationOwnershipLoader.findOwnershipByProfileIdAndOrganizationId({
        profileId: profile.id,
        organizationId: id,
      });
    if (type === NOTICE_TYPE.ORGANIZATION) {
      const organizationRosters =
        await this._organizationRostersLoader.getOrganizationRosterByProfileIdAndOrganizationId({
          profileId: profile.id,
          organizationId: id,
        });

      return isNonNullish(ownership) || isNonNullish(organizationRosters);
    }

    const lectureAggregate = await this._courseProfilesLoader.getActiveLectureAggregateByProfileId(
      profile.id
    );
    if (isNullish(lectureAggregate)) {
      return false;
    }

    if (type === NOTICE_TYPE.CLASS) {
      /**
       * 수업 공지사항의 경우
       * 수업을 참여하고 있거나
       * 수업을 소유하고 있는 조직의 강사나 관리자라면
       */
      const foundClass = await this._classesLoader.getClassById(id);
      if (isNullish(foundClass)) {
        return false;
      }
      const isAdmin =
        isNonNullish(ownership) && ownership.organizationId === foundClass.organizationId;
      return lectureAggregate.some((e) => e.classes.id === id) || isAdmin;
    }

    if (type === NOTICE_TYPE.SESSION) {
      /**
       * 회차 공지사항
       * 내가 해당 회차에 속해 있다면
       */
      const session = await this._sessionsLoader.getSessionAndClassById(id);
      if (isNullish(session)) {
        return false;
      }
      const isAdmin =
        isNonNullish(ownership) && ownership.organizationId === session.classes.organizationId;
      return lectureAggregate.some((e) => e.sessions.id === id) || isAdmin;
    }

    if (type === NOTICE_TYPE.COURSE) {
      /**
       * 분반 공지사항
       * 내가 해당 분반에 속해 있다면
       */
      const lectureById = await this._coursesLoader.getLecturesByCourseId(id);
      if (isNullish(lectureById)) {
        return false;
      }
      const isAdmin =
        isNonNullish(ownership) && ownership.organizationId === lectureById.classes.organizationId;
      return lectureAggregate.some((e) => e.courses.id === id) || isAdmin;
    }

    throw new Error(
      `Invalid notice type: ${type}. Valid types are ${Object.values(NOTICE_TYPE).join(', ')}`
    );
  }

  public async validateReferenceObject({ type, id }: { type: NoticeType; id: number }) {
    switch (type) {
      case NOTICE_TYPE.CLASS:
        return await this._classesLoader.getClassById(id);
      case NOTICE_TYPE.ORGANIZATION:
        return await this._organizationsLoader.getOrganizationById(id);
      case NOTICE_TYPE.SESSION:
        return await this._sessionsLoader.getSessionById(id);
      case NOTICE_TYPE.COURSE:
        return await this._coursesLoader.getCourseById(id);
      default:
        throw new Error(
          `Invalid notice type: ${type}. Valid types are ${Object.values(NOTICE_TYPE).join(', ')}`
        );
    }
  }
}
