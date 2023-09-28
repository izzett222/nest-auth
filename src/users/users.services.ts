import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [{ username: 'izzeddin', password: '12345' }];

  createUser(username: string, password: string) {
    const user = this.users.find((el) => el.username === username);
    if (user) {
      throw new UnauthorizedException();
    }
    const newUser = { username, password };
    this.users.push(newUser);
    return newUser;
  }

  getUser(username: string) {
    return this.users.find((el) => el.username === username);
  }
}
