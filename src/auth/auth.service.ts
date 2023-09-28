import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.services';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(username: string, password: string) {
    const newUser = this.userService.createUser(username, password);
    return newUser;
  }

  signIn(username: string, password: string) {
    const user = this.userService.getUser(username);
    if (!user) throw new UnauthorizedException('Wrong username or password');
    if (user.password !== password)
      throw new UnauthorizedException('Wrong username or password');
    return user;
  }
}
