import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from './dtos/createUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return 'hello world';
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() user: CreateUser) {
    const newUser = await this.authService.signUp(user.username, user.password);
    return {
      message: 'user created successfully',
      user: {
        username: newUser.username,
        token: newUser.token,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDto: Record<string, any>) {
    const user = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return {
      message: 'User logged in successfully',
      user: {
        username: user.username,
        token: user.token,
      },
    };
  }
}
