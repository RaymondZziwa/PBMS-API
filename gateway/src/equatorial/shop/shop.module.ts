import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats_client/nats.module';
import { equatorialShopController } from './shop.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [equatorialShopController],
  providers: [],
})
export class EquatorialShopModule {}
