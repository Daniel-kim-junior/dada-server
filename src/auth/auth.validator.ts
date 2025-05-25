import { IsBoolean, IsDefined, IsEmail, IsString } from 'class-validator';
import { Birth, Gender, KoreanPhoneNumber, Password } from 'src/common.types';
import {
  IsBirthDate,
  IsGender,
  IsKoreanPhoneNumber,
  IsPassword,
  TransformToBirth,
  TransformToGender,
  TransformToKoreanPhoneNumber,
  TransformToPassowrd,
} from 'src/custom-validators';

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
  @TransformToPassowrd()
  public password: Password;

  @IsDefined()
  @IsPassword()
  @TransformToPassowrd()
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
