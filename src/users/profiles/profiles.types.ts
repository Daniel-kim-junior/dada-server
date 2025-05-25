import { RequestUser } from 'src/auth/auth.types';
import { CreateProfileValidator } from './profiles.validator';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';

export const PROFILE_ROLES = ['STUDENT', 'TEACHER', 'ADMIN'];
export type ProfileRole = (typeof PROFILE_ROLES)[number];
export type Profiles = {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  id: string;
  userId: string;
  role: ProfileRole;
  profilePicture: string;
  nickname: string;
  introduction: string;
};

export type CreateProfileParam = InstanceType<typeof CreateProfileValidator> & RequestUser;

export type IProfilesLoader = {
  getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>>;
};
