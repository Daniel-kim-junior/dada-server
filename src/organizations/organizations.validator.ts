import { IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from 'class-validator';
import { isNonNullish } from 'remeda';

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
