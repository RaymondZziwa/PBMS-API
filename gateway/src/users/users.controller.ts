import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  //admin to create user
  @Post('/create-user')
  async createUser(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid$ = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    return new Observable((observer) => {
      isValid$.subscribe({
        next: (isValid) => {
          if (isValid && role === 'admin') {
            this.natsClient.send({ cmd: 'CREATE_USER' }, req.body).subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: () => {
                observer.error(
                  new HttpException(
                    'Failed to create user.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  ),
                );
              },
            });
          } else {
            observer.error(
              new HttpException(
                'Unauthorized or invalid access token.',
                HttpStatus.FORBIDDEN,
              ),
            );
          }
        },
        error: () => {
          observer.error(
            new HttpException(
              'Failed to validate token.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        },
      });
    });
  }

  //admin to get user info
  @Get('/get-user')
  async getUser(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid$ = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    return new Observable((observer) => {
      isValid$.subscribe({
        next: (isValid) => {
          if (isValid && role === 'admin') {
            this.natsClient.send({ cmd: 'GET_USER' }, req.body).subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: () => {
                observer.error(
                  new HttpException(
                    'Failed to create user.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  ),
                );
              },
            });
          } else {
            observer.error(
              new HttpException(
                'Unauthorized or invalid access token.',
                HttpStatus.FORBIDDEN,
              ),
            );
          }
        },
        error: () => {
          observer.error(
            new HttpException(
              'Failed to validate token.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        },
      });
    });
  }

  //request access key
  @Post('/request-access-key')
  requestAccessKey(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'REQUEST_ACCESS_KEY' }, req.body);
  }

  //delete use
  @Post('/delete-user')
  async deleteUser(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid$ = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    return new Observable((observer) => {
      isValid$.subscribe({
        next: (isValid) => {
          if (isValid && role === 'admin') {
            this.natsClient.send({ cmd: 'DELETE_USER' }, req.body).subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: () => {
                observer.error(
                  new HttpException(
                    'Failed to get all users.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  ),
                );
              },
            });
          } else {
            observer.error(
              new HttpException(
                'Unauthorized or invalid access token.',
                HttpStatus.FORBIDDEN,
              ),
            );
          }
        },
        error: () => {
          observer.error(
            new HttpException(
              'Failed to validate token.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        },
      });
    });
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

  //reser-password
  @Post('/reset-password')
  resetPassword(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESET_PASSWORD' }, req.body);
  }

  //get-all-users
  @Get('/all-users')
  async getAllUsers(@Req() req: Request) {
    const token = req['token'];
    const role = req['role'];
    const isValid$ = this.natsClient.send<boolean>(
      { cmd: 'VALIDATE_TOKEN' },
      token,
    );

    return new Observable((observer) => {
      isValid$.subscribe({
        next: (isValid) => {
          if (isValid && role === 'admin') {
            return this.natsClient
              .send({ cmd: 'GET_ALL_USERS' }, req.body)
              .subscribe({
                next: (response) => {
                  observer.next(response);
                  observer.complete();
                },
                error: () => {
                  observer.error(
                    new HttpException(
                      'Failed to get all users.',
                      HttpStatus.INTERNAL_SERVER_ERROR,
                    ),
                  );
                },
              });
          } else {
            observer.error(
              new HttpException(
                'Unauthorized or invalid access token.',
                HttpStatus.FORBIDDEN,
              ),
            );
          }
        },
        error: () => {
          observer.error(
            new HttpException(
              'Failed to validate token.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        },
      });
    });
  }
}
