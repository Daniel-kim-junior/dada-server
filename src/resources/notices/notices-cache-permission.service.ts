import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ICourseProfilesLoader } from 'src/lectures/courses/courses.types';
import { Symbols } from 'symbols';
import { NoticeType } from './notices.types';
import { NOTICE_TYPE } from './notices.constant';
import {
  IOrganizationOwnershipLoader,
  IOrganizationRostersLoader,
} from 'src/organizations/organizations.types';
import { uniqueBy } from 'remeda';

export type INotciesCachePermissionService = {
  preloadUserPermissions(profileId: string): Promise<void>;
  invalidateUserPermissions(profileId: string): Promise<void>;
  getCachedPermissions(
    profileId: string
  ): Promise<Array<{ type: NoticeType; id: number; hasPermission: boolean }>>;
};

@Injectable()
export class NoticesCachePermissionService implements INotciesCachePermissionService {
  public constructor(
    @Inject(Symbols.CourseProfilesLoader)
    private readonly _courseProfilesLoader: ICourseProfilesLoader,
    @Inject(Symbols.OrganizationOwnershipLoader)
    private readonly _organizationOwnershipLoader: IOrganizationOwnershipLoader,
    @Inject(Symbols.OrganizationRostersLoader)
    private readonly _organizationRostersLoader: IOrganizationRostersLoader,
    @Inject(Symbols.RedisProvider) private readonly _redis: Redis
  ) {}

  public async preloadUserPermissions(profileId: string) {
    // 사용자의 모든 관련 리소스 조회
    const [userCourses, organizationOwnerships, organizationRosters] = await Promise.all([
      this._courseProfilesLoader.getActiveLectureAggregateByProfileId(profileId),
      this._organizationOwnershipLoader.getOwnershipByProfile(profileId),
      this._organizationRostersLoader.getOrganizationRostersByProfileId(profileId),
    ]);

    const allResources = [
      ...userCourses.flatMap((c) => [
        { type: NOTICE_TYPE.CLASS, id: c.classes.id },
        { type: NOTICE_TYPE.SESSION, id: c.sessions.id },
        {
          type: NOTICE_TYPE.ORGANIZATION,
          id: c.classes.organizationId,
        },
        { type: NOTICE_TYPE.COURSE, id: c.courses.id },
      ]),
      ...organizationOwnerships.map((o) => ({
        type: NOTICE_TYPE.ORGANIZATION,
        id: o.organizationId,
      })),
      ...organizationRosters.map((r) => ({
        type: NOTICE_TYPE.ORGANIZATION,
        id: r.organizationId,
      })),
    ];

    const uniquePermissionList = uniqueBy(
      allResources,
      (permission) => `${permission.type}:${permission.id}`
    );
    // 배치로 권한 캐싱
    await this._batchCachePermissions(profileId, uniquePermissionList);
  }

  private _getCacheKey(profileId: string, type: NoticeType, id: number): string {
    return `notice_permission:${profileId}:${type}:${id}`;
  }

  private async _batchCachePermissions(
    profileId: string,
    resources: Array<{ type: NoticeType; id: number }>
  ) {
    const pipeline = this._redis.pipeline();

    for (const resource of resources) {
      const cacheKey = this._getCacheKey(profileId, resource.type, resource.id);
      pipeline.setex(cacheKey, 900, 'TRUE');
    }

    await pipeline.exec();
  }

  public async invalidateUserPermissions(profileId: string): Promise<void> {
    const pattern = `notice_permission:${profileId}:*`;
    const keys = await this._redis.keys(pattern);
    if (keys.length > 0) {
      await this._redis.del(...keys);
    }
  }

  public async getCachedPermissions(profileId: string) {
    const pattern = `notice_permission:${profileId}:*`;
    const keys = await this._redis.keys(pattern);
    if (keys.length === 0) {
      return [];
    }

    const permissions = await this._redis.mget(...keys);
    return keys.map((key, index) => {
      const [_, __, type, id] = key.split(':');
      return {
        type: type as NoticeType,
        id: parseInt(id, 10),
        hasPermission: permissions[index] === 'TRUE',
      };
    });
  }
}
