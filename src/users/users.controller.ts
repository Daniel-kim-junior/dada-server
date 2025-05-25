import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get('list')
  public async getUsers(@ReqUser() user: RequestUser): Promise<string> {
    // 사용자 목록 조회 로직을 여기에 추가합니다. (페이지 네이션, 필터링 등)
    return '사용자 목록이 성공적으로 조회되었습니다.';
  }
  @Get()
  public async getUserById(
    @ReqUser() user: RequestUser,
    @Query('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 사용자 ID로 조회하는 로직을 여기에 추가합니다.
    return '사용자가 성공적으로 조회되었습니다.';
  }
}
