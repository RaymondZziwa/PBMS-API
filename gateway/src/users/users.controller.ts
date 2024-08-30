import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('api/v1/')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  //admin to create user
  @Post('/create-user')
  async createUser(@Req() req: Request) {
    //return this.natsClient.send({ cmd: 'CREATE_USER' }, req.body);
    const token = req['token'];
    const role = req['role'];
    const isValid = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    if (isValid && role === 'superadmin') {
      return await lastValueFrom(
        this.natsClient.send({ cmd: 'CREATE_USER' }, req.body),
      );
    } else {
      // Handle the case where the token is not valid
      throw new UnauthorizedException('Invalid token');
    }
  }

  //admin to get user info
  @Get('/get-user')
  async getUser(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    if (isValid && role === 'superadmin') {
      return await lastValueFrom(
        this.natsClient.send({ cmd: 'GET_USER' }, req.body),
      );
    } else {
      // Handle the case where the token is not valid
      throw new UnauthorizedException('Invalid token');
    }
  }

  //request access key
  @Post('/request-access-key')
  requestAccessKey(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'REQUEST_ACCESS_KEY' }, req.body);
  }

  //delete user
  @Post('/delete-user')
  async deleteUser(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    if (isValid && role === 'superadmin') {
      return await lastValueFrom(
        this.natsClient.send({ cmd: 'DELETE_USER' }, req.body),
      );
    } else {
      // Handle the case where the token is not valid
      throw new UnauthorizedException('Invalid token');
    }
  }

  //renew access token
  @Post('/refresh-token')
  renewAccessToken(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RENEW_ACCESS_TOKEN' }, req.body);
  }

  //login
  @Post('/login')
  login(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'LOGIN' }, req.body);
  }

  //login with access key
  @Post('/login-with-access-key')
  loginWithAccessKey(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'LOGIN_WITH_ACCESS_KEY' }, req.body);
  }

  //reset-password
  @Post('/reset-password')
  resetPassword(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESET_PASSWORD' }, req.body);
  }

  //edit-user-info
  @Post('/edit-user-info')
  editUserInfo(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_USER_INFO' }, req.body);
  }

  //get-all-users
  @Get('/get-all-users')
  async getAllUsers(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    if (isValid && role === 'superadmin') {
      return await lastValueFrom(
        this.natsClient.send({ cmd: 'GET_ALL_USERS' }, role),
      );
    } else {
      // Handle the case where the token is not valid
      throw new UnauthorizedException('Invalid token');
    }
  }
}
