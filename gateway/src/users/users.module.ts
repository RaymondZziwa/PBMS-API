import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'src/nats_client/nats.module';
import { UploadModule } from './upload.module';

@Module({
  imports: [NatsClientModule, UploadModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
