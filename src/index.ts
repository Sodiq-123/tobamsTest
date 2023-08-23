import { createApp } from './app';
import env from './config/env.config';
import { connectDB } from './config/mongo.config';
import logger from './utils/logger';

const app = createApp();

connectDB();
app.listen(env.port, () => {
  logger.info(
    `🚀 Server ready at: http://localhost:${env.port}${env.api.prefix}`,
    'Server',
    'server',
  );
});
