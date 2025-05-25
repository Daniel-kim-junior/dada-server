import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('classes')
export class ClassesController {
  @Get(':id')
  public async getClassById(): Promise<string> {
    // 클래스 ID로 조회하는 로직을 여기에 추가합니다.
    return '클래스가 성공적으로 조회되었습니다.';
  }

  @Get('sessions')
  public async getClassCourses(): Promise<string> {
    // 클래스에 속한 회차 목록 조회 로직을 여기에 추가합니다. 쿼리스트링 :id
    return '클래스의 회차 목록이 성공적으로 조회되었습니다.';
  }

  @Post()
  public async createClass(): Promise<string> {
    // 클래스 생성 로직을 여기에 추가합니다.
    return '클래스가 성공적으로 생성되었습니다.';
  }

  @Delete(':id')
  public async deleteClass(): Promise<string> {
    // 클래스 삭제 로직을 여기에 추가합니다.
    return '클래스가 성공적으로 삭제되었습니다.';
  }
}
