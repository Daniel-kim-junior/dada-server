import {
  UserProfileSelectValidator,
  UserSignInValidator,
  UserSignUpValidator,
} from './auth.validator';
import { AUTH_TYPES } from './auth.constants';

export type JwtPayload = {
  sub: string; // Subject (user ID)
  permissions: string[]; // 권한 목록
  profileId?: string; // 프로필 ID (선택적)
};

export type RequestUser = {
  userId: string;
  permissions: string[]; // 권한 목록
  profileId?: string;
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

export type SignInResponse = {
  accessToken: string;
};

export type UserProfileSelectResponse = SignInResponse & {
  profileId: string;
};
