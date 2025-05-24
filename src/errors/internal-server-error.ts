import { HttpStatus } from '@nestjs/common';
import { BaseCustomError } from './base-custom-error';

export class InternalServerError extends BaseCustomError {
  constructor(message: string = 'Internal Server Error', context?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', context);
  }
}
