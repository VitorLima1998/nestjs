import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Swagger Documentation - Shop NestJS')
    .setDescription(
      'A robust and scalable API for accessing information and interacting with platform resources.',
    )
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Categories')
    .addTag('Products')
    .addTag('Purchases')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
