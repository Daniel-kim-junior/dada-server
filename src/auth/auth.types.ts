import { UserProfileSelectValidator, UserSignInValidator } from './auth.validator';
import { AUTH_TYPES } from './auth.constants';
import { ProfileRole } from 'src/users/profiles/profiles.types';

export type JwtPayload = {
  sub: string; // Subject (user ID)
  permissions: string[]; // 권한 목록
  profileId?: string; // 프로필 ID (선택적)
  profileRole?: ProfileRole; // 프로필 역할 (선택적)
};

export type RequestUser = {
  userId: string;
  permissions: string[];
  profileId?: string;
  profileRole?: ProfileRole;
};

export type UserSignInParam = InstanceType<typeof UserSignInValidator>;
export type UserProfileSelectParam = InstanceType<typeof UserProfileSelectValidator> & RequestUser;
export type AuthTypes = (typeof AUTH_TYPES)[number];

export type Auth = {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  userId: string;
  identifier: string;
  password: string;
  type: string;
};

export type accessToken = {
  accessToken: string;
};



