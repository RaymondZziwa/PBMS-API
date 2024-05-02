import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'src/nats_client/nats.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
