import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServer(): string {
    return 'API Running!';
  }
}
