import { Contains, IsEmail, IsString, IsUUID, Matches } from 'class-validator';

export class LikeListingDto {
  @IsUUID()
  @IsString()
  listing: string;
}
