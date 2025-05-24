import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNonNullish, isNullish } from 'remeda';
import { Gender, Nullable } from 'src/common.types';

// AI Assistant
@ValidatorConstraint({ async: false })
export class IsGenderConstraint implements ValidatorConstraintInterface {
  public validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;

    return isNonNullish(GenderTransfrom.create(value));
  }
  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return '성별은 FEMALE 혹은 MALE 이여야만 합니다';
  }
}

export function IsGender(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGenderConstraint,
    });
  };
}

export const GenderTransfrom = {
  create: (gender: string): Nullable<Gender> => {
    const validateGenderArray = ['MALE', 'FEMALE'];
    const findGender = validateGenderArray.find((genderCandidate) => genderCandidate === gender);
    if (isNullish(findGender)) return null;
    return gender as Nullable<Gender>;
  },
};

export function TransformToGender() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();

    const gender = GenderTransfrom.create(trimmedValue);

    return gender || value;
  });
}
