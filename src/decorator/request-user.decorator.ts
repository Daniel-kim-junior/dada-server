import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/auth/types';

export const ReqUser = createParamDecorator(
  (data: keyof RequestUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
