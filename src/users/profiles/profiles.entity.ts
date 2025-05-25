import { IsIn } from 'class-validator';
import { PROFILE_ROLES, ProfileRole, Profiles } from './profiles.types';

export class ProfilesEntity {
  public _createdAt: Date;
  public _deletedAt: Date;
  public _updatedAt: Date;
  public _id: string;
  public _userId: string;
  public _profilePicture: string;
  public _nickname: string;
  public _introduction: string;
  public _role: ProfileRole;

  @IsIn(PROFILE_ROLES)
  public role: ProfileRole;

  public static of(profile: Profiles): ProfilesEntity {
    const entity = new ProfilesEntity();
    entity._role = profile.role;
    entity._createdAt = profile.createdAt;
    entity._deletedAt = profile.deletedAt;
    entity._updatedAt = profile.updatedAt;
    entity._id = profile.id;
    entity._userId = profile.userId;
    entity._profilePicture = profile.profilePicture;
    entity._nickname = profile.nickname;
    entity._introduction = profile.introduction;
    entity.role = profile.role;

    return entity;
  }

  public toResponse(): Partial<Profiles> {
    return {
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      id: this._id,
      role: this._role,
      profilePicture: this._profilePicture,
      nickname: this._nickname,
      introduction: this._introduction,
    };
  }
}
