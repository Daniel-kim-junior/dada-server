import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignInValidator, UserSignUpValidator } from './auth.validator';
import { AuthService } from './auth.service';
import { Symbols } from 'symbols';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(Symbols.AuthService) private readonly _authService: AuthService) {}

  @Post('/invite')
  public async invite(): Promise<string> {
    return 'invite';
  }

  @Post('/sign-up')
  public async signUp(validator: UserSignUpValidator): Promise<string> {
    return 'sign up';
  }

  @Post('/sign-in')
  public async signIn(@Body() param: UserSignInValidator): Promise<string> {
    return await this._authService.signIn(param);
  }
}
