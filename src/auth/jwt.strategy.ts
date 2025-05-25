import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // payload에는 JWT에서 추출한 사용자 정보가 포함됩니다.
    // 필요한 경우 추가적인 검증 로직을 여기에 작성할 수 있습니다.
    return { userId: payload.sub, permissions: payload.permissions };
  }
}
