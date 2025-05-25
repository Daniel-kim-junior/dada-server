import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/types';
import { ReqUser } from 'src/decorator/request-user.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  @Get(':id')
  public async getCourseById(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 분반 ID로 상세 조회
    return '분반이 성공적으로 조회되었습니다.';
  }
  @Post(':id/join')
  public async joinCourse(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 분반 참여 body 프로필 id
    return '분반 참여가 성공적으로 완료되었습니다.';
  }
  @Delete('/leave/:id')
  public async leaveCourse(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 분반 탈퇴 쿼리스트링 프로필 id
    return '분반 탈퇴가 성공적으로 완료되었습니다.';
  }

  @Delete(':id')
  public async deleteCourse(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 분반 삭제
    return '분반이 성공적으로 삭제되었습니다.';
  }
}
