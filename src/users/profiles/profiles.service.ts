import { Inject, Injectable } from '@nestjs/common';
import { IProfilesRepository } from './profiles.repository';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Symbols } from 'symbols';

@Injectable()
export class ProfilesService {
  public constructor(
    @Inject(Symbols.ProfilesRepository) private readonly _repo: IProfilesRepository
  ) {}

  public async getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>> {
    return await this._repo.getProfileById(profileId);
  }
}
