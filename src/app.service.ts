import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';

import { SearchDto } from 'dto/search.dto';
import Cache from 'decorators/cache.decorator';
import { REPOSITORIES_CACHE_TTL, GITHUB_API_URL } from './constants';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  @Cache(REPOSITORIES_CACHE_TTL)
  async search({ q, page, limit }: SearchDto): Promise<Observable<any>> {
    let url = `${GITHUB_API_URL}/search/repositories?`;
    const queryParams = {
      q: `${q}+in:name`,
      page,
      per_page: limit,
      sort: 'stars',
      order: 'desc',
    };

    Object.keys(queryParams).forEach((key: string) => {
      url += `${key}=${queryParams[key]}&`;
    });

    const result = await lastValueFrom(this.httpService.get(url.slice(0, -1)));

    return result.data;
  }
}
