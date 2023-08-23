import { Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import config from './config/env.config';
import createRoutes from './modules/index';
import * as morgan from 'morgan';
import * as compression from 'compression';
import helmet from 'helmet';

export const createApp = (): express.Application => {
  const app: express.Application = express();
  app.enable('trust proxy');
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );
  app.use(config.api.prefix, createRoutes());

  app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to the API',
      data: null,
    });
  });

  // handle 404 errors
  app.use('*', (_, res: Response) => {
    return res.status(404).json({
      status: 'error',
      message: 'Resource not found',
    });
  });

  return app;
};
