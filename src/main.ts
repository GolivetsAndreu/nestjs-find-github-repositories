import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AuthCookiesGuard } from 'guards/auth-cookies.guard';

import { AppModule } from './app.module';

async function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('search repositories API v1')
    .setVersion('1')
    .addCookieAuth('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthCookiesGuard());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: true,
    }),
  );

  initSwagger(app);

  await app.listen(3000);
}

bootstrap();
