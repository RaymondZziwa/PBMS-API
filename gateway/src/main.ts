import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://profbioresearchmanager.com',
      'https://pbms.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const PORT = process.env.PORT || 3015;
  await app.listen(PORT, () =>
    console.log(`Application is running on port ${PORT}`),
  );
}
bootstrap();
