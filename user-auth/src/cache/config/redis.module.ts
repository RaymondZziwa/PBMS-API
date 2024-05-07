import { Module } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: '6379',
      username: '',
      password: '',
      ttl: 1800000,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCacheModule {}
