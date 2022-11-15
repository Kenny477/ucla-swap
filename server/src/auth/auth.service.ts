import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { createHash } from 'crypto';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkCredentials(email: string, password: string) {
    // Email checks
    const match = email.match(
      /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
    );
    if (!match) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    const validDomains = ['ucla.edu', 'g.ucla.edu'];
    if (!validDomains.includes(match[1])) {
      throw new HttpException('Must be a UCLA email', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findByEmail(email);
    if (!!user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    // Password checks
    if (password.length < 8) {
      throw new HttpException(
        'Password must be at least 8 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => char === char.toUpperCase())) {
      throw new HttpException(
        'Password must contain at least one uppercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => char === char.toLowerCase())) {
      throw new HttpException(
        'Password must contain at least one lowercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => !isNaN(parseInt(char)))) {
      throw new HttpException(
        'Password must contain at least one number',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signup(user: any) {
    const { email, password } = user;
    const hashedPassword = await hash(password, await genSalt());

    const savedUser = await this.userService.create({
      email: email,
      password: hashedPassword,
    });

    const verificationToken = await this.createVerificationToken(savedUser.id);
    const verificationLink = `http://${process.env.APP_HOST}/api/auth/verify?userId=${savedUser.id}&token=${verificationToken}`;
    this.mailService.sendVerificationMail(savedUser.email, verificationLink);
  }

  async isEmailVerified(email: string): Promise<boolean> {
    const res = await this.userService.findByEmail(email);
    return res.emailVerified;
  }

  async verifyEmail(userId: string, token: string) {
    const res = await this.userService.updateVerificationToken(userId, token);
    return res;
  }

  async createVerificationToken(userId: string): Promise<string> {
    const verificationTokenHash = createHash('sha256')
      .update(userId + Date.now().toString())
      .digest('hex');
    return this.userService
      .addVerificationToken(userId, {
        verificationToken: verificationTokenHash,
        verificationTokenExpires: new Date(Date.now() + 600000),
      })
      .then(() => verificationTokenHash);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
    }
    const resetToken = createHash('sha256')
      .update(user.id + user.password + Date.now().toString())
      .digest('hex');
    const resetTokenExpires = new Date(Date.now() + 600000);
    this.userService.addResetToken(user.id, {
      resetToken: resetToken,
      resetTokenExpires: resetTokenExpires,
    });
    const resetLink = `http://${process.env.APP_HOST}/reset-password?token=${resetToken}`;
    this.mailService.sendPasswordResetMail(user.email, resetLink);
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userService.findByResetToken(token);
    if (!user) {
      throw new HttpException('Invalid reset token', HttpStatus.BAD_REQUEST);
    }
    if (user.resetTokenExpires < new Date()) {
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    }
    // Password checks
    if (password.length < 8) {
      throw new HttpException(
        'Password must be at least 8 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => char === char.toUpperCase())) {
      throw new HttpException(
        'Password must contain at least one uppercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => char === char.toLowerCase())) {
      throw new HttpException(
        'Password must contain at least one lowercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![...password].some((char) => !isNaN(parseInt(char)))) {
      throw new HttpException(
        'Password must contain at least one number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(password, await genSalt());
    this.userService.updatePassword(user.id, hashedPassword);
  }
}
