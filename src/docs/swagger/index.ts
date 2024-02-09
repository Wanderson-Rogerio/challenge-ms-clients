import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'src/env';

export const setupSwagger = (application: INestApplication) => {
  const { APP_PORT, APP_GLOBAL_PREFIX } = env;

  const documentConfig = new DocumentBuilder()
    .setTitle('MS Clients API')
    .setDescription('The Clients Documentation')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${APP_PORT}${APP_GLOBAL_PREFIX}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(application, documentConfig);

  SwaggerModule.setup(`${APP_GLOBAL_PREFIX}/docs`, application, document);
};
