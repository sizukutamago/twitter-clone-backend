import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetsService.create(createTweetDto);
  }
}
