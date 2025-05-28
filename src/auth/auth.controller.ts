import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UserProfileSelectValidator, UserSignInValidator } from './auth.validator';
import { AuthService } from './auth.service';
import { Symbols } from 'symbols';
import { RequestUser } from './auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto, UserProfileSelectResponse } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(@Inject(Symbols.AuthService) private readonly _authService: AuthService) {}

  @ApiBody({
    type: UserSignInValidator,
    description: '사용자 로그인',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 로그인을 완료합니다.',
    type: SignInResponseDto,
  })
  @Post('/sign-in')
  public async signIn(@Body() param: UserSignInValidator): Promise<SignInResponseDto> {
    const res = await this._authService.signIn(param);
    return res;
  }

  @ApiBody({
    type: UserProfileSelectValidator,
    description: '사용자 프로필 선택',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 프로필을 선택합니다.',
    type: UserProfileSelectResponse,
  })
  @ApiBearerAuth()
  @Post('/select-profile')
  @UseGuards(JwtAuthGuard)
  public async selectProfile(
    @ReqUser() user: RequestUser,
    @Body() param: UserProfileSelectValidator
  ): Promise<UserProfileSelectResponse> {
    const res = await this._authService.selectProfile({
      profileId: param.profileId,
      userId: user.userId,
      permissions: user.permissions,
    });
    return res;
  }
}
