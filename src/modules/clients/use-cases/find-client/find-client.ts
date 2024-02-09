import { IClientRepository } from '../../repositories/interface/client-repository';
import { Client } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { AppException } from '@/errors/app.exception.ts';
import { PROVIDER } from '@/shared/constants/providers.constants';

interface FindClientUseCaseRequest {
  client_id: string;
}

interface FindClientUseCaseResponse {
  client: Client;
}

@Injectable()
class FindClientUseCase {
  constructor(
    @Inject(PROVIDER.PrismaClientRepository)
    private clientRepository: IClientRepository,
  ) {}

  async execute(
    client_id: FindClientUseCaseRequest,
  ): Promise<FindClientUseCaseResponse> {
    const client = await this.clientRepository.findByClientId(
      String(client_id),
    );

    if (!client) {
      throw AppException.notFound('Client not found');
    }

    return { client: { ...client, password: undefined } };
  }
}

export { FindClientUseCase };
