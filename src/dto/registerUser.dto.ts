import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { BaseDto } from './base.dto';
import { Request } from 'express';

interface IRegisterUserDto {
  username: string;
  password: string;
}

export class RegisterUserDto extends BaseDto implements IRegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message:
      'Username must contain only alphanumeric characters and underscores',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15, {
    message: 'Password must be between 8 and 15 characters long',
  })
  password: string;

  constructor(data: IRegisterUserDto) {
    super();
    this.username = data.username;
    this.password = data.password;
  }
}

export interface RegisterUserReq extends Request {
  body: IRegisterUserDto;
  params: any;
  query: any;
}
