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
