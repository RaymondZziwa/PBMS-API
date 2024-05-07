import { Controller } from '@nestjs/common';
import { AuthMicroserviceService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  createUserDto,
  deleteUserDto,
  getUserDto,
  loginDto,
  loginWithAccessKeyDto,
  renewAccessTokenDto,
  requestUserAccessKeyDto,
  resetPasswordDto,
  validateTokenDto,
} from './dto/users.dto';
import { RedisService } from './cache/config/redis.service';

@Controller()
export class AuthMicroserviceController {
  constructor(
    private readonly authService: AuthMicroserviceService,
    private redisService: RedisService,
  ) {}

  @MessagePattern({ cmd: 'VALIDATE_TOKEN' })
  validateAccessToken(@Payload() data: validateTokenDto) {
    return this.authService.validatedAccessToken(data);
  }

  @MessagePattern({ cmd: 'CREATE_USER' })
  createUser(@Payload() data: createUserDto) {
    return this.authService.createUser(data);
  }

  @MessagePattern({ cmd: 'GET_USER' })
  async getUser(@Payload() data: getUserDto) {
    const cachedUser: any = await this.redisService.getData(
      data.user_id.toString(),
    );

    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    const fetchedUser = await this.authService.getUser(data);
    this.redisService.setData(
      data.user_id.toString(),
      JSON.stringify(fetchedUser),
    );
    return fetchedUser;
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

  @MessagePattern({ cmd: 'LOGIN_WITH_ACCESS_KEY' })
  loginWithAccessKey(@Payload() data: loginWithAccessKeyDto) {
    return this.authService.loginWithAccessKey(data);
  }

  @MessagePattern({ cmd: 'RESET_PASSWORD' })
  resetPassword(@Payload() data: resetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  async getAllUsers() {
    const cachedList: any = await this.redisService.getData('users_list');
    if (cachedList) {
      return JSON.parse(cachedList);
    }
    const fetchedList = await this.authService.getAllUsers();
    this.redisService.setData('users_list', JSON.stringify(fetchedList));
    return fetchedList;
  }
}
