import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import { CreateClientValidator } from '../validators/create-client-validator';
import { AuthenticateClientValidator } from '../validators/authenticate-client-validator';
import { ClientIdValidator } from '../validators/client-id-validator';
import { AuthGuard } from '@/shared/auth/auth-jwt.guard';
import { CreateClientUseCase } from '../../use-cases/create-client/create-client';
import { AuthenticateClientUseCase } from '../../use-cases/authenticate-client/authenticate-client';
import { FindClientUseCase } from '../../use-cases/find-client/find-client';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfilePictureUseCase } from '../../use-cases/update-profile-picture/update-profile-picture';
import { Response } from 'express';
import { UpdateClientValidator } from '../validators/update-client-validator';
import { UpdateClientUseCase } from '../../use-cases/update-client/update-client';

@Controller('users')
@ApiTags('Users')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly authenticateClientUseCase: AuthenticateClientUseCase,
    private readonly findClientUseCase: FindClientUseCase,
    private readonly updateProfilePictureUseCase: UpdateProfilePictureUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
  ) {}
  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async createClient(
    @Body()
    { name, address, email, profile_picture, password }: CreateClientValidator,
  ): Promise<{ client: Client }> {
    const { client } = await this.createClientUseCase.execute({
      name,
      address,
      email,
      profile_picture,
      password,
    });

    return { client };
  }

  @Post('/session')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async authenticateClient(
    @Body() { email, password }: AuthenticateClientValidator,
  ): Promise<{ token: string }> {
    const { token } = await this.authenticateClientUseCase.execute({
      email,
      password,
    });

    return { token };
  }

  @Get('/:userId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  public async findById(
    @Param('userId') client_id: ClientIdValidator,
  ): Promise<{ client: Client }> {
    const client = await this.findClientUseCase.execute(client_id);

    return { ...client };
  }

  @Patch('/:userId/profile-picture')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseInterceptors(FileInterceptor('file'))
  public async updateProfilePicture(
    @Param('userId') client_id: ClientIdValidator,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ): Promise<Response> {
    await this.updateProfilePictureUseCase.execute(
      client_id,
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    return response.status(HttpStatus.OK).send();
  }

  @Patch('/:userId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  public async updateClient(
    @Param('userId') client_id: ClientIdValidator,
    @Body() data: UpdateClientValidator,
    @Res() response: Response,
  ): Promise<Response> {
    await this.updateClientUseCase.execute(client_id, data);

    return response.status(HttpStatus.OK).send();
  }
}
