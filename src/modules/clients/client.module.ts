import { Module } from '@nestjs/common';
import { ClientController } from './infra/controllers/client.controller';
import { CreateClientUseCase } from './use-cases/create-client/create-client';
import { AuthenticateClientUseCase } from './use-cases/authenticate-client/authenticate-client';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaClientRepository } from './repositories/prisma/prisma-client-repository';
import { FindClientUseCase } from './use-cases/find-client/find-client';
import { PROVIDER } from '@/shared/constants/providers.constants';
import { UpdateProfilePictureUseCase } from './use-cases/update-profile-picture/update-profile-picture';
import { FileUploadService } from '@/shared/upload/s3-upload.service';
import { UpdateClientUseCase } from './use-cases/update-client/update-client';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController],
  providers: [
    CreateClientUseCase,
    AuthenticateClientUseCase,
    FindClientUseCase,
    UpdateProfilePictureUseCase,
    UpdateClientUseCase,
    {
      provide: PROVIDER.PrismaClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: PROVIDER.FileUploadService,
      useClass: FileUploadService,
    },
  ],
  exports: [PrismaModule],
})
export class ClientModule {}
