import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignInValidator, UserSignUpValidator } from './auth.validator';
import { AuthService } from './auth.service';
import { Symbols } from 'symbols';
import { SignInResponse } from './types';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(Symbols.AuthService) private readonly _authService: AuthService) {}

  @Post('/sign-in')
  public async signIn(@Body() param: UserSignInValidator): Promise<SignInResponse> {
    const res = await this._authService.signIn(param);
    return res;
  }
}
