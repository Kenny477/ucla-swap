import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Listing } from './listing.entity';
import { ListingService } from './listing.service';
import { Request } from 'express';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}
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

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createForUser(@Req() req: Request, @Body() listing: DeepPartial<Listing>) {
    if (listing.title.length < 4) {
      throw new HttpException(
        'Title must be at least 4 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (listing.description.length < 10) {
      throw new HttpException(
        'Description must be at least 10 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id } = req.user as any;
    return this.listingService.createForUser(id, listing);
  }
}
