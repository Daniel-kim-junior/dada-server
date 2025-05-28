import { IsNotEmpty, IsNumber } from 'class-validator';

export class SessionApplyValidator {
  @IsNumber()
  @IsNotEmpty()
  public classId: number;

  @IsNumber()
  @IsNotEmpty()
  public courseId: number;
}
