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
