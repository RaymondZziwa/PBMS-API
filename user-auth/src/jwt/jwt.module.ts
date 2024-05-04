import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [
    JwtModule.register({
      secret: env.secret_key,
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class JwtTokenModule {}
