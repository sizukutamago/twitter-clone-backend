import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CredentionsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
