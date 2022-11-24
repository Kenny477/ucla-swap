import { Contains, IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @Contains('ucla.edu')
  email: string;

  @IsString()
  password: string;
}
