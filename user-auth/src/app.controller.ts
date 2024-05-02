import { Controller } from '@nestjs/common';
import { AuthMicroserviceService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthMicroserviceController {
  constructor(private readonly authService: AuthMicroserviceService) {}

  @MessagePattern({ cmd: 'VALIDATE_TOKEN' })
  vaalidateAccessToken(@Payload() data: any) {
    console.log('token', data);
    return true;
  }

  @MessagePattern({ cmd: 'CREATE_USER' })
  createUser(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 201, msg: 'user created' };
  }

  @MessagePattern({ cmd: 'GET_USER' })
  getUser(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'user found' };
  }

  @MessagePattern({ cmd: 'REQUEST_ACCESS_KEY' })
  requestUserAccessKey(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'Access key has been sent to your email' };
  }

  @MessagePattern({ cmd: 'DELETE_USER' })
  deleteUser(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'User deleted.' };
  }

  @MessagePattern({ cmd: 'RENEW_ACCESS_TOKEN' })
  renewAccessToken(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'Access token has been renewed.' };
  }

  @MessagePattern({ cmd: 'LOGIN' })
  login(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'User logged in.' };
  }

  @MessagePattern({ cmd: 'RESET_PASSWORD' })
  resetPassword(@Payload() data: any) {
    console.log('cu', data);
    return { statusCode: 200, msg: 'Password has been reset.' };
  }

  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  getAllUsers(@Payload() data: any) {
    console.log('cu', data);
    return {
      statusCode: 200,
      msg: 'Password has been reset.',
      data: ['user1', 'user2', 'user3', 'user4'],
    };
  }
}
