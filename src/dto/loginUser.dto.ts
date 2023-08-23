import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { BaseDto } from './base.dto';
import { Request } from 'express';

interface ILoginUserDto {
  username: string;
  email?: string;
  password: string;
}

export class LoginUserDto extends BaseDto implements ILoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message:
      'Username must contain only alphanumeric characters and underscores',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: ILoginUserDto) {
    super();
    this.username = data.username;
    this.password = data.password;
  }
}

export interface LoginUserReq extends Request {
  body: ILoginUserDto;
  params: any;
  query: any;
}
