import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('tweets')
@UseInterceptors(ClassSerializerInterceptor)
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  async getTweets(): Promise<Tweet[]> {
    return await this.tweetsService.getTweets();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @GetUser() user: User,
  ): Promise<Tweet> {
    console.log(user, createTweetDto);
    return await this.tweetsService.create(createTweetDto, user);
  }
}
