import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  clockInDto,
  clockOutDto,
  createUserDto,
  deleteUserDto,
  editUserDto,
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
import { generateEAN13 } from './helpers/code_generator';
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
      const card_code = await generateEAN13();
      const generatedPwd = () => Math.random().toString(36).substring(2, 8);
      const userPassword = await bcrypt.hash(generatedPwd(), 12);
      await this.prismaService
        .$queryRaw`INSERT INTO user (first_name, last_name, gender, nin_number, email, password, branch, department, role, salary, dob, contact1, contact2, card_no) VALUES (${data.first_name}, ${data.last_name}, ${data.gender}, ${data.nin_number}, ${data.email}, ${userPassword}, ${data.branch}, ${data.department}, ${data.role}, ${data.salary}, ${data.dob}, ${data.contact1}, ${data.contact2}, ${card_code}) `;
      this.mailService.sendWelcomeEmail(
        data.last_name,
        data.email,
        generatedPwd(),
      );
      const updatedUsersList = await this.getAllUsers();
      return {
        statusCode: 201,
        message:
          'Account created successfully. New user can now log into the system.',
        data: updatedUsersList.data,
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
          data: null,
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
      await this.accessKeyValidatingHelper.validateAccessKey(data.email);
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
    console.log(data.user_id);
    const user: [] = await this.prismaService
      .$queryRaw`SELECT user_id FROM user WHERE user_id = ${data.user_id}`;
    try {
      if (user.length > 0) {
        await this.prismaService
          .$executeRaw`DELETE FROM user WHERE user_id = ${data.user_id}`;
        const updatedUsersList = await this.getAllUsers();
        return {
          statusCode: 200,
          message: 'User has been successfully deleted.',
          data: updatedUsersList.data,
        };
      }
      return {
        statusCode: 401,
        message: 'No user account was found.',
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
        .$queryRaw`SELECT user_id, first_name, last_name, gender, nin_number, email, branch, department, role, salary, dob, contact1, createdAt FROM user`;

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

  async genericGetUsers() {
    try {
      const users: [] = await this.prismaService
        .$queryRaw`SELECT user_id, first_name, last_name, branch, department, role, salary, dob, contact1, createdAt FROM user`;

      if (users.length > 0) {
        return {
          statusCode: 200,
          message: 'Users successfully fetched',
          data: users,
        };
      }
      return {
        statusCode: 404,
        message: 'No users found',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  async editUser(dto: editUserDto) {
    try {
      const { user_id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== null && value !== undefined && value !== '',
        )
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE user SET ${setParts} WHERE user_id = ${user_id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'User not found',
        };
      }

      const updatedUserList = await this.getAllUsers();

      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: updatedUserList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating user information',
        data: error,
      };
    }
  }

  //reset password
  async resetPassword(data: resetPasswordDto) {
    try {
      console.log('data', data);
      const user: [] = await this.prismaService
        .$queryRaw`SELECT user_id FROM user WHERE email = ${data.email}`;
      if (user.length > 0) {
        const newPasswordHash = await bcrypt.hash(data.new_password, 12);
        await this.prismaService
          .$queryRaw`UPDATE user SET password = ${newPasswordHash} WHERE email = ${data.email}`;
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

  async employeeClockIn(data: clockInDto) {
    try {
      const existingEntry: [] = await this.prismaService.$queryRaw`
        SELECT * FROM attendance_logs 
        WHERE user_id = ${data.user_id} 
        AND log_date = ${data.log_date} 
        AND time_in IS NOT NULL
      `;

      if (existingEntry.length > 0) {
        return {
          statusCode: 400,
          message: 'You have already clocked in for today.',
        };
      }

      const entry = await this.prismaService.$queryRaw`
        INSERT INTO attendance_logs (user_id, log_date, time_in, physical_proof_in) 
        VALUES (${data.user_id}, ${data.log_date}, ${data.time_in}, ${data.physical_proof})
      `;

      return {
        statusCode: 201,
        message: 'Clock-in successful.',
        data: entry,
      };
    } catch (error) {
      console.log('Error while processing clock-in: ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  async employeeClockOut(data: clockOutDto) {
    try {
      // Check if the user has clocked in for the given date
      const existingEntry: [] = await this.prismaService.$queryRaw`
        SELECT * FROM attendance_logs 
        WHERE user_id = ${data.user_id} 
        AND log_date = ${data.log_date} 
        AND time_in IS NOT NULL
        AND time_out IS NULL
      `;

      if (existingEntry.length === 0) {
        // If no clock-in entry exists or the user has already clocked out, return a message
        return {
          statusCode: 400,
          message:
            'You have not clocked in or you have already clocked out for today.',
        };
      }

      // If a valid clock-in exists, proceed with clocking out by updating the record
      const entry = await this.prismaService.$queryRaw`
        UPDATE attendance_logs 
        SET time_out = ${data.time_out}, physical_proof_out = ${data.physical_proof}
        WHERE user_id = ${data.user_id} 
        AND log_date = ${data.log_date} 
        AND time_in IS NOT NULL
        AND time_out IS NULL
        RETURNING *
      `;

      return {
        statusCode: 200,
        message: 'Clock-out successful.',
        data: entry,
      };
    } catch (error) {
      console.log('Error while processing clock-out: ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }

  async getAttendanceLogs() {
    try {
      const logs: [] = await this.prismaService
        .$queryRaw`SELECT attendance_logs.*, user.first_name, user.last_name FROM attendance_logs JOIN user ON attendance_logs.user_id = user.user_id`;

      if (logs.length > 0) {
        return {
          statusCode: 200,
          message: 'Attendance data has been successfully fetched',
          data: logs,
        };
      }
      return {
        statusCode: 404,
        message: 'No logs found',
        data: logs,
      };
    } catch (error) {
      console.log('Error while fetching attendance logs: ', error);
      return {
        statusCode: 500,
        message:
          "Internal server error. Can't perform this action. Contact system support for assistance.",
      };
    }
  }
}
