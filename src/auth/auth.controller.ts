import { Controller, Post } from '@nestjs/common';
import { UserSignInValidator } from './auth.validator';

@Controller('auth')
export class AuthController {
  @Post('/sign-in')
  public async signIn(validator: UserSignInValidator): Promise<string> {
    return 'sign in';
  }
}
