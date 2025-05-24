import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserSignInParam } from './param.types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async signIn(param: UserSignInParam): Promise<void> {
    const { email, password } = param;
  }
}
