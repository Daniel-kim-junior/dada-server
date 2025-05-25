import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
    @Inject(Symbols.ProfilesService) private readonly _profieService: ProfilesService
  ) {}

  @Get('list')
  public async getProfileList(@ReqUser() user: RequestUser) {
    return await this._profieService.getProfiles(user);
  }

  @Get()
  public async getProfile(@ReqUser() user: RequestUser) {
    return await this._profieService.getProfile(user);
  }

  @Post()
  public async createProfile(
    @ReqUser() user: RequestUser,
    @Body() param: CreateProfileValidator
  ): Promise<void> {
    await this._profieService.createProfile({ ...user, ...param });
  }

  @Put(':id')
  public async updateProfile(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 프로필 업데이트 로직을 여기에 추가합니다.
    return '프로필이 성공적으로 업데이트되었습니다.';
  }

  @Post('/connection')
  public async createProfileConnection(@ReqUser() user: RequestUser): Promise<string> {
    // 프로필 연결 요청 로직을 여기에 추가합니다.
    return '프로필 연결 요청이 성공적으로 전송되었습니다.';
  }

  @Get('/connection/confirm')
  public async confirmProfileConnection(@ReqUser() user: RequestUser): Promise<string> {
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
