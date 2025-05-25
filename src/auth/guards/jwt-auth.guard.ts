// auth/guards/jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any) {
    // 토큰이 없는 경우
    if (!user && !err) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: '로그인이 필요합니다.',
        error: 'Unauthorized',
        code: 'AUTH_TOKEN_REQUIRED',
      });
    }

    // 기타 에러
    if (err) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: '인증에 실패했습니다.',
        error: 'Authentication Failed',
        code: 'AUTH_FAILED',
      });
    }

    return user;
  }
}
