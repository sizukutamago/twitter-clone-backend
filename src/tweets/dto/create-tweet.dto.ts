import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @MinLength(1)
  @MaxLength(144)
  content: string;
}
