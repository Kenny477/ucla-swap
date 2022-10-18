import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
