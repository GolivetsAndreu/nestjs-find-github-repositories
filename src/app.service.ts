import { Injectable } from '@nestjs/common';
import { SearchDto } from 'dto/search.dto';

@Injectable()
export class AppService {
  search(data: SearchDto): string {
    
    return 'Hello World!';
  }
}
