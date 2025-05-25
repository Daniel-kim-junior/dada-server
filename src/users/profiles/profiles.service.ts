import { Inject, Injectable } from '@nestjs/common';
import { IProfilesRepository } from './profiles.repository';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Symbols } from 'symbols';
import { CreateProfileParam, IProfilesLoader } from './profiles.types';
import { RequestUser } from 'src/auth/auth.types';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';

@Injectable()
export class ProfilesService implements IProfilesLoader {
  public constructor(
    @Inject(Symbols.ProfilesRepository) private readonly _repo: IProfilesRepository
  ) {}

  public async createProfile(param: CreateProfileParam) {
    await this._repo.createProfile(param);
  }

  public async getProfiles(user: RequestUser) {
    const { userId } = user;
    const profiles = await this._repo.getProfilesByUserId(userId);

    return profiles.map((profile) => profile.toResponse());
  }

  public async getProfile(user: RequestUser) {
    const { profileId } = user;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다');
    }
    const profile = await this._repo.getProfileById(profileId);
    if (isNullish(profile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다');
    }
    return profile.toResponse();
  }

  public async getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>> {
    return await this._repo.getProfileById(profileId);
  }
}
