import { IsIn, IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from 'class-validator';
import { NoticeType } from './notices.types';
import { NOTICE_TYPE_LIST } from './notices.constant';

export class CreateNoticeValidator {
  @IsString()
  @Length(1, 255)
  public title: string;

  @IsString()
  @ValidateIf((o) => o.content !== undefined)
  @Length(1, 5000)
  public content?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(NOTICE_TYPE_LIST)
  public type: NoticeType;

  @IsNumber()
  @IsNotEmpty()
  public referenceId: number;
}

export class LongPollingNoticeQueryValidator {
  @IsString()
  @IsNotEmpty()
  @IsIn(NOTICE_TYPE_LIST)
  public type: NoticeType;

  @IsNumber()
  @IsNotEmpty()
  public referenceId: number;

  @IsNumber()
  public timeout?: number;

  @IsNumber()
  public lastNoticeId?: number; // 마지막으로 클라이언트가 확인한 공지사항 ID

  @IsNumber()
  public limit?: number; // 최대 공지사항 개수
}
