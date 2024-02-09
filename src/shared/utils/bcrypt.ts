import { compare, hash } from 'bcryptjs';

export async function createPasswordWithHash(
  userPassword: string,
  salt: number,
) {
  return await hash(userPassword, salt);
}

export async function comparePasswordWithHash(
  userPassword: string,
  storedHash: string,
) {
  return await compare(userPassword, storedHash);
}
