const router = require('express').Router();
const { logger } = require('./logger');
const {
  ROUTES: { HOME, ESCAPE },
} = require('./constants');
const { authenticate } = require('./controllers/authenticate');
const { logIncomingRequest } = require('./utils');

router.all(ESCAPE, (req, res, next) => {
  logIncomingRequest(req);
  authenticate(req, res, next);
});

router.get(HOME, (req, res) => {
  res.send('Hello World!');
});

router.all(ESCAPE, (req, res) => {
  logger.error(
    `Error while serving path: ${req.path}, replying with 404 status`
  );
  res.status(404);
  res.send('Not Found');
});

module.exports = { router };
