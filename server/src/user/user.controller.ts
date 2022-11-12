import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller({ path: 'user' })
export class UserController { 
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('profile/:id')
  getProfileById(@Req() req: Request, @Param('id') id: string) {
    return req.user;
  }
}