import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { setupSwagger } from './docs/swagger';
import { AllExceptionsFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const APP_PORT = env.APP_PORT;
  const APP_MODE_API = env.APP_MODE_API;
  const APP_GLOBAL_PREFIX = env.APP_GLOBAL_PREFIX;
  const allowedSwaggerEnvironment = ['dev', 'local'];

  if (allowedSwaggerEnvironment.includes(APP_MODE_API)) setupSwagger(app);

  // Set global prefix
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  // Set global filters(ERRORS)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start server
  await app.listen(APP_PORT);
}
bootstrap();
