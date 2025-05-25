import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('resources/notices')
export class NoticesController {
  @Get()
  public async getNotices() {
    /**
     * long polling 예정
     */
    return '공지사항 목록이 성공적으로 조회되었습니다.';
  }

  @Get(':id')
  public async getNoticeById() {
    return '공지사항 상세 정보가 성공적으로 조회되었습니다.';
  }

  @Post()
  public async createNotice() {
    return '공지사항이 성공적으로 생성되었습니다.';
  }

  @Put(':id')
  public async updateNotice() {
    return '공지사항이 성공적으로 업데이트되었습니다.';
  }

  @Delete(':id')
  public async deleteNotice() {
    return '공지사항이 성공적으로 삭제되었습니다.';
  }
}
