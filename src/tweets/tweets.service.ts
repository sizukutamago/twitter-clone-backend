import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
  ) {}

  async getTweets(): Promise<Tweet[]> {
    return await this.tweetsRepository.find({
      relations: ['user'],
      order: { create_at: 'DESC' },
    });
  }

  async create(createTweetDto: CreateTweetDto, user: User): Promise<Tweet> {
    const tweet = {
      content: createTweetDto.content,
      user,
    };
    return await this.tweetsRepository.save(tweet);
  }
}
