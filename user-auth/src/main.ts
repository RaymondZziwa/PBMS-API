import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthMicroserviceModule,
    {
      transport: Transport.NATS,
      options: {
        //servers: ['nats://nats'],
        servers: ['nats://nats:4222'],
      },
    },
  );
  await app.listen();
}
bootstrap();
