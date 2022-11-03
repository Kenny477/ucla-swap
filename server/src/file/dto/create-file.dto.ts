import { IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  filename: string;
  
  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;
}
