import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}
  //function to generate jwt token
  async generateAccessToken(userData: {
    user_id: number;
    email: string;
    branch: string;
    department: string;
    role: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    statusCode: number;
    message: string;
  }> {
    try {
      const accessToken = this.jwtService.sign(userData, {
        expiresIn: '1d',
        secret: env.SECRET_KEY,
      });
      const refreshToken = this.jwtService.sign(userData, {
        expiresIn: '2d',
        secret: env.SECRET_KEY,
      });
      return {
        statusCode: 200,
        message: 'Access and refresh tokens have been successfully generated.',
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.log('Error while generating jwt tokens: ', error);
      return {
        statusCode: 500,
        message:
          'Internal Server Error. Access and refresh tokens couldnot be generated',
        accessToken: null,
        refreshToken: null,
      };
    }
  }

  //function to verify jwt access and refresh tokens
  async verifyTokens(token: string) {
    try {
      const isTokenValid = await this.jwtService.verify(token, {
        secret: env.SECRET_KEY,
      });
      if (isTokenValid) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error while verifying token: ', error);
      return false;
    }
  }
}
