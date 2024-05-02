import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './app.controller';
import { AuthMicroserviceService } from './app.service';

@Module({
  imports: [],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService],
})
export class AuthMicroserviceModule {}
