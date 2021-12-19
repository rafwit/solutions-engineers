const express = require('express');
const { connectToDataBase } = require('./db/methods');
const { router } = require('./router');
const { logger } = require('./logger');
const {
  PORT,
  DB_NAME,
  BASE_URLS: { LOCAL },
} = require('./constants');

async function bootstrap() {
  const app = express();
  app.use(express.json());
  app.use(router);

  await connectToDataBase()
    .then(() =>
      logger.info(`Connection to database "${DB_NAME}" established succesfully`)
    )
    .catch((err) =>
      logger.error(err, 'Error occured while connecting to database')
    );

  app.listen(PORT, () => {
    logger.info(`CourierAPI listening at ${LOCAL}:${PORT}`);
  });
}

bootstrap();
