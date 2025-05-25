import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users/profiles')
export class ProfilesController {
  @Get()
  public async getProfiles(): Promise<string> {
    // 프로필 목록 조회 로직을 여기에 추가합니다. (페이지 네이션, 필터링 등)
    return '프로필 목록이 성공적으로 조회되었습니다.';
  }

  @Get(':id')
  public async getProfileById(): Promise<string> {
    // 프로필 ID로 조회하는 로직을 여기에 추가합니다.
    return '프로필이 성공적으로 조회되었습니다.';
  }

  @Post()
  public async createProfile(): Promise<string> {
    // 프로필 생성 로직을 여기에 추가합니다.
    return '프로필이 성공적으로 생성되었습니다.';
  }

  @Put(':id')
  public async updateProfile(): Promise<string> {
    // 프로필 업데이트 로직을 여기에 추가합니다.
    return '프로필이 성공적으로 업데이트되었습니다.';
  }

  @Post('/connection')
  public async createProfileConnection(): Promise<string> {
    // 프로필 연결 요청 로직을 여기에 추가합니다.
    return '프로필 연결 요청이 성공적으로 전송되었습니다.';
  }

  @Get('/connection/confirm')
  public async confirmProfileConnection(): Promise<string> {
    // 프로필 연결 확인 로직을 여기에 추가합니다.
    /**
     * response : {
     * connectedProfiles: [{
	      connectProfileId: string
	      role: '학부모' | '학생'
	      status: 'pending' | 'rejected' | 'completed'
      }]
    *}
     */
    return '프로필 연결이 성공적으로 확인되었습니다.';
  }
}
