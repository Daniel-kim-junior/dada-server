import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNonNullish } from 'remeda';
import { Nullable, Password } from 'src/common.types';

// AI Assistant
@ValidatorConstraint({ async: false })
export class IsPassowrdConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;

    return isNonNullish(PasswordTransfrom.create(value));
  }
  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPassowrdConstraint,
    });
  };
}

export const PasswordTransfrom = {
  create: (password: string): Nullable<Password> => {
    // 비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 함
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;
    if (!passwordRegex.test(password)) return null;
    return password as Nullable<Password>;
  },
};

export function TransformToPassword() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();

    const password = PasswordTransfrom.create(trimmedValue);

    return password || value;
  });
}
