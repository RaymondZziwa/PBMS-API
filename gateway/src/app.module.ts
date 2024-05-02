import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BearerTokenExtractor } from './middleware/tokenExtractor.middleware';
import { UsersController } from './users/users.controller';
import { NatsClientModule } from './nats_client/nats.module';

@Module({
  imports: [UsersModule, NatsClientModule],
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
