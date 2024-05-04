import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './app.controller';
import { AuthMicroserviceService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtTokenModule } from './jwt/jwt.module';
import { JwtTokenService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtTokenModule,
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService, JwtTokenService],
})
export class AuthMicroserviceModule {}
