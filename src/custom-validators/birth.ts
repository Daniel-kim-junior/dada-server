import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// AI Assistant
@ValidatorConstraint({ async: false })
export class IsBirthDateConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;

    // YYYY-MM-DD 형식 체크
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) return false;

    const date = new Date(value);
    if (isNaN(date.getTime())) return false;

    const [year, month, day] = value.split('-').map(Number);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) return false;

    return true;
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
