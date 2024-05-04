import { Controller } from '@nestjs/common';
import { AuthMicroserviceService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  createUserDto,
  deleteUserDto,
  getUserDto,
  loginDto,
  renewAccessTokenDto,
  requestUserAccessKeyDto,
  resetPasswordDto,
  validateTokenDto,
} from './dto/users.dto';

@Controller()
export class AuthMicroserviceController {
  constructor(private readonly authService: AuthMicroserviceService) {}

  @MessagePattern({ cmd: 'VALIDATE_TOKEN' })
  vaalidateAccessToken(@Payload() data: validateTokenDto) {
    return this.authService.validatedAccessToken(data);
  }

  @MessagePattern({ cmd: 'CREATE_USER' })
  createUser(@Payload() data: createUserDto) {
    return this.authService.createUser(data);
  }

  @MessagePattern({ cmd: 'GET_USER' })
  getUser(@Payload() data: getUserDto) {
    return this.authService.getUser(data);
  }

  @MessagePattern({ cmd: 'REQUEST_ACCESS_KEY' })
  requestUserAccessKey(@Payload() data: requestUserAccessKeyDto) {
    return this.authService.requestUserAccessKey(data);
  }

  @MessagePattern({ cmd: 'DELETE_USER' })
  deleteUser(@Payload() data: deleteUserDto) {
    return this.authService.deleteUser(data);
  }

  @MessagePattern({ cmd: 'RENEW_ACCESS_TOKEN' })
  renewAccessToken(@Payload() data: renewAccessTokenDto) {
    return this.authService.renewAccessToken(data);
  }

  @MessagePattern({ cmd: 'LOGIN' })
  login(@Payload() data: loginDto) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'RESET_PASSWORD' })
  resetPassword(@Payload() data: resetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
