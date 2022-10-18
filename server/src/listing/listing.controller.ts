import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  findById(id: string) {
    return this.listingService.findById(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createForUser(@Req() req: Request, @Body() listing: DeepPartial<Listing>) {
    const { id } = req.user as any;
    console.log(req.user)
    return this.listingService.createForUser(id, listing);
  }
}
