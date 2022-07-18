import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetsRepository.save(createTweetDto);
  }
}
