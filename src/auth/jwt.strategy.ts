import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'aaa',
    });
  }

  async validate(payload: { id: string; name: string }): Promise<User> {
    const { id, name } = payload;
    const user = await this.usersRepository.findOne({ id, name });

    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
