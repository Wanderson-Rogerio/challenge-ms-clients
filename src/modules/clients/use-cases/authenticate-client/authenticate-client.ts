import { IClientRepository } from '../../repositories/interface/client-repository';
import { comparePasswordWithHash } from '@/shared/utils/bcrypt';
import { SignPayloadJWTInterface, signJWT } from '@/shared/auth/sign-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AppException } from '@/errors/app.exception.ts';
import { PROVIDER } from '@/shared/constants/providers.constants';

interface AuthenticateClientUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateClientUseCaseResponse {
  token: string;
}

@Injectable()
export class AuthenticateClientUseCase {
  constructor(
    @Inject(PROVIDER.PrismaClientRepository)
    private clientRepository: IClientRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) {
      throw AppException.unauthorized('Invalid credentials');
    }

    const doesPasswordMatches = await comparePasswordWithHash(
      password,
      client.password,
    );

    if (!doesPasswordMatches) {
      throw AppException.unauthorized('Invalid credentials');
    }

    const payload: SignPayloadJWTInterface = { sub: client.id };

    const { token } = await signJWT(payload);

    return { token };
  }
}
