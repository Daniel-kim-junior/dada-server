import { Inject, Injectable } from '@nestjs/common';
import { CreateClassParam, CreateOrganizationParam } from './organizations.types';
import { IOrganizationsRepository } from './organizations.repository';
import { Symbols } from 'symbols';
import { isIncludedIn, isNullish } from 'remeda';
import { CREATE_ORGANIZATION_PROFILE_ROLES } from 'src/users/profiles/profiles.constant';
import { UnAuthorizedError } from 'src/errors/errors';

@Injectable()
export class OrganiztionsService {
  public constructor(
    @Inject(Symbols.OrganizationsRepository) private readonly _repository: IOrganizationsRepository
  ) {}

  public async addClassToOrganization(param: CreateClassParam) {
    await this._repository.createClass(param);
  }

  public async createOrganization(param: CreateOrganizationParam) {
    const { profileId, profileRole } = param;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    if (!isIncludedIn(profileRole, CREATE_ORGANIZATION_PROFILE_ROLES)) {
      throw new UnAuthorizedError(
        `프로필 역할이 조직 생성 권한이 없습니다. 현재 프로필 역할: ${profileRole}, 필요한 프로필 역할: ${CREATE_ORGANIZATION_PROFILE_ROLES.join(', ')}`
      );
    }

    await this._repository.createOrganizationAndOwnership(param);
  }
}
