import { AppException } from '../../src/errors/app.exception.ts';
import { InMemoryClientRepository } from '../../src/modules/clients/repositories/in-memory/in-memory-client-repository';
import { CreateClientUseCase } from '../../src/modules/clients/use-cases/create-client/create-client';
import { comparePasswordWithHash } from '../../src/shared/utils/bcrypt';

let clientRepository: InMemoryClientRepository;
let sut: CreateClientUseCase;

describe('Create Client Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    sut = new CreateClientUseCase(clientRepository);
  });

  it('should be able to create client', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      address: 'John Doe City',
      password: '123456789',
    });

    expect(client.id).toEqual(expect.any(String));
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@teste.com';

    await sut.execute({
      email,
      name: 'John Doe',
      address: 'John Doe City',
      password: '123456789',
    });

    await expect(() =>
      sut.execute({
        email,
        name: 'John Doe',
        address: 'John Doe City',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should hash client password upon registration', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      address: 'John Doe City',
      password: '123456789',
    });

    const isPasswordCorrectlyHashed = await comparePasswordWithHash(
      '123456789',
      client.password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
