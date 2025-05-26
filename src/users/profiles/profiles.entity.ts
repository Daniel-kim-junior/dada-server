import { ProfileRole, Profiles } from './profiles.types';
import { PROFILE_ROLES } from './profiles.constant';

export class ProfilesEntity {
  private _createdAt: Date;
  private _deletedAt: Date;
  private _updatedAt: Date;
  private _id: string;
  private _userId: string;
  private _profilePicture: string;
  private _nickname: string;
  private _introduction: string;
  private _role: ProfileRole;

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
    entity._role = profile.role;

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

  public isOrganizationAuth(): boolean {
    return this._role === PROFILE_ROLES.ADMIN || this._role === PROFILE_ROLES.INSTRUCTOR;
  }

  public isNoticeAuth(): boolean {
    return this._role === PROFILE_ROLES.ADMIN || this._role === PROFILE_ROLES.INSTRUCTOR;
  }

  public isStudent(): boolean {
    return this._role === PROFILE_ROLES.STUDENT;
  }

  public isParents(): boolean {
    return this._role === PROFILE_ROLES.PARENTS;
  }

  public get id(): string {
    return this._id;
  }

  public get role() {
    return this._role;
  }
}
