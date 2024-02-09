import { FileUploadService } from '@/shared/upload/s3-upload.service';
import { IClientRepository } from '../../repositories/interface/client-repository';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '@/shared/constants/providers.constants';
import { AppException } from '@/errors/app.exception.ts';
import { Client } from '@prisma/client';

interface UpdateProfilePictureUseCaseRequest {
  client_id: string;
}

@Injectable()
class UpdateProfilePictureUseCase {
  constructor(
    @Inject(PROVIDER.PrismaClientRepository)
    private clientRepository: IClientRepository,

    @Inject(PROVIDER.FileUploadService)
    private fileUploadService: FileUploadService,
  ) {}

  async execute(
    client_id: UpdateProfilePictureUseCaseRequest,
    buffer: Buffer,
    name: string,
    mimetype: string,
  ): Promise<{ client: Client }> {
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(mimetype)) {
      throw AppException.badRequest('Unsupported file type.');
    }

    const { Location: location } = await this.fileUploadService.uploadFile(
      buffer,
      name,
      mimetype,
    );

    const client = await this.clientRepository.updatePictureProfile(
      String(client_id),
      location,
    );

    return { client };
  }
}

export { UpdateProfilePictureUseCase };
