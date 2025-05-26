import { Inject, Injectable } from '@nestjs/common';
import { IProfilesRepository } from './profiles.repository';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Symbols } from 'symbols';
import {
  CreateProfileConnectionParam,
  CreateProfileParam,
  IProfilesLoader,
  ProfileConnectionStatus,
} from './profiles.types';
import { RequestUser } from 'src/auth/auth.types';
import { isIncludedIn, isNullish } from 'remeda';
import { NotFoundError, RoleError, UnAuthorizedError } from 'src/errors/errors';
import { PROFILE_CONFIRM_ROLES, PROFILE_CONNECTION_STATUS } from './profiles.constant';

@Injectable()
export class ProfilesService implements IProfilesLoader {
  public constructor(
    @Inject(Symbols.ProfilesRepository) private readonly _profilesRepo: IProfilesRepository
  ) {}

  public async createProfile(param: CreateProfileParam) {
    await this._profilesRepo.createProfile(param);
  }

  public async getAllProfiles() {
    const profiles = await this._profilesRepo.getProfiles();

    return profiles.map((profile) => profile.toResponse());
  }

  public async getProfileConnections(user: RequestUser) {
    const { profileId, profileRole } = user;

    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다');
    }
    const profile = await this._profilesRepo.getProfileById(profileId);
    if (isNullish(profile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다');
    }

    if (!isIncludedIn(profileRole, PROFILE_CONFIRM_ROLES)) {
      throw new RoleError(
        `프로필 연결 요청을 확인할 수 있는 역할이 아닙니다. 현재 프로필 역할: ${profileRole}`
      );
    }

    /**
     * profile 연결 테이블에서 해당 프로필의 연결을 확인
     */
    const profileConnections = await this._profilesRepo.getProfileConnectionsByProfileId(profileId);

    /**
     * 자신이 연결을 요청하거나 받았을 수 있음
     */
    return profileConnections.toConnectionResponse(profileId);
  }

  public async getMyProfiles(user: RequestUser) {
    const { userId } = user;
    const profiles = await this._profilesRepo.getProfiles(userId);

    return profiles.map((profile) => profile.toResponse());
  }

  public async getProfile(user: RequestUser) {
    const { profileId } = user;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다');
    }
    const profile = await this._profilesRepo.getProfileById(profileId);
    if (isNullish(profile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다');
    }
    return profile.toResponse();
  }

  public async getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>> {
    return await this._profilesRepo.getProfileById(profileId);
  }

  public async createProfileConnection(param: CreateProfileConnectionParam) {
    const { profileId: requesterProfileId, targetProfileId, userId } = param;

    if (requesterProfileId === targetProfileId) {
      throw new UnAuthorizedError('자신에게 연결 요청을 보낼 수 없습니다');
    }

    const requesterProfile = await this._profilesRepo.getProfileById(requesterProfileId);
    if (isNullish(requesterProfile)) {
      throw new UnAuthorizedError(
        `요청 프로필이 존재하지 않는 프로필입니다. id: ${requesterProfileId}`
      );
    }

    const profiles = await this._profilesRepo.getProfiles(userId);
    const targetProfileIdInUser = profiles.find((profile) => profile.id === targetProfileId);
    if (!isNullish(targetProfileIdInUser)) {
      throw new UnAuthorizedError('같은 사용자에 속한 프로필에게 연결 요청을 보낼 수 없습니다');
    }

    const targetProfile = await this._profilesRepo.getProfileById(targetProfileId);
    if (isNullish(targetProfile)) {
      throw new UnAuthorizedError('대상 프로필이 존재하지 않는 프로필입니다');
    }

    if (
      targetProfile.role === requesterProfile.role ||
      !PROFILE_CONFIRM_ROLES.includes(targetProfile.role) ||
      !PROFILE_CONFIRM_ROLES.includes(requesterProfile.role)
    ) {
      throw new UnAuthorizedError(
        `대상 프로필의 역할이 요청 프로필과 동일하거나 연결 요청을 확인할 수 없는 역할입니다. 요청 프로필 역할: ${requesterProfile.role}, 대상 프로필 역할: ${targetProfile.role}`
      );
    }

    await this._profilesRepo.createProfileConnection({
      ...param,
      status: PROFILE_CONNECTION_STATUS.PENDING,
    });
  }

  public async updateProfileConnection(param: {
    connectionId: number;
    status: ProfileConnectionStatus;
    profileId?: string;
  }) {
    const { connectionId, profileId: requestProfileId, status: updateStatus } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다');
    }

    const connections = await this._profilesRepo.getConnectionProfileById(connectionId);
    const connection = connections.onlyOneConnection();
    if (isNullish(connection)) {
      throw new NotFoundError('존재하지 않는 프로필 연결입니다');
    }

    if (connection.status !== PROFILE_CONNECTION_STATUS.PENDING) {
      throw new UnAuthorizedError('이미 처리된 프로필 연결 요청입니다');
    }

    if (connection.targetProfileId !== requestProfileId) {
      throw new UnAuthorizedError(
        `대상 프로필이 요청 프로필과 일치하지 않습니다. 요청 프로필 id: ${requestProfileId}, 연결 대상 프로필 id: ${connection.targetProfileId}`
      );
    }

    await this._profilesRepo.updateProfileConnectionStatus(connectionId, updateStatus);
  }
}
