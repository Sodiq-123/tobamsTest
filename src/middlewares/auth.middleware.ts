import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import env from 'src/config/env.config';

dotenv.config();

export interface AuthReq extends Request {
  user: any;
}

export function verifyToken(req: AuthReq, res: Response, next: NextFunction) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, env.jwt.secret, (err, user) => {
      if (err) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
}
