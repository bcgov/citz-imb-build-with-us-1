import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Onboarding')
    .setDescription(
      `Build With Us - Season 1 (NestJS API Docs)\n
      NestJS Official Documentation: https://docs.nestjs.com`,
    )
    .setVersion('1.0')
    .addTag('Health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
