import { IsIn, IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { isNonNullish } from 'remeda';
import { ORGANIZATION_OWNERSHIP_POSSIBLE_ROLE_LIST } from './constants';
import { OrganizationRole } from './organizations.types';

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

export class AddProfileToOrganizationOwnershipValidator {
  @IsString()
  @IsNotEmpty()
  public addProfileId: string;

  /**
   * SUB role is the only possible role
   */
  @IsString()
  @IsIn(ORGANIZATION_OWNERSHIP_POSSIBLE_ROLE_LIST)
  public role: OrganizationRole;
}
