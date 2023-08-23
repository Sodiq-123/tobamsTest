import * as express from 'express';
import logger from '../../utils/logger';
import UsersService from './users.service';
import { AuthReq, verifyToken } from '../../middlewares/auth.middleware';
import { RegisterUserDto, RegisterUserReq } from 'src/dto/registerUser.dto';
import { validatePayload } from 'src/dto/index.dto';
import { LoginUserDto, LoginUserReq } from 'src/dto/loginUser.dto';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  async (req: RegisterUserReq, res: express.Response) => {
    logger.info('Registering user...', 'Users Controller', 'registerUser');
    const registerUserDto = new RegisterUserDto(req.body);
    const validate = await validatePayload(registerUserDto);
    if (validate.status === 'error') {
      logger.error(
        validate.errors.toString(),
        'Users Controller',
        'registerUser',
      );
      return res.status(400).json({
        status: 'error',
        message: validate.errors.toString(),
      });
    }

    const registerUser = await UsersService.registerUser(registerUserDto);
    if (registerUser.error) {
      logger.error(registerUser.error, 'Users Controller', 'registerUser');
      return res.status(registerUser.status).json({
        status: 'error',
        message: registerUser.error,
      });
    }

    logger.info(
      'User registered successfully',
      'Users Controller',
      'registerUser',
    );
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: registerUser.data,
    });
  },
);

usersRouter.post('/login', async (req: LoginUserReq, res: express.Response) => {
  logger.info('Logging in user...', 'Users Controller', 'loginUser');
  const loginUserDto = new LoginUserDto(req.body);
  const validate = await validatePayload(loginUserDto);
  if (validate.status === 'error') {
    logger.error(validate.errors.toString(), 'Users Controller', 'loginUser');
    return res.status(400).json({
      status: 'error',
      message: validate.errors.toString(),
    });
  }

  const loginUser = await UsersService.loginUser(loginUserDto);
  if (loginUser.error) {
    logger.error(loginUser.error, 'Users Controller', 'loginUser');
    return res.status(loginUser.status).json({
      status: 'error',
      message: loginUser.error,
    });
  }

  logger.info('User logged in successfully', 'Users Controller', 'loginUser');
  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data: loginUser,
  });
});

usersRouter.get('/dashboard', verifyToken, async (req: AuthReq, res) => {
  logger.info('Fetching user dashboard...', 'Users Controller', 'dashboard');
  const dashboard = await UsersService.dashboard(req.user.id);
  if (dashboard.error) {
    logger.error(dashboard.error, 'Users Controller', 'dashboard');
    return res.status(dashboard.status).json({
      status: 'error',
      message: dashboard.error,
    });
  }

  logger.info(
    'User dashboard fetched successfully',
    'Users Controller',
    'dashboard',
  );
  return res.status(200).json({
    status: 'success',
    message: 'User dashboard fetched successfully',
    data: dashboard.data,
  });
});

export default (app: express.Router) => {
  app.use('/users', usersRouter);
};
