import { Body, Controller, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { Symbols } from 'symbols';
import { SessionsService } from './sessions.service';
import { SessionApplyValidator } from './sessions.validator';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * 회차
 */
@ApiTags('Sessions')
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
  @ApiBody({
    type: SessionApplyValidator,
    description: '회차 분반 참가 신청',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '회차 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '회차 분반 참가 신청을 완료합니다.',
  })
  @Post(':id/apply')
  public async getSessionById(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: SessionApplyValidator
  ): Promise<void> {
    await this._sessionService.applySession({
      ...user,
      sessionId: id,
      ...param,
    });
  }
}
