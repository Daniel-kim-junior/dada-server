import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { ProfilesService } from './profiles.service';
import { Symbols } from 'symbols';
import {
  CreateProfileConnectionValidator,
  CreateProfileValidator,
  UpdateProfileConnectionValidator,
} from './profiles.validator';

@Controller('users/profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  public constructor(
    @Inject(Symbols.ProfilesService) private readonly _profileService: ProfilesService
  ) {}

  /**
   * 요청한 사용자의 프로필 목록 조회
   */
  @Get('/my/list')
  public async getProfileList(@ReqUser() user: RequestUser) {
    return await this._profileService.getMyProfiles(user);
  }

  /**
   *
   * 모든 프로필 조회 (추후 검색 기능 추가)
   * 이 리스트에서 연결하고 싶은 프로필을 선택하여 연결할 수 있음
   */
  @Get('/list')
  public async getAllProfiles() {
    return await this._profileService.getAllProfiles();
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
  public async createProfileConnection(
    @ReqUser() user: RequestUser,
    @Body() param: CreateProfileConnectionValidator
  ) {
    await this._profileService.createProfileConnection({ ...user, ...param });
  }

  /**
   *
   * @param user가 거부하거나 승인할 수 있음
   * @param param
   */
  @Patch('/connection/:connectionId')
  public async updateProfileConnection(
    @ReqUser() user: RequestUser,
    @Param('connectionId', ParseIntPipe) connectionId: number,
    @Body() param: UpdateProfileConnectionValidator
  ) {
    await this._profileService.updateProfileConnection({ ...user, connectionId, ...param });
  }

  @Get('/connections')
  public async getProfileConnections(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfileConnections(user);
  }
}
