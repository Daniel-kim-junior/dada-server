export type JwtPayload = {
  sub: string; // Subject (user ID)
  permissions: string[]; // 권한 목록
};

import { UserSignInValidator, UserSignUpValidator } from './auth.validator';
import { AUTH_TYPES } from './constants';

export type UserSignUpParam = InstanceType<typeof UserSignUpValidator>;
export type UserSignInParam = InstanceType<typeof UserSignInValidator>;
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
