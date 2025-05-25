import { HttpStatus } from '@nestjs/common';
import { BaseCustomError } from './base-custom-error';

export class InternalServerError extends BaseCustomError {
  constructor(message: string = 'Internal Server Error', context?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', context);
  }
}

export class UnAuthorizedError extends BaseCustomError {
  constructor(message: string = 'Unauthorized Access', context?: any) {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', context);
  }
}

export class NotFoundError extends BaseCustomError {
  constructor(message: string = 'Resource Not Found', context?: any) {
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND', context);
  }
}
