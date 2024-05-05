import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './app.controller';
import { AuthMicroserviceService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtTokenModule } from './jwt/jwt.module';
import { JwtTokenService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtTokenModule,
    CacheModule.register(),
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService, JwtTokenService],
})
export class AuthMicroserviceModule {}
