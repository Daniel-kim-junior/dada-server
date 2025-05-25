import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionsController {
  @Get(':id')
  public async getSessionById(): Promise<string> {
    // 세션 ID로 상세 조회
    return '세션이 성공적으로 조회되었습니다.';
  }
  @Get('courses')
  public async getSessionCourses(): Promise<string> {
    // 회차에 속한 분반 목록 조회 쿼리스트링 :id
    return '회차의 분반 목록이 성공적으로 조회되었습니다.';
  }

  @Post()
  public async createSession(): Promise<string> {
    // 회차 생성
    return '회차가 성공적으로 생성되었습니다.';
  }

  @Delete(':id')
  public async deleteSession(): Promise<string> {
    // 회차 삭제
    return '회차가 성공적으로 삭제되었습니다.';
  }
}
