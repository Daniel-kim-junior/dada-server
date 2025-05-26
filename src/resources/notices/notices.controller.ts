import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { Symbols } from 'symbols';
import { CreateNoticeValidator } from './notices.validator';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { RequestUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('resources/notices')
@UseGuards(JwtAuthGuard)
export class NoticesController {
  public constructor(
    @Inject(Symbols.NoticesService) private readonly _noticesService: NoticesService
  ) {}

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
  public async createNotice(@ReqUser() user: RequestUser, @Body() param: CreateNoticeValidator) {
    await this._noticesService.createNotice({
      ...user,
      ...param,
    });
  }
}
