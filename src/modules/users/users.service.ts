import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from '../../dto/registerUser.dto';
import usersModel from '../../models/users.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env.config';

export class UsersService {
  public async registerUser(data: RegisterUserDto) {
    try {
      const { username, password } = data;
      const uniqueUser = await usersModel.findOne({
        username,
      });
      if (uniqueUser) {
        return {
          status: 400,
          message: 'Username or email already exists',
        };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new usersModel({
        username,
        password: hashedPassword,
      });

      user.save();

      return {
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  public async loginUser(data: LoginUserDto) {
    try {
      const { username, password } = data;
      const user = await usersModel.findOne({ username });

      if (!user) {
        return {
          status: 404,
          error: 'User not found',
        };
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return {
          status: 400,
          message: 'Invalid email or password',
        };
      }

      const token = jwt.sign({ id: user._id }, env.jwt.secret, {
        expiresIn: env.jwt.expiresIn,
      });

      return {
        data: user,
        token,
      };
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  public async dashboard(userId: string) {
    try {
      const user = await usersModel.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

      return {
        data: `Welcome to your dashboard, ${user.username}!.`,
      };
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }
}

const usersService = new UsersService();
export default usersService;
