import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  search(): string {
    return 'Hello World!';
  }
}
