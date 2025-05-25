import { Controller, Post } from '@nestjs/common';
import { UserSignUpValidator } from './auth.validator';

@Controller('auth')
export class AuthController {
  @Post('/invite')
  public async invite(): Promise<string> {
    return 'invite';
  }

  @Post('/sign-up')
  public async signUp(validator: UserSignUpValidator): Promise<string> {
    return 'sign up';
  }

  @Post('/sign-in')
  public async signIn(): Promise<string> {
    return 'sign in';
  }
}
