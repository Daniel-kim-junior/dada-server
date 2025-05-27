import { Inject, Injectable } from '@nestjs/common';
import {
  AddProfileToOrganizationOwnershipParam,
  AddProfileToRosterParam,
  CreateOrganizationParam,
  IOrganizationOwnershipLoader,
  IOrganizationRostersLoader,
  IOrganizationsLoader,
  Organization,
  OrganizationOwnership,
  OrganizationRoster,
  OrganizationRosterWithOrganization,
} from './organizations.types';
import { IOrganizationsRepository } from './organizations.repository';
import { Symbols } from 'symbols';
import { isIncludedIn, isNonNullish, isNullish } from 'remeda';
import {
  CREATE_ORGANIZATION_PROFILE_ROLES,
  PROFILE_CONFIRM_ROLES,
} from 'src/users/profiles/profiles.constant';
import { UnAuthorizedError } from 'src/errors/errors';
import { IProfilesLoader } from 'src/users/profiles/profiles.types';
import { RequestUser } from 'src/auth/auth.types';
import { Nullable } from 'src/common.types';
import { ORGANIZATION_OWNERSHIP_ROLES } from './constants';

@Injectable()
export class OrganiztionsService
  implements IOrganizationOwnershipLoader, IOrganizationsLoader, IOrganizationRostersLoader
{
  public constructor(
    @Inject(Symbols.OrganizationsRepository)
    private readonly _organizationRepo: IOrganizationsRepository,
    @Inject(Symbols.ProfilesLoader) private readonly _profileLoader: IProfilesLoader
  ) {}
  public async getOrganizationRostersByProfileId(
    profileId: string
  ): Promise<OrganizationRosterWithOrganization[]> {
    return await this._organizationRepo.findRostersByProfileId(profileId);
  }

  public async getOwnershipByProfile(profileId: string): Promise<OrganizationOwnership[]> {
    return await this._organizationRepo.findOwnershipsByProfileId(profileId);
  }
  public getOrganizationRosterByProfileIdAndOrganizationId({
    profileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationRoster>> {
    return this._organizationRepo.findRosterByProfileIdAndOrganizationId({
      profileId,
      organizationId,
    });
  }

  public async getOrganizationById(id: number): Promise<Nullable<Organization>> {
    return await this._organizationRepo.findOrganizationById(id);
  }

  public async findOwnershipByProfileIdAndOrganizationId({
    profileId: requestProfileId,
    organizationId,
  }: {
    profileId: string;
    organizationId: number;
  }): Promise<Nullable<OrganizationOwnership>> {
    return await this._organizationRepo.findOwnershipByProfileIdAndOrganizationId({
      profileId: requestProfileId,
      organizationId,
    });
  }

  public async getAllOrganizations(user: RequestUser) {
    const { profileId } = user;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    const requestProfile = await this._profileLoader.getProfileById(profileId);
    if (isNullish(requestProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }
    if (!requestProfile.isOrganizationAuth()) {
      throw new UnAuthorizedError(
        `프로필 역할이 조직 조회 권한이 없습니다. 현재 프로필 역할: ${requestProfile.role}, 필요한 프로필 역할: ${CREATE_ORGANIZATION_PROFILE_ROLES.join(', ')}`
      );
    }

    return await this._organizationRepo.findAllOrganizations();
  }

  public async getMyOrganizationRosters(user: RequestUser) {
    const { profileId } = user;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }

    const organiztionRosters = await this._organizationRepo.findRostersByProfileId(profileId);
    return organiztionRosters;
  }

  public async addProfileToOrganizationOwnership(param: AddProfileToOrganizationOwnershipParam) {
    const { addProfileId, organizationId, profileId: requestProfileId, role } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    /**
     * 주관리자만이 조직 소유권을 추가할 수 있습니다.
     */
    const ownership = await this.findOwnershipByProfileIdAndOrganizationId({
      profileId: requestProfileId,
      organizationId,
    });

    if (isNullish(ownership) || ownership.role !== ORGANIZATION_OWNERSHIP_ROLES.MAIN) {
      throw new UnAuthorizedError(
        '조직 소유권을 추가할 수 있는 권한이 없습니다. 조직 소유권을 추가할 수 있는 프로필로 로그인해주세요.'
      );
    }

    const foundProfile = await this._profileLoader.getProfileById(addProfileId);
    if (isNullish(foundProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }

    if (!foundProfile.isOrganizationAuth()) {
      throw new UnAuthorizedError(
        `프로필 역할이 조직 소유권에 대한 권한을 부여받을 수 없습니다. 현재 프로필 역할: ${foundProfile.role}, 필요한 프로필 역할: ${CREATE_ORGANIZATION_PROFILE_ROLES.join(', ')}`
      );
    }
    const foundOwnership = await this._organizationRepo.findOwnershipByProfileIdAndOrganizationId({
      profileId: addProfileId,
      organizationId,
    });
    if (isNonNullish(foundOwnership)) {
      throw new UnAuthorizedError('이미 조직 소유권에 있는 프로필입니다.');
    }

    await this._organizationRepo.createOrganizationOwnership({
      organizationId,
      addProfileId,
      role,
    });
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

    await this._organizationRepo.createOrganizationAndOwnership(param);
  }

  public async getOrganizationRoster(parma: { profileId?: string; organizationId: number }) {
    const { profileId, organizationId } = parma;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    const foundOrganization = await this.getOrganizationById(organizationId);
    if (isNullish(foundOrganization)) {
      throw new UnAuthorizedError('존재하지 않는 조직입니다.');
    }

    return await this._organizationRepo.findRostersByOrgnizationId(organizationId);
  }

  public async addProfileToOrganizationRoster(param: AddProfileToRosterParam) {
    const { organizationId, addProfileId, profileId: requestProfileId } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }

    const ownership = await this.findOwnershipByProfileIdAndOrganizationId({
      profileId: requestProfileId,
      organizationId,
    });
    if (isNullish(ownership)) {
      throw new UnAuthorizedError(
        '조직 관리자/부관리자가 아닙니다. 조직 관리자/부관리자 프로필로 로그인해주세요.'
      );
    }

    const foundOrganization = await this.getOrganizationById(organizationId);
    if (isNullish(foundOrganization)) {
      throw new UnAuthorizedError('존재하지 않는 조직입니다.');
    }

    const foundProfile = await this._profileLoader.getProfileById(addProfileId);
    if (isNullish(foundProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }
    /**
     * 프로필 역할이 조직 로스터에 추가할 수 있는 역할인지 확인합니다.
     */
    if (isIncludedIn(foundProfile.role, CREATE_ORGANIZATION_PROFILE_ROLES)) {
      throw new UnAuthorizedError(
        `프로필 역할을 조직 로스터에 추가할 수 없습니다. 현재 프로필 역할: ${foundProfile.role}, 대상 프로필 역할: ${PROFILE_CONFIRM_ROLES.join(', ')}`
      );
    }
    /**
     * 프로필이 이미 조직 로스터에 있는지 확인합니다.
     */
    const profileRoster = await this._organizationRepo.findRosterByProfileIdAndOrganizationId({
      profileId: addProfileId,
      organizationId,
    });

    if (!isNullish(profileRoster)) {
      throw new UnAuthorizedError('이미 조직 로스터에 있는 프로필입니다.');
    }

    await this._organizationRepo.addProfileToRoster(param);
  }
}
