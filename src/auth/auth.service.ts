import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    const newUser = this.userService.createUser(username, password);
    const token = await this.jwtService.signAsync({
      username: newUser.username,
    });
    return { ...newUser, token };
  }

  async signIn(username: string, password: string) {
    const user = this.userService.getUser(username);
    if (!user) throw new UnauthorizedException('Wrong username or password');
    if (user.password !== password)
      throw new UnauthorizedException('Wrong username or password');
    const token = await this.jwtService.signAsync({ username: user.username });
    return { ...user, token };
  }
}
