import { IsIn, IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from 'class-validator';
import { NoticeType } from './notices.types';
import { NOTICE_TYPE_LIST } from './notices.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeValidator {
  @ApiProperty({
    description: '공지사항 제목',
    example: '새로운 업데이트 안내',
    required: true,
  })
  @IsString()
  @Length(1, 255)
  public title: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '이번 업데이트에서는 새로운 기능이 추가되었습니다.',
    required: false,
  })
  @IsString()
  @ValidateIf((o) => o.content !== undefined)
  @Length(1, 5000)
  public content?: string;

  @ApiProperty({
    description: '공지사항 유형',
    enum: NOTICE_TYPE_LIST,
    example: 'CLASS',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(NOTICE_TYPE_LIST)
  public type: NoticeType;

  @ApiProperty({
    description: '참조 ID (조직, 수업, 회차, 분반)',
    example: 123,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public referenceId: number;
}

export class LongPollingNoticeQueryValidator {
  @ApiProperty({
    description: '공지사항 유형',
    enum: NOTICE_TYPE_LIST,
    example: 'CLASS',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(NOTICE_TYPE_LIST)
  public type: NoticeType;

  @ApiProperty({
    description: '참조 ID (조직, 수업, 회차, 분반)',
    example: 123,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public referenceId: number;

  @ApiProperty({
    description: '타임아웃 시간 (초)',
    example: 30,
    required: false,
  })
  @IsNumber()
  public timeout?: number;

  @ApiProperty({
    description: '마지막으로 클라이언트가 확인한 공지사항 ID',
    example: 10,
    required: false,
  })
  @IsNumber()
  public lastNoticeId?: number; // 마지막으로 클라이언트가 확인한 공지사항 ID

  @ApiProperty({
    description: '최대 공지사항 개수',
    example: 20,
    required: false,
  })
  @IsNumber()
  public limit?: number; // 최대 공지사항 개수
}
