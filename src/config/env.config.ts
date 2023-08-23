import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

export default {
  port: process.env.PORT || 4000,
  api: {
    prefix: '/api',
  },
  env: process.env.NODE_ENV,
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/tobams-api',
    test_uri:
      process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/tobams-api-test',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: '2hr',
  },
};
