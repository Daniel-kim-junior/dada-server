import { IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from 'class-validator';
import { isNonNullish } from 'remeda';

export class CreateClassValidator {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @IsString()
  @ValidateIf((o) => isNonNullish(o.description))
  @Length(0, 1000)
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public organizationId: number;
}
