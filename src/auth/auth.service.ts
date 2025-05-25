import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from './auth.repository';
import { JwtPayload, SignInResponse, UserSignInParam, UserSignUpParam } from './types';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';
import * as bcrypt from 'bcrypt';
import { BASIC_PERMISSIONS } from './constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(
    @Inject(JwtService) private readonly _jwtService: JwtService,
    @Inject(Symbols.UsersService) private readonly _userService: UsersService,
    @Inject(Symbols.AuthRepository) private readonly _authRepo: IAuthRepository
  ) {}

  public async signIn(param: UserSignInParam): Promise<SignInResponse> {
    const { identifier, password, authType } = param;
    // 사용자 인증 로직을 여기에 추가합니다.

    // 예: 사용자 정보 조회, 비밀번호 확인 등
    const user = await this._authRepo.getAuthByIdentifierAndType(identifier, authType);

    if (isNullish(user)) {
      throw new UnAuthorizedError('잘못된 identifier입니다');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnAuthorizedError('잘못된 비밀번호입니다');
    }
    this._userService;
    // JWT 토큰 생성
    const payload: JwtPayload = {
      sub: user.userId,
      permissions: BASIC_PERMISSIONS,
    };

    return {
      accessToken: this._jwtService.sign(payload),
    };
  }

  public async signUp(param: UserSignUpParam): Promise<void> {
    const { email, password } = param;
  }
}
