import { RequestUser } from 'src/auth/auth.types';
import { CreateProfileConnectionValidator, CreateProfileValidator } from './profiles.validator';
import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import {
  PROFILE_CONFIRM_ROLES,
  PROFILE_CONNECTION_STATUS,
  PROFILE_ROLE_LIST,
} from './profiles.constant';

export type ProfileRole = (typeof PROFILE_ROLE_LIST)[number];
export type ProfileConnectionStatus = keyof typeof PROFILE_CONNECTION_STATUS;
export type Profile = {
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

export type GetProfileConnectionResponse = {
  connections: {
    id: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    requesterProfileId: string;
    targetProfileId: string;
    isTargetProfile: boolean;
    isRequesterProfile: boolean;
  }[];
};
