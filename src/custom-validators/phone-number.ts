import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNonNullish } from 'remeda';
import { KoreanPhoneNumber, Nullable } from 'src/common.types';

/**
 * 한국 핸드폰번호 Validator Constraint
 */
@ValidatorConstraint({ async: false })
export class IsKoreanPhoneNumberConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;
    const koreanPhoneNumber = KoreanPhoneNumberTransform.create(value);

    return isNonNullish(koreanPhoneNumber);
  }

  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return '올바른 한국 핸드폰번호 형식이 아닙니다.';
  }
}

/**
 * 한국 핸드폰번호 Decorator
 */
export function IsKoreanPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsKoreanPhoneNumberConstraint,
    });
  };
}

/**
 * 한국 핸드폰번호 Transform 유틸리티
 */
export const KoreanPhoneNumberTransform = {
  /**
   * 문자열을 한국 핸드폰번호로 변환 및 검증
   */
  create: (phone: string): Nullable<KoreanPhoneNumber> => {
    if (!phone || typeof phone !== 'string') return null;

    // 전처리: 공백, 하이픈 제거
    const cleaned = phone.trim().replace(/[\s\-\(\)]/g, '');

    // 010으로 시작하는 경우 (국내번호)만 고려
    if (cleaned.startsWith('010')) {
      if (/^01[0-9]\d{8}$/.test(cleaned)) {
        // 010을 10으로 변경하고 +82 추가
        const internationalNumber = '+82' + cleaned.substring(1);

        const formattingPhoneNumber = KoreanPhoneNumberTransform.format(
          internationalNumber
        ) as KoreanPhoneNumber;

        return formattingPhoneNumber;
      }
      return null;
    }

    return null;
  },

  /**
   * 표준 형식으로 포맷팅 (+82 10 XXXX XXXX)
   */
  format: (phone: string): string => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    if (cleaned.startsWith('+82')) {
      const number = cleaned.substring(3);
      if (number.length === 10) {
        return `+82 ${number.substring(0, 2)} ${number.substring(2, 6)} ${number.substring(6)}`;
      }
    }

    return phone;
  },
};

/**
 * Transform Decorator: 입력값을 한국 핸드폰번호로 변환
 */
export function TransformToKoreanPhoneNumber() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();
    const phoneNumber = KoreanPhoneNumberTransform.create(trimmedValue);

    return phoneNumber || value; // 변환 실패시 원본 반환 (validation에서 걸림)
  });
}
