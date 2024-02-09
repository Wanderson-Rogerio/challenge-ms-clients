import { IClientRepository } from '../../repositories/interface/client-repository';
import { Client, Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '@/shared/constants/providers.constants';

interface UpdateClientUseCaseRequest {
  client_id: string;
}

interface UpdateClientUseCaseResponse {
  client: Client;
}

@Injectable()
class UpdateClientUseCase {
  constructor(
    @Inject(PROVIDER.PrismaClientRepository)
    private clientRepository: IClientRepository,
  ) {}

  async execute(
    client_id: UpdateClientUseCaseRequest,
    data: Prisma.ClientUpdateInput,
  ): Promise<UpdateClientUseCaseResponse> {
    const client = await this.clientRepository.updateClient(
      String(client_id),
      data,
    );

    return { client };
  }
}

export { UpdateClientUseCase };
