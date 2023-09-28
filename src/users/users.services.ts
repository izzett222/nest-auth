import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [{ username: 'izzeddin', password: '12345' }];
}
