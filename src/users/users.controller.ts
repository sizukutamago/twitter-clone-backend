import { Controller, Get } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('create')
  create(): string {
    const user = new User();
    user.name = 'test';
    this.usersService.save(user);

    return user.name;
  }
}
