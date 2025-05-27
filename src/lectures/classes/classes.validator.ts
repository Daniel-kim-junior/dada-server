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

  @IsString()
  @IsNotEmpty()
  @Matches(/^(월|화|수|목|금|토|일) ([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime은 "(요일) HH:mm" 형식이어야 합니다 (예: 월 08:00)',
  })
  public startTime: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(월|화|수|목|금|토|일) ([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'endTime은 "(요일) HH:mm" 형식이어야 합니다 (예: 금 18:30)',
  })
  public endTime: string;
}
