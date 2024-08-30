import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats_client/nats.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [AdminController],
  providers: [],
})
export class SuperadminModule {}
