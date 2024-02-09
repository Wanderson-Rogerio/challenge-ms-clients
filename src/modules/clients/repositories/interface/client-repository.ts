import { Client, Prisma } from '@prisma/client';

export interface IClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  findByClientId(client_id: string): Promise<Client>;
  updatePictureProfile(
    client_id: string,
    profile_picture: string,
  ): Promise<Client | null>;
  updateClient(
    client_id: string,
    data: Prisma.ClientUpdateInput,
  ): Promise<Client | null>;
}
