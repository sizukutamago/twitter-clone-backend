import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { name, password } = userDto;

    const user = await this.usersRepository.findOne({ name });
    let payload = {};

    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('invalid name or password');
      }
      payload = { id: user.id, name: user.name };
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await this.usersRepository.save({
        name,
        password: hashPassword,
      });

      payload = { id: newUser.id, name: newUser.name };
    }

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { accessToken };
  }
}
