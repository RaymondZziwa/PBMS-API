import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BearerTokenExtractor } from './middleware/tokenExtractor.middleware';
import { UsersController } from './users/users.controller';
import { NatsClientModule } from './nats_client/nats.module';
import { EquatorialShopModule } from './equatorial/shop/shop.module';
import { SuperadminModule } from './admin/admin.module';
import { UploadModule } from './users/upload.module';

@Module({
  imports: [
    UploadModule,
    UsersModule,
    NatsClientModule,
    EquatorialShopModule,
    SuperadminModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenExtractor)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
