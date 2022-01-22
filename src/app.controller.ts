import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthCookiesGuard } from 'guards/auth-cookies.guard';

import { AppService } from './app.service';

@UseGuards(AuthCookiesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(): string {
    return this.appService.search();
  }
}
