import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListingService } from './listing.service';
import { Request } from 'express';
import { CreateListingDto } from './dto/create-listing.dto';

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
  createForUser(@Req() req: Request, @Body() listing: CreateListingDto) {
    const { id } = req.user as any;
    return this.listingService.createForUser(id, listing);
  }
}
