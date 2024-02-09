import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ZodError) {
      response.status(400).json({
        statusCode: 400,
        message: 'Validation error.',
        issues: exception.errors,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      const status = 500;
      const message = 'Internal server error';

      if (process.env.NODE_ENV !== 'production') {
        console.error(exception);
      }

      response.status(status).json({
        statusCode: status,
        message,
      });
    }
  }
}
