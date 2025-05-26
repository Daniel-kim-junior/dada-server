import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { ProfilesService } from './profiles.service';
import { Symbols } from 'symbols';
import { CreateProfileValidator } from './profiles.validator';

@Controller('users/profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  public constructor(
    @Inject(Symbols.ProfilesService) private readonly _profileService: ProfilesService
  ) {}

  @Get('list')
  public async getProfileList(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfiles(user);
  }

  @Get()
  public async getProfile(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfile(user);
  }

  @Post()
  public async createProfile(
    @ReqUser() user: RequestUser,
    @Body() param: CreateProfileValidator
  ): Promise<void> {
    await this._profileService.createProfile({ ...user, ...param });
  }

  @Post('/connection')
  public async createProfileConnection(@ReqUser() user: RequestUser): Promise<string> {
    // 프로필 연결 요청 로직을 여기에 추가합니다.
    return '프로필 연결 요청이 성공적으로 전송되었습니다.';
  }

  @Get('/connections')
  public async getProfileConnections(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfileConnections(user);
  }
}
