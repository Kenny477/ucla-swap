import { Get, Controller, Req, UseGuards, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email } = req.user as any;
    const verified = await this.authService.isEmailVerified(email);
    // console.log(verified)
    if (verified) {
      const access_token = await this.authService.login(req.user);
      // console.log(access_token)
      res.send(access_token)
    }
    else {
      res.redirect('/email-not-verified');
    }
  }

  @Post('signup')
  async signup(@Req() req: Request) {
    const { email, password } = req.body;

    await this.authService.checkCredentials(email, password);

    const user = await this.authService.signup({ email, password });
    return user;
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
