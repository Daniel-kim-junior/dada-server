import { IsDefined, IsIn, IsString, IsUUID, Length, ValidateIf } from 'class-validator';
import { ProfileConnectionStatus, ProfileRole } from './profiles.types';
import { isNullish } from 'remeda';
import { PROFILE_CONNECTION_STATUS_LIST, PROFILE_ROLE_LIST } from './profiles.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileValidator {
  @ApiProperty({
    description: '프로필 역할',
    enum: PROFILE_ROLE_LIST,
    enumName: 'ProfileRole',
    example: 'STUDENT',
    required: true,
  })
  @IsDefined()
  @IsIn(PROFILE_ROLE_LIST)
  public role: ProfileRole;

  @ApiProperty({
    description: '프로필 nickname',
    example: '홍길동',
    required: true,
  })
  @IsDefined()
  @IsString()
  @Length(2, 50)
  public nickname: string;

  @ApiProperty({
    description: '프로필 소개',
    example: '안녕하세요',
    required: false,
  })
  @IsString()
  @ValidateIf((o) => !isNullish(o.introduction))
  @Length(0, 500)
  public introduction: string;
}

export class CreateProfileConnectionValidator {
  @ApiProperty({
    description: '연결을 희망하는 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  public targetProfileId: string;

  @ApiProperty({
    description: '메시지',
    example: '엄마다, 연결 요청을 보냅니다.',
    required: false,
  })
  @IsString()
  @ValidateIf((o) => !isNullish(o.message))
  @Length(0, 500)
  public message: string;
}

export class UpdateProfileConnectionValidator {
  @ApiProperty({
    description: '프로필 연결 업데이트 희망 상태',
    example: 'PENDING',
    required: true,
  })
  @IsDefined()
  @IsIn(PROFILE_CONNECTION_STATUS_LIST)
  public status: ProfileConnectionStatus;
}
