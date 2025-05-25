import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from './auth.repository';
import { JwtPayload, SignInResponse, UserProfileSelectParam, UserSignInParam } from './auth.types';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from 'src/users/profiles/profiles.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(
    @Inject(JwtService) private readonly _jwtService: JwtService,
    @Inject(Symbols.ProfilesService) private readonly _profilesService: ProfilesService,
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

    // JWT 토큰 생성
    const payload: JwtPayload = {
      sub: user.userId,
      permissions: [],
    };

    return {
      accessToken: this._jwtService.sign(payload),
    };
  }

  public async selectProfile(param: UserProfileSelectParam): Promise<SignInResponse> {
    const { userId, profileId } = param;

    /**
     * 프로필을 profileId로 조회합니다
     */
    const profile = await this._profilesService.getProfileById(profileId);
    if (isNullish(profile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다');
    }

    // JWT 토큰 생성
    const payload: JwtPayload = {
      sub: userId,
      permissions: [profile.role],
      profileId,
    };

    return {
      accessToken: this._jwtService.sign(payload),
    };
  }
}
