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

  async createUser(user: CreateUserDto): Promise<User> {
    const { name, password } = user;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({ name, password: hashPassword });
  }

  async signIn(credentialDto: CreateUserDto) {
    const { name, password } = credentialDto;
    const user = await this.usersRepository.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, name: user.name };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('invalid name or password');
  }
}
