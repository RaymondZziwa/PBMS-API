import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class addressInfoDto {
  @IsString()
  @IsNotEmpty()
  village: string;

  @IsString()
  @IsNotEmpty()
  parish: string;

  @IsString()
  @IsNotEmpty()
  subcounty: string;

  @IsString()
  @IsNotEmpty()
  county: string;

  @IsString()
  @IsNotEmpty()
  district: string;
}

class bankInfoDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNo: string;
}

class educationInfoDto {
  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsString()
  @IsNotEmpty()
  institution: string;
}

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  nin_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  contact1: string;

  @IsString()
  @IsOptional()
  contact2?: string;

  @IsOptional()
  bankInfo: bankInfoDto;

  @IsOptional()
  educationInfo: educationInfoDto;

  @IsOptional()
  addressInfo: addressInfoDto;

  createdAt: Date;
}

export class validateTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class getUserDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class requestUserAccessKeyDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  accessKey: string;
}

export class loginWithAccessKeyDto {
  @IsString()
  @IsNotEmpty()
  accessKey: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class deleteUserDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class renewAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class loginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class resetPasswordDto {
  @IsString()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  @IsNotEmpty()
  @IsString()
  new_password: string;
}

export class editUserInfoDto {
  @IsNumber()
  user_id: number;

  @IsEmail()
  current_email: number;

  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  @IsString()
  new_password: string;
}

export class editUserDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  gender: string;

  @IsString()
  nin_number: string;

  @IsEmail()
  email: string;

  @IsString()
  branch: string;

  @IsString()
  department: string;

  @IsString()
  role: string;

  @IsString()
  salary: string;

  @IsDateString()
  dob: Date;

  @IsString()
  contact1: string;

  @IsString()
  @IsOptional()
  contact2?: string;

  @IsOptional()
  bankInfo: bankInfoDto;

  @IsOptional()
  educationInfo: educationInfoDto;

  @IsOptional()
  addressInfo: addressInfoDto;

  createdAt: Date;
}
