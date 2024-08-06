import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  createUserDto,
  deleteUserDto,
  editUserInfoDto,
  getUserDto,
  loginDto,
  loginWithAccessKeyDto,
  renewAccessTokenDto,
  requestUserAccessKeyDto,
  resetPasswordDto,
} from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from './jwt/jwt.service';
import { MailService } from './emails/config/mail.service';
import { accessKeyValidatorHelperService } from './helpers/accessKeyValidator.service';
@Injectable()
export class AuthMicroserviceService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtTokenService,
    private mailService: MailService,
    private accessKeyValidatingHelper: accessKeyValidatorHelperService,
  ) {}
  //function to validate access token
  async validatedAccessToken(data): Promise<boolean> {
    return await this.jwtService.verifyTokens(data);
  }
  //create user
  async createUser(data: createUserDto) {
    try {
      const existingUser: [] = await this.prismaService
        .$queryRaw`SELECT user_id FROM user WHERE email = ${data.email}`;
      if (existingUser.length > 0) {
        return {
          statusCode: 403,
          message:
            'The email you are trying to register is already associated with an existing account.',
        };
      }
      const userPassword = await bcrypt.hash(data.password, 12);
      await this.prismaService
        .$queryRaw`INSERT INTO user (first_name, last_name, gender, nin_number, email, password, branch, department, role, salary, dob, contact1, contact2) VALUES (${data.first_name}, ${data.last_name}, ${data.gender}, ${data.nin_number}, ${data.email}, ${userPassword}, ${data.branch}, ${data.department}, ${data.role}, ${data.salary}, ${data.dob}, ${data.contact1}, ${data.contact2}) `;
      this.mailService.sendWelcomeEmail(data.last_name, data.email);
      return {
        statusCode: 201,
        message:
          'Account created successfully. New user can now log into the system.',
      };
    } catch (error) {
      console.log('Error while creating user : ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  //login with email and password
  async login(data: loginDto) {
    try {
      const user: {
        user_id: number;
        last_name: string;
        email: string;
        branch: string;
        department: string;
        role: string;
        password: string;
      }[] = await this.prismaService
        .$queryRaw`SELECT user_id, last_name, branch, department, role, password FROM user WHERE email = ${data.email}`;
      if (user.length > 0) {
        const validPass: boolean = await bcrypt.compare(
          data.password,
          user[0].password,
        );
        if (validPass) {
          const userData = {
            user_id: user[0].user_id,
            last_name: user[0].last_name,
            email: user[0].email,
            branch: user[0].branch,
            department: user[0].department,
            role: user[0].role,
          };
          const { last_name, ...otherUserData } = userData;
          const authTokens =
            await this.jwtService.generateAccessToken(otherUserData);
          return {
            statusCode: 200,
            message:
              'Hoooray!! We found you. Please wait a moment as we grant you access.',
            tokens: authTokens,
            last_name: last_name,
            //email: user[0].email,
            userInfo: otherUserData,
          };
        }
        return {
          statusCode: 401,
          message: 'Invalid credentials. Wrong password.',
        };
      }
      return {
        statusCode: 404,
        message:
          "We couldn't find an account associated with the email you provided.",
      };
    } catch (error) {
      console.log('Error while signing the user in: ', error);
      return {
        statusCode: 500,
        message:
          'Internal server error. Please contact system support for assistance',
      };
    }
  }

  //get user
  async getUser(data: getUserDto) {
    try {
      const user_id = data.user_id;
      const user: [] = await this.prismaService
        .$queryRaw`SELECT first_name, last_name, gender, email, branch, department, role, contact1 FROM user WHERE user_id = ${user_id}`;
      if (user.length > 0) {
        return {
          statusCode: 200,
          message: 'User has been found.',
          data: user,
        };
      }
      return {
        statusCode: 404,
        message: 'No matching user has been found.',
      };
    } catch (error) {
      console.log('Error while fetching user data : ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  //request user access key
  async requestUserAccessKey(data: requestUserAccessKeyDto) {
    try {
      const accessKey = data.accessKey;
      const user = await this.prismaService
        .$queryRaw`SELECT user_id, last_name FROM user WHERE email = ${data.email}`;
      if (user) {
        await this.accessKeyValidatingHelper.setAccessKey(
          data.email,
          data.accessKey,
        );
        await this.mailService.sendAccessKeyEmail(
          user[0].last_name,
          accessKey,
          data.email,
        );
        return {
          statusCode: 200,
          message: `An access key has been sent to your registered email address (${data.email}).`,
        };
      } else {
        return {
          statusCode: 404,
          message:
            "We couldn't find an account associated with the email you provided.",
        };
      }
    } catch (error) {
      console.log(
        'Error while generating and sending user access key : ',
        error,
      );
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  //login using access key
  async loginWithAccessKey(data: loginWithAccessKeyDto) {
    const isAccessKeyValid: any =
      await this.accessKeyValidatingHelper.validateAccessKey(
        data.email,
        data.accessKey,
      );
    if (isAccessKeyValid) {
      try {
        const user = await this.prismaService
          .$queryRaw`SELECT user_id, last_name, branch, department, role, password FROM user WHERE email = ${data.email}`;
        if (user) {
          const userData = {
            user_id: user[0].user_id,
            last_name: user[0].last_name,
            email: user[0].email,
            branch: user[0].branch,
            department: user[0].department,
            role: user[0].role,
          };
          const { last_name, ...otherUserData } = userData;
          const authTokens =
            await this.jwtService.generateAccessToken(otherUserData);
          return {
            statusCode: 200,
            message:
              'Hoooray!! We found you. Please wait a moment as we grant you access.',
            tokens: authTokens,
            last_name: last_name,
            userInfo: otherUserData,
          };
        }
        return {
          statusCode: 404,
          message:
            "We couldn't find an account associated with the email you provided.",
        };
      } catch (error) {
        console.log('Error while signing the user in: ', error);
        return {
          statusCode: 500,
          message:
            'Internal server error. Please contact system support for assistance',
        };
      }
    } else {
      return {
        statusCode: 403,
        message:
          'The access key you have provided has either expired or is invalid.',
      };
    }
  }

  //delete user
  async deleteUser(data: deleteUserDto) {
    const user: [] = await this.prismaService
      .$queryRaw`SELECT user_id FROM user WHERE user_id = ${data.user_id}`;
    try {
      if (user.length > 0) {
        this.prismaService
          .$queryRaw`DELETE FROM user WHERE user_id = ${data.user_id}`;
        return {
          statusCode: 200,
          message: 'User has been successfully deleted.',
        };
      }
      return {
        statusCode: 401,
        message: 'No user account was found matching the provided user_id',
      };
    } catch (error) {
      console.log('Error while deleting user : ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  //renew access token
  async renewAccessToken(data: renewAccessTokenDto) {
    try {
      const refreshToken = data.refresh_token;
      const userData = await this.prismaService
        .$queryRaw`SELECT user_id, email, branch, department, role FROM user WHERE user_id = ${data.user_id}`;
      const isRefreshTokenValid: boolean =
        await this.jwtService.verifyTokens(refreshToken);
      if (isRefreshTokenValid) {
        return await this.jwtService.generateAccessToken(userData[0]);
      }
    } catch (error) {
      console.log('Error while renewing access token: ', error);
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }

  //get all users
  async getAllUsers() {
    try {
      const users: [] = await this.prismaService
        .$queryRaw`SELECT user.first_name, user.last_name, user.branch, user.department, user.role FROM user`;

      if (users.length > 0) {
        return {
          statusCode: 200,
          message: 'Users successfully fetched',
          data: users,
        };
      }
      return {
        statusCode: 200,
        message: 'No users found',
        data: users,
      };
    } catch (error) {
      console.log('Error while fetching users : ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  async editUser(dto: editUserInfoDto) {
    try {
      // Log the input DTO for debugging
      console.log(dto);

      // Case 1: Update user by user_id
      if (dto.user_id) {
        // Retrieve the current user data based on user_id
        const user: any[] = await this.prismaService
          .$queryRaw`SELECT email, password FROM user WHERE user_id = ${dto.user_id}`;

        // Check if the user exists
        if (user.length > 0) {
          // Case 1.1: Only update email
          if (dto.email && !dto.new_password) {
            await this.prismaService
              .$executeRaw`UPDATE user SET email = ${dto.email} WHERE user_id = ${dto.user_id}`;
            return {
              statusCode: 200,
              message: 'User email updated successfully.',
              data: null,
            };

            // Case 1.2: Only update password
          } else if (!dto.email && dto.new_password) {
            const newPassword = await bcrypt.hash(dto.new_password, 12);
            await this.prismaService
              .$executeRaw`UPDATE user SET password = ${newPassword} WHERE user_id = ${dto.user_id}`;
            return {
              statusCode: 200,
              message: 'User password updated successfully.',
              data: null,
            };

            // Case 1.3: Update both email and password
          } else if (dto.email && dto.new_password) {
            const newPassword = await bcrypt.hash(dto.new_password, 12);
            await this.prismaService
              .$executeRaw`UPDATE user SET email = ${dto.email}, password = ${newPassword} WHERE user_id = ${dto.user_id}`;
            return {
              statusCode: 200,
              message: 'User email and password updated successfully.',
              data: null,
            };
          } else {
            // No fields to update
            return {
              statusCode: 400,
              message: 'No valid fields provided for update.',
              data: null,
            };
          }
        } else {
          // User with the given user_id does not exist
          return {
            statusCode: 404,
            message: 'User not found.',
            data: null,
          };
        }

        // Case 2: When user_id is not provided
      } else if (dto.email) {
        // Check if a user with the provided email already exists
        const existingUser: [] = await this.prismaService
          .$queryRaw`SELECT email FROM user WHERE email = ${dto.email}`;

        if (existingUser.length > 0) {
          // Email already exists
          return {
            statusCode: 409,
            message: 'Email is already in use.',
            data: null,
          };
        } else {
          // No user exists with the provided email
          return {
            statusCode: 404,
            message: 'No user found with the given email.',
            data: null,
          };
        }
      } else {
        // Neither user_id nor email is provided
        return {
          statusCode: 400,
          message: 'No user_id or email provided.',
          data: null,
        };
      }
    } catch (error) {
      console.log('Error while editing user: ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
        data: null,
      };
    }
  }

  //reset password
  async resetPassword(data: resetPasswordDto) {
    try {
      const user: [] = await this.prismaService
        .$queryRaw`SELECT user_id FROM user WHERE email = ${data.email}`;
      if (user.length > 0) {
        const newPasswordHash = await bcrypt.hash(data.new_password, 12);
        await this.prismaService
          .$queryRaw`UPDATE user SET password = ${newPasswordHash} WHERE user_id = ${user}`;
        return {
          statusCode: 200,
          message: `Your password has been successfully reset.`,
        };
      }
    } catch (error) {
      console.log('Error while resetting user password : ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }
}
