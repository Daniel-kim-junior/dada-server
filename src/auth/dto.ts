import { ApiProperty } from '@nestjs/swagger';
import { PROFILE_ROLES } from 'src/users/profiles/profiles.constant';
import { ProfileRole } from 'src/users/profiles/profiles.types';

export class SignInResponseDto {
  @ApiProperty({
    description: 'Access Token',
    example: 'WEB_ACCESS_TOKEN_EXAMPLE',
    required: true,
    type: String,
  })
  accessToken: string;
}

export class UserProfileSelectResponse extends SignInResponseDto {
  @ApiProperty({
    description: '사용자 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  public profileId: string;

  @ApiProperty({
    description: '사용자 프로필 역할',
    example: 'STUDENT',
    required: true,
    enum: PROFILE_ROLES,
  })
  public profileRole: ProfileRole;
}
