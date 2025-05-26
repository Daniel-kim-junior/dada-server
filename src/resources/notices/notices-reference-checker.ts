import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { NoticeType } from './notices.types';
import { NOTICE_TYPE } from './notices.constant';
import { IOrganizationsLoader } from 'src/organizations/organizations.types';
import { IClassesLoader } from 'src/lectures/classes/classes.types';
import { ISessionsLoader } from 'src/lectures/sessions/sessions.types';
import { ICoursesLoader } from 'src/lectures/courses/courses.types';

@Injectable()
export class NoticesReferenceChecker {
  public constructor(
    @Inject(Symbols.ClassesLoader) private readonly _classesLoader: IClassesLoader,
    @Inject(Symbols.OrganizationsLoader)
    private readonly _organizationsLoader: IOrganizationsLoader,
    @Inject(Symbols.SessionsLoader) private readonly _sessionsLoader: ISessionsLoader,
    @Inject(Symbols.CoursesLoader) private readonly _coursesLoader: ICoursesLoader
  ) {}

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
