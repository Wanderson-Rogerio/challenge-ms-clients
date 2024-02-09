import { randomUUID } from 'crypto';
import { IClientRepository } from '../interface/client-repository';
import { Client, Prisma } from '@prisma/client';

class InMemoryClientRepository implements IClientRepository {
  public items: Client[] = [];

  async create(data: Prisma.ClientCreateInput) {
    const client = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      email: data.email,
      profile_picture: data.profile_picture,
      password: data.password,
      updated_at: new Date(),
      created_at: new Date(),
    };

    this.items.push(client);

    return client;
  }

  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      return null;
    }

    return client;
  }

  async findByClientId(id: string) {
    const client = this.items.find((item) => item.id === id);

    if (!client) {
      return null;
    }

    return client;
  }

  async updatePictureProfile(client_id: string, profile_picture: string) {
    throw new Error(profile_picture);

    return null;
  }

  async updateClient(client_id: string, data: Prisma.ClientUpdateInput) {
    console.log(client_id, data);
    return null;
  }
}

export { InMemoryClientRepository };
