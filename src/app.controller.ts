import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('healthcheck')
@ApiTags('Health Check')
export class AppController {
  @Get()
  public async _healthcheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Server is running!');
  }
}
