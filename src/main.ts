import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { AuthCookiesGuard } from 'guards/auth-cookies.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthCookiesGuard());
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
