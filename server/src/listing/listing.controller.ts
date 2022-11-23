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

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likeListing(@Req() req: Request, @Param('id') listingId: string) {
    const user = req.user as { userId: string };
    return this.listingService.likeListing(user.userId, listingId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/like')
  async getLiked(@Req() req: Request, @Param('id') listingId: string) {
    const user = req.user as { userId: string };
    return this.listingService.getLiked(user.userId, listingId);
  }
}
