import { ApiProperty } from '@nestjs/swagger';
import { PROFILE_CONNECTION_STATUS, PROFILE_ROLES } from './profiles.constant';
import { ProfileRole } from './profiles.types';

export class PartialProfileResponseDto {
  @ApiProperty({
    description: '프로필 ID',
  })
  public id: string;
  @ApiProperty({
    description: '프로필 역할',
    enum: PROFILE_ROLES,
    enumName: 'ProfileRole',
  })
  public role: ProfileRole;

  @ApiProperty({
    description: '프로필 사진 URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  public profilePicture: string;

  @ApiProperty({
    description: '프로필 닉네임',
    example: '홍길동',
  })
  public nickname: string;

  @ApiProperty({
    description: '프로필 소개',
    example: '안녕하세요, 저는 홍길동입니다.',
  })
  public introduction: string;

  @ApiProperty({
    description: '프로필 생성 날짜',
    type: Date,
  })
  public createdAt: Date;

  @ApiProperty({
    description: '프로필 업데이트 날짜',
    type: Date,
  })
  public updatedAt: Date;

  @ApiProperty({
    description: '프로필 삭제 날짜',
    type: Date,
    required: false,
  })
  public deletedAt?: Date;
}

export class ConnectionsDto {
  @ApiProperty({
    description: '프로필 연결 ID',
    type: Number,
  })
  public id: number;

  @ApiProperty({
    description: '프로필 연결 상태',
    enum: PROFILE_CONNECTION_STATUS,
    enumName: 'ProfileConnectionStatus',
  })
  public status: string;

  @ApiProperty({
    description: '프로필 연결 생성 날짜',
    type: Date,
  })
  public createdAt: Date;

  @ApiProperty({
    description: '프로필 연결 업데이트 날짜',
    type: Date,
  })
  public updatedAt: Date;

  @ApiProperty({
    description: '요청자 프로필 ID',
    type: String,
  })
  public requesterProfileId: string;

  @ApiProperty({
    description: '대상 프로필 ID',
    type: String,
  })
  public targetProfileId: string;

  @ApiProperty({
    description: '대상 프로필 여부',
    type: Boolean,
  })
  public isTargetProfile: boolean;

  @ApiProperty({
    description: '요청자 프로필 여부',
    type: Boolean,
  })
  public isRequesterProfile: boolean;
}

export class ConnectionResponseDto {
  @ApiProperty({
    description: '프로필 연결 목록',
    type: [ConnectionsDto],
  })
  public connections: ConnectionsDto[];
}
