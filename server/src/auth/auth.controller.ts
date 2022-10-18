import { Get, Controller, Req, UseGuards, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): object {
    return { message: 'Hello world!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    console.log(req)
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Req() req: Request) {
    console.log(req)
    const { username, password } = req.body;
    return this.authService.signup({ username, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
