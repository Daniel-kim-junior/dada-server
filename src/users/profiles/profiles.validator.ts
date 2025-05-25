import { IsDefined, IsIn, IsString, Length, ValidateIf } from 'class-validator';
import { PROFILE_ROLES, ProfileRole } from './profiles.types';
import { Nullable } from 'src/common.types';
import { isNullish } from 'remeda';

export class CreateProfileValidator {
  @IsDefined()
  @IsIn(PROFILE_ROLES)
  public role: ProfileRole;

  @IsDefined()
  @IsString()
  @Length(2, 50)
  public nickname: string;

  @IsString()
  @ValidateIf((o) => !isNullish(o.introduction))
  @Length(0, 500)
  public introduction: string;
}
