import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNonNullish } from 'remeda';
import { Nullable, UserName } from 'src/common.types';

// AI Assistant
@ValidatorConstraint({ async: false })
export class IsUserNameConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;

    return isNonNullish(UserNameTransfrom.create(value));
  }
  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return '유저 이름은 ';
  }
}

export function IsUserName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNameConstraint,
    });
  };
}

export const UserNameTransfrom = {
  create: (userName: string): Nullable<UserName> => {
    return userName as Nullable<UserName>;
  },
};

export function TransformToUserName() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();

    const userName = UserNameTransfrom.create(trimmedValue);

    return userName || value;
  });
}
