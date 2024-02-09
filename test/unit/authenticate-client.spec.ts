import { InMemoryClientRepository } from '../../src/modules/clients/repositories/in-memory/in-memory-client-repository';
import { AuthenticateClientUseCase } from '../../src/modules/clients/use-cases/authenticate-client/authenticate-client';
import { createPasswordWithHash } from '../../src/shared/utils/bcrypt';
import { AppException } from '@/errors/app.exception.ts';

let clientRepository: InMemoryClientRepository;
let sut: AuthenticateClientUseCase;

describe('Authenticate Client Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    sut = new AuthenticateClientUseCase(clientRepository);
  });

  it('should be able to authenticate client', async () => {
    await clientRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      address: 'John Doe City',
      password: await createPasswordWithHash('123456', 6),
    });

    const { token } = await sut.execute({
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(token).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await clientRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      address: 'John Doe City',
      password: await createPasswordWithHash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
