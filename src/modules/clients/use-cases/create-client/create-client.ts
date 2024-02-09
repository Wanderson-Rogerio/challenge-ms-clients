import { createPasswordWithHash } from '@/shared/utils/bcrypt';
import { IClientRepository } from '../../repositories/interface/client-repository';
import { AppException } from '../../../../errors/app.exception.ts';
import { Client } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '@/shared/constants/providers.constants';

interface CreateClientUseCaseRequest {
  name: string;
  address: string;
  email: string;
  profile_picture?: string;
  password: string;
}

interface CreateClientUseCaseResponse {
  client: Client;
}

@Injectable()
class CreateClientUseCase {
  constructor(
    @Inject(PROVIDER.PrismaClientRepository)
    private clientRepository: IClientRepository,
  ) {}

  async execute({
    name,
    address,
    email,
    profile_picture,
    password,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const clientWithSameEmail = await this.clientRepository.findByEmail(email);

    if (clientWithSameEmail) {
      throw AppException.conflict('Client already exists');
    }

    const password_hash = await createPasswordWithHash(password, 6);

    const client = await this.clientRepository.create({
      name,
      address,
      email,
      profile_picture,
      password: password_hash,
    });

    return { client };
  }
}

export { CreateClientUseCase };
