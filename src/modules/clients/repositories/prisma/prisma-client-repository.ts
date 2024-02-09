import { PrismaService } from '@/prisma/prisma.service';
import { IClientRepository } from '../interface/client-repository';
import { Client, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaClientRepository implements IClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await this.prisma.client.create({ data });

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { email },
    });

    return client;
  }

  async updatePictureProfile(
    client_id: string,
    profile_picture: string,
  ): Promise<Client | null> {
    const picture = await this.prisma.client.update({
      where: {
        id: client_id,
      },
      data: {
        profile_picture,
      },
    });

    return picture;
  }

  async findByClientId(id: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id },
    });

    return client;
  }

  async updateClient(
    client_id: string,
    data: Prisma.ClientUpdateInput,
  ): Promise<Client | null> {
    const picture = this.prisma.client.update({
      where: {
        id: client_id,
      },
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
      },
    });

    return picture;
  }
}

export { PrismaClientRepository };
