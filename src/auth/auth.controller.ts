import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from './dtos/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'hello world';
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() user: CreateUser) {
    const newUser = this.authService.signUp(user.username, user.password);
    return {
      message: 'user created successfully',
      user: {
        username: newUser.username,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() signInDto: Record<string, any>) {
    const user = this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return {
      message: 'User logged in successfully',
      user: {
        username: user.username,
      },
    };
  }
}
