import { IsBoolean, IsDefined, IsEmail, IsIn, IsString, IsUUID } from 'class-validator';
import { Birth, Gender, KoreanPhoneNumber, Password } from 'src/common.types';
import {
  IsBirthDate,
  IsGender,
  IsKoreanPhoneNumber,
  IsPassword,
  TransformToBirth,
  TransformToGender,
  TransformToKoreanPhoneNumber,
  TransformToPassword,
} from 'src/custom-validators';
import { AuthTypes } from './auth.types';
import { AUTH_TYPES } from './auth.constants';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Validator for user sign-in
 * @name 필수 길이 255자 제한 공백 제외
 * @birth 생년월일 형식 YYYY-MM-DD (AI 확인, 오늘 날짜 이전, 1900년 이후)
 * @gender 성별 형식 MALE/FEMALE
 * @email 이메일 형식
 * @phoneNumber 전화번호 형식 국가번호 포함
 * @privacyAgreement 개인정보 수집 및 이용 동의 여부
 * @thirdPartyAgreement 제3자 제공 동의 여부
 * @marketingAgreement 마케팅 수신 동의 여부
 * @export
 */
export class UserSignUpValidator {
  @IsDefined()
  @IsString()
  public userName: string;

  @IsDefined()
  @IsBirthDate()
  @TransformToBirth()
  public birth: Birth;

  @IsDefined()
  @IsGender()
  @TransformToGender()
  public gender: Gender;

  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsKoreanPhoneNumber()
  @TransformToKoreanPhoneNumber()
  public phoneNumber: KoreanPhoneNumber;

  @IsDefined()
  @IsPassword()
  @TransformToPassword()
  public password: Password;

  @IsDefined()
  @IsPassword()
  @TransformToPassword()
  public passwordConfirm: Password;

  @IsDefined()
  @IsBoolean()
  public privacyAgreement: boolean;

  @IsDefined()
  @IsBoolean()
  public thirdPartyAgreement: boolean;

  @IsDefined()
  @IsBoolean()
  public marketingAgreement: boolean;
}

export class UserSignInValidator {
  @ApiProperty({
    description: '사용자 식별자 (전화번호)',
    example: '010-1234-5678',
    required: true,
    type: String,
  })
  @IsDefined()
  @IsKoreanPhoneNumber()
  public identifier: string; // 전화번호

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'password123',
    required: true,
    type: String,
  })
  @IsDefined()
  @IsPassword()
  @TransformToPassword()
  public password: Password;

  @ApiProperty({
    description: '인증 타입',
    example: 'phoneNumber',
    required: true,
    enum: AUTH_TYPES,
    type: String,
  })
  @IsDefined()
  @IsIn(AUTH_TYPES)
  public authType: AuthTypes;
}

export class UserProfileSelectValidator {
  @ApiProperty({
    description: '사용자 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  @IsDefined()
  @IsUUID()
  public profileId: string; // 프로필 ID
}
