import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateListingDto {
  @IsString()
  title: string;
  
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
  
}
