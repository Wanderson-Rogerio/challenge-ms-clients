import { env } from '@/env';
import { JwtService } from '@nestjs/jwt';

export interface SignPayloadJWTInterface {
  [key: string]: string;
}

async function signJWT(
  payload: SignPayloadJWTInterface,
  secret?: string,
): Promise<{ token: string }> {
  const jwtService = new JwtService();

  const token = await jwtService.signAsync(payload, {
    secret: secret ? secret : env.JWT_SECRET,
  });

  return { token };
}

export { signJWT };
