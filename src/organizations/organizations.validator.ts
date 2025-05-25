import { IsNotEmpty, IsString, Length } from 'class-validator';
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
