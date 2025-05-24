import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNullish } from 'remeda';
import { Birth, Nullable } from 'src/common.types';

// AI Assistant
@ValidatorConstraint({ async: false })
export class IsBirthDateConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;

    return isNullish(BirthDate.create(value));
  }
  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return '생년월일은 유효한 YYYY-MM-DD 형식이어야 하며, 1900년 이후부터 오늘 날짜까지 가능합니다.';
  }
}

export function IsBirthDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBirthDateConstraint,
    });
  };
}

export const BirthDate = {
  create: (dateString: string): Nullable<Birth> => {
    // YYYY-MM-DD 형식 체크
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return null;

    // 실제 유효한 날짜인지 체크
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    // 입력된 날짜와 파싱된 날짜가 일치하는지 체크 (예: 2023-02-30 방지)
    const [year, month, day] = dateString.split('-').map(Number);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return null;
    }

    // 미래 날짜 방지
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) return null;

    // 너무 과거 날짜 방지 (1900년 이후)
    const minDate = new Date('1900-01-01');
    if (date < minDate) return null;

    return dateString as Nullable<Birth>;
  },
};

export function TransformToBirth() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    // 입력값 정규화 (공백 제거)
    const trimmedValue = value.trim();

    // BirthDate 브랜드 타입으로 변환 시도
    const birthDate = BirthDate.create(trimmedValue);

    // 변환 실패시 원본값 반환 (validator에서 에러 처리)
    return birthDate || value;
  });
}
