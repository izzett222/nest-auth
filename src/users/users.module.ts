import { Module } from '@nestjs/common';
import { UserService } from './users.services';

@Module({
  providers: [UserService],
})
export class UsersModule {}
