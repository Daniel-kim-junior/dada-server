import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Matches,
  IsUUID,
  ValidateIf,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { isNonNullish } from 'remeda';

export class CreateClassValidator {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @IsString()
  @Length(0, 1000)
  @ValidateIf((o) => isNonNullish(o.description))
  public description?: string;

  @IsNumber()
  @IsNotEmpty()
  public organizationId: number;

  @IsDateString()
  @IsNotEmpty()
  public openDate: Date;

  @IsDateString()
  @IsNotEmpty()
  public closeDate: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => ScheduleValidator)
  public schedules: ScheduleValidator[];
}

export class ScheduleValidator {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  public instructorProfileId: string;

  @IsNumber()
  @ValidateIf((o) => isNonNullish(o.classroomId))
  public classroomId?: number;

  @IsDateString()
  @IsNotEmpty()
  public timeData: string;
}
