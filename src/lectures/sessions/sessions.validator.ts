import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SessionApplyValidator {
  @ApiProperty({
    description: '수업 ID',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  public classId: number;

  @ApiProperty({
    description: '분반 ID',
    example: 10,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  public courseId: number;
}
