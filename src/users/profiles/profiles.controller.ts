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
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProfileConnectionResponse } from './profiles.types';
import { ConnectionResponseDto, PartialProfileResponseDto } from './dto';

@ApiTags('Profiles')
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
  @ApiResponse({
    status: 200,
    description: '요청한 사용자의 프로필 목록 조회',
    type: [PartialProfileResponseDto],
  })
  public async getProfileList(@ReqUser() user: RequestUser) {
    return await this._profileService.getMyProfiles(user);
  }

  /**
   *
   * 모든 프로필 조회 (추후 검색 기능 추가)
   * 이 리스트에서 연결하고 싶은 프로필을 선택하여 연결할 수 있음
   */
  @Get('/list')
  @ApiResponse({
    status: 200,
    description: '모든 프로필 조회',
    type: [PartialProfileResponseDto],
  })
  public async getAllProfiles() {
    return await this._profileService.getAllProfiles();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: '내 프로필 조회',
    type: PartialProfileResponseDto,
  })
  @ApiBearerAuth()
  public async getProfile(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfile(user);
  }

  @Post()
  @ApiBody({ type: CreateProfileValidator })
  @ApiResponse({ status: 201, description: '프로필 생성' })
  public async createProfile(
    @ReqUser() user: RequestUser,
    @Body() param: CreateProfileValidator
  ): Promise<void> {
    await this._profileService.createProfile({ ...user, ...param });
  }

  @Post('/connection')
  @ApiBody({ type: CreateProfileConnectionValidator })
  @ApiResponse({ status: 201, description: '프로필 간 연결 생성' })
  @ApiBearerAuth()
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
  @ApiBody({ type: UpdateProfileConnectionValidator })
  @ApiResponse({
    status: 200,
    description: '프로필 연결 업데이트 (거부 또는 승인)',
  })
  @ApiParam({ name: 'connectionId', type: Number, description: '프로필 연결 ID' })
  @ApiBearerAuth()
  @Patch('/connection/:connectionId')
  public async updateProfileConnection(
    @ReqUser() user: RequestUser,
    @Param('connectionId', ParseIntPipe) connectionId: number,
    @Body() param: UpdateProfileConnectionValidator
  ) {
    await this._profileService.updateProfileConnection({ ...user, connectionId, ...param });
  }

  @ApiResponse({
    status: 200,
    description: '프로필 연결 리스트 조회',
    type: ConnectionResponseDto,
  })
  @ApiBearerAuth()
  @Get('/connections')
  public async getProfileConnections(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfileConnections(user);
  }
}
