import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseCustomError extends HttpException {
  public readonly errorCode: string;
  public readonly timestamp: string;
  public readonly context?: any;

  constructor(message: string, status: HttpStatus, errorCode: string, context?: any) {
    super(
      {
        message,
        errorCode,
        statusCode: status,
        timestamp: new Date().toISOString(),
        context,
      },
      status
    );

    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
    this.context = context;
  }
}
