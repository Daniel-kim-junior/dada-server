import { IsIn, IsNotEmpty, IsString, IsUUID, Length, ValidateIf } from 'class-validator';
import { isNonNullish } from 'remeda';
import { ORGANIZATION_OWNERSHIP_POSSIBLE_ROLE_LIST } from './constants';
import { OrganizationRole } from './organizations.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationValidator {
  @ApiProperty({
    description: '조직 이름',
    example: 'My Organization',
    required: true,
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @ApiProperty({
    description: '조직 설명',
    example: '이 조직은 ...',
    required: false,
    minLength: 1,
    maxLength: 1000,
    type: String,
  })
  @IsString()
  @ValidateIf((o) => isNonNullish(o.description))
  @Length(1, 1000)
  public description?: string;

  @ApiProperty({
    description: '조직 로고 URL',
    example: 'https://example.com/logo.png',
    required: false,
    minLength: 1,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @ValidateIf((o) => isNonNullish(o.logo))
  @Length(1, 255)
  public logo?: string;
}

export class AddProfileToRosterValidator {
  @ApiProperty({
    description: '추가할 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
    minLength: 36,
  })
  @IsUUID()
  @IsNotEmpty()
  public addProfileId: string;
}

export class AddProfileToOrganizationOwnershipValidator {
  @ApiProperty({
    description: '추가할 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
    minLength: 36,
  })
  @IsUUID()
  @IsNotEmpty()
  public addProfileId: string;

  @ApiProperty({
    description: '조직 소유권 역할',
    example: 'ADMIN',
    required: true,
    enum: ORGANIZATION_OWNERSHIP_POSSIBLE_ROLE_LIST,
    type: String,
  })
  @IsString()
  @IsIn(ORGANIZATION_OWNERSHIP_POSSIBLE_ROLE_LIST)
  public role: OrganizationRole;
}
