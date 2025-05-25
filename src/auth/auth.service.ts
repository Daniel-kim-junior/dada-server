import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserSignUpParam } from './param.types';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async signUp(param: UserSignUpParam): Promise<void> {
    const { email, password } = param;
  }
}
