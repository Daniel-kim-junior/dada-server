import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsUUID,
  ValidateIf,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { isNonNullish } from 'remeda';
import { ApiProperty } from '@nestjs/swagger';
export class ScheduleValidator {
  @ApiProperty({
    description: '강사 프로필 ID',
    example: '10',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  public instructorProfileId: string;

  @ApiProperty({
    description: '강의실 id',
    example: '1',
    required: false,
    type: Number,
  })
  @IsNumber()
  @ValidateIf((o) => isNonNullish(o.classroomId))
  public classroomId?: number;

  @ApiProperty({
    description: '스케줄 시간 데이터',
    example: '월요일 오전 10시',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public timeData: string;
}

export class CreateClassValidator {
  @ApiProperty({
    description: '클래스 이름',
    example: '프로그래밍 기초',
    required: true,
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  public name: string;

  @ApiProperty({
    description: '클래스 설명',
    example: '이 클래스는 프로그래밍의 기초를 다룹니다.',
    required: false,
    minLength: 0,
    maxLength: 1000,
    type: String,
  })
  @IsString()
  @Length(0, 1000)
  @ValidateIf((o) => isNonNullish(o.description))
  public description?: string;

  @ApiProperty({
    description: '조직 ID',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  public organizationId: number;

  @ApiProperty({
    description: '클래스 오픈 날짜',
    example: '2023-10-01',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  public openDate: Date;

  @ApiProperty({
    description: '클래스 종료 날짜',
    example: '2023-12-31',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  public closeDate: Date;

  @ApiProperty({
    description: '클래스 분반 스케줄',
    type: [ScheduleValidator],
    required: true,
    minItems: 1,
    maxItems: 3,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => ScheduleValidator)
  public schedules: ScheduleValidator[];
}
