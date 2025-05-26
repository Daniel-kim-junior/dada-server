import { Body, Controller, Get, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { ProfilesService } from './profiles.service';
import { Symbols } from 'symbols';
import { CreateProfileConnectionValidator, CreateProfileValidator } from './profiles.validator';

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
    @Body() param: CreateProfileConnectionValidator
  ) {
    // await this._profileService.updateProfileConnection({ ...user, ...param });
  }

  @Get('/connections')
  public async getProfileConnections(@ReqUser() user: RequestUser) {
    return await this._profileService.getProfileConnections(user);
  }
}
