import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadService } from './upload.service';

@Controller('api/v1/')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private readonly uploadService: UploadService,
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

  @Get('/generic-all-users')
  async getAllUsersGeneric(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GENERIC_ALL_USERS' }, req.body);
  }

  @Post('/employee-clock-in')
  @UseInterceptors(FileInterceptor('physical_proof_in'))
  async employeeClockIn(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    let imagePath: string;

    if (file) {
      imagePath = await this.uploadService.saveFile(file);
    } else {
      return {
        statusCode: 400,
        message: 'Physical proof is missing',
        data: null,
      };
    }

    const clockInData = {
      ...req.body,
      user_id: req.body.user_id,
      physical_proof: imagePath,
    };
    return this.natsClient.send({ cmd: 'EMPLOYEE_CLOCK_IN' }, clockInData);
  }

  @Post('/employee-clock-out')
  @UseInterceptors(FileInterceptor('physical_proof_out'))
  async employeeClockOut(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    let imagePath: string;

    if (file) {
      imagePath = await this.uploadService.saveFile(file);
    } else {
      return {
        statusCode: 400,
        message: 'Physical proof is missing',
        data: null,
      };
    }

    const clockOutData = {
      ...req.body,
      user_id: req.body.user_id,
      physical_proof: imagePath,
    };
    return this.natsClient.send({ cmd: 'EMPLOYEE_CLOCK_OUT' }, clockOutData);
  }

  @Get('/get-attendance-logs')
  async getEmployeeAttendanceLogs(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EMPLOYEE_ATTENDANCE_LOGS' }, req.body);
  }
}
