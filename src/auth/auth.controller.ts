import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UserProfileSelectValidator, UserSignInValidator } from './auth.validator';
import { AuthService } from './auth.service';
import { Symbols } from 'symbols';
import { RequestUser, SignInResponse } from './auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(Symbols.AuthService) private readonly _authService: AuthService) {}

  @Post('/sign-in')
  public async signIn(@Body() param: UserSignInValidator): Promise<SignInResponse> {
    const res = await this._authService.signIn(param);
    return res;
  }

  @Post('/select-profile')
  @UseGuards(JwtAuthGuard)
  public async selectProfile(
    @ReqUser() user: RequestUser,
    @Body() param: UserProfileSelectValidator
  ): Promise<SignInResponse> {
    const res = await this._authService.selectProfile({
      profileId: param.profileId,
      userId: user.userId,
      permissions: user.permissions,
    });
    return res;
  }
}
