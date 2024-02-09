import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_MODE_API: z.enum(['dev', 'test', 'production']).default('dev'),
  APP_PORT: z.coerce.number().default(3000),
  APP_GLOBAL_PREFIX: z.string().default('/api'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string().default('JWT_SECRET'),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_REGION: z.string(),
  AWS_S3_ACCESS_KEY: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error(`Invalid environment variables ${_env.error.format()}`);
}

export const env = _env.data;
