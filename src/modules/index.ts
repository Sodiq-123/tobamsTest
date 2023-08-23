import * as express from 'express';
import usersRoutes from './users/users.routes';

export default () => {
  const baseRouter = express.Router();
  usersRoutes(baseRouter);
  return baseRouter;
};
