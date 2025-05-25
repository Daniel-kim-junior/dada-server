import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public async getUsers(): Promise<string> {
    // 사용자 목록 조회 로직을 여기에 추가합니다. (페이지 네이션, 필터링 등)
    return '사용자 목록이 성공적으로 조회되었습니다.';
  }
  @Get(':id')
  public async getUserById(): Promise<string> {
    // 사용자 ID로 조회하는 로직을 여기에 추가합니다.
    return '사용자가 성공적으로 조회되었습니다.';
  }
}
