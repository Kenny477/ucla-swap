import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('UCLA Swap Backend')
      .setDescription('The backend API for the UCLA Swap application')
      .setVersion('1.0')
      .addTag('')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document);
  }

  await app.listen(4000);
}
bootstrap();
