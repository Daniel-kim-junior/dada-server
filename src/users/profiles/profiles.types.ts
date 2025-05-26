import { RequestUser } from 'src/auth/auth.types';
import { CreateProfileConnectionValidator, CreateProfileValidator } from './profiles.validator';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import {
  PROFILE_CONFIRM_ROLES,
  PROFILE_ROLES,
  PROFILE_CONNECTION_STATUS,
} from './profiles.constant';

export type ProfileRole = (typeof PROFILE_ROLES)[number];
export type ProfileConnectionStatus = keyof typeof PROFILE_CONNECTION_STATUS;
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

export type ProfileConnections = {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  id: number;
  status: string;
  requesterProfileId: string;
  targetProfileId: string;
  message: Nullable<string>;
};
export type ProfileConfirmRole = (typeof PROFILE_CONFIRM_ROLES)[number];

export type CreateProfileParam = InstanceType<typeof CreateProfileValidator> & RequestUser;

export type IProfilesLoader = {
  getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>>;
};

export type CreateProfileConnectionParam = InstanceType<typeof CreateProfileConnectionValidator> &
  RequestUser;
