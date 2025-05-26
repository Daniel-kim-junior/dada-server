import { IsDefined, IsIn, IsString, IsUUID, Length, ValidateIf } from 'class-validator';
import { ProfileRole } from './profiles.types';
import { isNullish } from 'remeda';
import { PROFILE_ROLES } from './profiles.constant';

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

export class CreateProfileConnectionValidator {
  @IsDefined()
  @IsUUID()
  public targetProfileId: string;

  @IsString()
  @ValidateIf((o) => !isNullish(o.message))
  @Length(0, 500)
  public message: string;
}
