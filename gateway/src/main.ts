import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://profbioresearchmanager.com',
      'https://pbms.netlify.app',
      'https://pbas.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });
  const PORT = process.env.PORT || 3015;
  await app.listen(PORT, () =>
    console.log(`Application is running on port ${PORT}`),
  );
}
bootstrap();
