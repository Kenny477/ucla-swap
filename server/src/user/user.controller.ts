import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
}
