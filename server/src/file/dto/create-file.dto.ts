import { IsNumber, IsString } from 'class-validator';
import { CreateListingDto } from 'src/listing/dto/create-listing.dto';

export class CreateFileDto {
  @IsString()
  filename: string;
  
  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  listing: { id: string };
}
