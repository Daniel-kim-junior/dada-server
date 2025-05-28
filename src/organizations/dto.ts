import { ApiProperty } from '@nestjs/swagger';
import {
  Organization,
  OrganizationRosterProfile,
  OrganizationRosterWithOrganization,
} from './organizations.types';
export class OrganizationRosterDto {
  @ApiProperty({
    description: '조직 ID',
    type: Number,
    required: true,
    example: 1,
  })
  public organizationId: number;

  @ApiProperty({
    description: '조직 이름',
    type: String,
    required: true,
    example: 'My Organization',
  })
  public organizationName: string;

  @ApiProperty({
    description: '조직 로고 URL',
    type: String,
    required: false,
    example: 'https://example.com/logo.png',
  })
  public organizationLogo?: string;

  @ApiProperty({
    description: '조직 설명',
    type: String,
    required: false,
    example: '이 조직은 ...',
  })
  public organizationDescription?: string;

  private constructor() {}

  public static of(org: OrganizationRosterWithOrganization) {
    const dto = new OrganizationRosterDto();
    dto.organizationId = org.organizationId;
    dto.organizationName = org.organizationName;
    dto.organizationLogo = org.organizationLogo;
    dto.organizationDescription = org.organizationDescription;

    return dto;
  }
}

export class OrganizationRosterResponseDto {
  @ApiProperty({
    description: '조직 로스터 목록',
    type: [OrganizationRosterDto],
    required: true,
  })
  public rosters: OrganizationRosterDto[];
}

export class OrganizationRosterProfileDto {
  @ApiProperty({
    description: '프로필 이름',
    type: String,
    required: true,
    example: '홍길동',
  })
  public nickname: string;

  @ApiProperty({
    description: '프로필 역할',
    type: String,
    required: true,
    example: 'ADMIN',
  })
  public role: string;

  @ApiProperty({
    description: '프로필 사진 URL',
    type: String,
    required: false,
    example: 'https://example.com/profile.jpg',
  })
  public profilePicture?: string;

  @ApiProperty({
    description: '프로필 소개',
    type: String,
    required: false,
    example: '안녕하세요, 저는 홍길동입니다.',
  })
  public introduction?: string;

  private constructor() {}
  public static of(rosterProfile: OrganizationRosterProfile) {
    const dto = new OrganizationRosterProfileDto();
    dto.nickname = rosterProfile.nickname;
    dto.introduction = rosterProfile.introduction;
    dto.role = rosterProfile.role;
    dto.profilePicture = rosterProfile.profilePicture;

    return dto;
  }
}

export class OrganizationRosterProfileResponseDto {
  @ApiProperty({
    description: '로스터 프로필 목록',
    type: [OrganizationRosterProfileDto],
    required: true,
  })
  public rosterProfiles: OrganizationRosterProfileDto[];
}

export class OrganizationsDto {
  @ApiProperty({
    description: '조직 ID',
    type: Number,
    required: true,
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: '조직 이름',
    type: String,
    required: true,
    example: 'My Organization',
  })
  public name: string;

  @ApiProperty({
    description: '조직 설명',
    type: String,
    required: false,
    example: '이 조직은 ...',
  })
  public description?: string;

  @ApiProperty({
    description: '조직 로고 URL',
    type: String,
    required: false,
    example: 'https://example.com/logo.png',
  })
  public logo?: string;

  @ApiProperty({
    description: '조직 생성 날짜',
    type: Date,
    required: true,
    example: '2023-01-01T00:00:00Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: '조직 업데이트 날짜',
    type: Date,
    required: true,
    example: '2023-01-01T00:00:00Z',
  })
  public updatedAt: Date;

  @ApiProperty({
    description: '조직 삭제 날짜',
    type: Date,
    required: false,
    example: '2023-01-01T00:00:00Z',
  })
  public deletedAt?: Date;

  private constructor() {}

  public static of(org: Organization) {
    const dto = new OrganizationsDto();
    dto.id = org.id;
    dto.name = org.name;
    dto.description = org.description;
    dto.logo = org.logo;
    dto.createdAt = org.createdAt;
    dto.updatedAt = org.updatedAt;
    dto.deletedAt = org.deletedAt;

    return dto;
  }
}

export class OrganizationResponseDto {
  @ApiProperty({
    description: '조직 목록',
    type: [OrganizationsDto],
    required: true,
  })
  public organizations: OrganizationsDto[];
}
