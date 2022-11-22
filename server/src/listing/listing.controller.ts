import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';


@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) { }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.listingService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.listingService.findById(id);
  }

  @Get(':id/image/:imageId')
  @UseGuards(JwtAuthGuard)
  async findListingImage(@Param('id') id: string, @Param('imageId') imageId: string, @Res() res: Response) {
    const filename = await this.listingService.findListingImage(id, imageId);
    const path = join(process.cwd(), 'storage', filename);
    const stream = createReadStream(path);
    stream.pipe(res);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createForUser(@Req() req: Request, @Body() listing: CreateListingDto) {
    const { id } = req.user as any;
    return this.listingService.createForUser(id, listing);
  }
}
