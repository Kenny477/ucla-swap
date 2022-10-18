import { Get, Controller, Req, UseGuards, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email } = req.user as any;
    const verified = await this.authService.isEmailVerified(email);
    if (verified) {
      return this.authService.login(req.user);
    }
    else {
      res.redirect('/email-not-verified');
    }
  }

  @Post('signup')
  async signup(@Req() req: Request) {
    const { email, password } = req.body;

    const user = await this.authService.signup({ email, password });
    return this.authService.signup({ email, password });
  }

  @Get('verify')
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    const { userId, token } = req.query;
    const verified = await this.authService.verifyEmail(
      userId as string,
      token as string,
    );
    if (verified) {
      res.redirect('/email-verified');
    } else {
      res.redirect('/email-not-verified');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
