import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfileById(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { userId: string };
    return this.userService.getProfile(id, user.userId === id);
  }
}
