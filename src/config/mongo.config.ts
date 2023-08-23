import mongoose from 'mongoose';
import env from './env.config';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    let url: string;
    if (env.env === 'test') {
      url = env.db.test_uri;
    } else {
      url = env.db.uri;
    }
    await mongoose.connect(url);
    logger.info('Connected to database successfully', 'MongoDB', 'connectDB');
    return {
      status: 'success',
    };
  } catch (err: any) {
    logger.error(
      `Could not connect to database: ${err.message}`,
      'MongoDB',
      'connectDB',
    );
    return {
      status: 'error',
    };
  }
};

export const clearDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (err: any) {
    logger.error(
      `Could not clear database: ${err.message}`,
      'MongoDB',
      'clearDB',
    );
  }
};
