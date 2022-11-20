import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LikeListingDto } from './dto/like-listing.dto';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user;
  // }
  // @Get('profile/:id')
  // getProfileById(@Req() req: Request, @Param('id') id: string) {
  //   return req.user;
  // }

  @UseGuards(JwtAuthGuard)
  @Post('like-listing')
  async likeListing(@Req() req: Request, @Body() body: LikeListingDto) {
    const user = req.user;
    // @ts-ignore
    const userInstance = await this.userService.findById(user.id);
    if (userInstance) {
      return this.userService.likeListing(userInstance, body.listing);
    }
  }
}
