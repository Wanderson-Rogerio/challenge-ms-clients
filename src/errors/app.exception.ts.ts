import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';

export class AppException extends Error {
  constructor(
    message: string,
    public readonly status: HttpStatus,
  ) {
    super(message);
  }

  static badRequest(message: string): BadRequestException {
    return new BadRequestException(message);
  }

  static notFound(message: string): NotFoundException {
    return new NotFoundException(message);
  }

  static unauthorized(message: string): UnauthorizedException {
    return new UnauthorizedException(message);
  }

  static forbidden(message: string): ForbiddenException {
    return new ForbiddenException(message);
  }

  static internalServerError(message: string): InternalServerErrorException {
    return new InternalServerErrorException(message);
  }

  static conflict(message: string): ConflictException {
    return new ConflictException(message);
  }

  static unprocessableEntity(message: string): UnprocessableEntityException {
    return new UnprocessableEntityException(message);
  }
}
