import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'dto/search.dto';
import { AuthCookiesGuard } from 'guards/auth-cookies.guard';

import { AppService } from './app.service';

@ApiTags('Search')
@ApiCookieAuth()
@UseGuards(AuthCookiesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(@Query() query: SearchDto): string {
    return this.appService.search(query);
  }
}
