import { ApiProperty } from '@nestjs/swagger';
export class NoticeDto {
  @ApiProperty({
    description: '공지사항 제목',
  })
  title: string;
  @ApiProperty({
    description: '공지사항 내용',
  })
  content: string;
  @ApiProperty({
    description: '공지사항 생성일',
    type: Date,
  })
  createdAt: Date;
  @ApiProperty({
    description: '공지사항 수정일',
    type: Date,
  })
  updatedAt: Date;
}

export class GetNoticesDto {
  @ApiProperty({
    description: '공지사항 목록',
    type: [NoticeDto],
    example: [
      {
        title: '공지사항 제목',
        content: '공지사항 내용',
        createdAt: '2023-10-01T00:00:00.000Z',
        updatedAt: '2023-10-01T00:00:00.000Z',
      },
    ],
    required: true,
  })
  notices: NoticeDto[];
}
