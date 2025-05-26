import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { isNonNullish } from 'remeda';
import { Nullable } from 'src/common.types';

export class CreateClassValidator {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @IsString()
  @Length(0, 1000)
  public description: Nullable<string>;
}

export class CreateOrganizationValidator {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @IsString()
  @ValidateIf((o) => isNonNullish(o.description))
  @Length(1, 1000)
  public description?: string;

  @IsString()
  @ValidateIf((o) => isNonNullish(o.logo))
  @Length(1, 255)
  public logo?: string;
}

export class AddProfileToRosterValidator {
  @IsString()
  @IsNotEmpty()
  public addProfileId: string;
}
