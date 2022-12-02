import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateListingDto {
  @IsString({ message: 'Title must be a string' })
  @Length(4, 255, {
    message: 'Title must be between 4 and 255 characters long',
  })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(10, {
    message: 'Description must be at least 10 characters long',
  })
  description: string;

  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  price: number;

  @IsString(
    { message: 'Category must be a string' },
  )
  category: string;

  @IsNumber(
    {},
    {
      message: 'Condition must be a number',
    }
  )
  @Min(0)
  @Max(5)
  condition: number;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
