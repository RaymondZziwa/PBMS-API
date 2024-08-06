import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './app.controller';
import { AuthMicroserviceService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtTokenModule } from './jwt/jwt.module';
import { JwtTokenService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
//import { RedisCacheModule } from './cache/config/redis.module';
import { PrismaService } from './prisma/prisma.service';
import { MailService } from './emails/config/mail.service';
import { JwtService } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheModule } from './cache/config/redis.module';
import { accessKeyValidatorHelperService } from './helpers/accessKeyValidator.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtTokenModule,
    RedisCacheModule,
    CacheModule.register({
      store: redisStore,
      host: '181.215.68.133',
      port: 6379,
      username: '',
      password: '',
    }),
  ],
  controllers: [AuthMicroserviceController],
  providers: [
    PrismaService,
    AuthMicroserviceService,
    JwtTokenService,
    MailService,
    JwtService,
    accessKeyValidatorHelperService,
  ],
})
export class AuthMicroserviceModule {}
