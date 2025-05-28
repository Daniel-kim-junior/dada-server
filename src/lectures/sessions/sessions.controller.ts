import { Body, Controller, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { Symbols } from 'symbols';
import { SessionsService } from './sessions.service';
import { SessionApplyValidator } from './sessions.validator';

/**
 * 회차
 */
@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  public constructor(
    @Inject(Symbols.SessionsService) private readonly _sessionService: SessionsService
  ) {}

  /**
   * 회차에 어떤 분반에 참가 신청
   * @param user
   * @param id 세션
   * @returns
   */
  @Post(':id/apply')
  public async getSessionById(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: SessionApplyValidator
  ): Promise<string> {
    await this._sessionService.applySession({
      ...user,
      sessionId: id,
      ...param,
    });
    return '세션이 성공적으로 조회되었습니다.';
  }
}
