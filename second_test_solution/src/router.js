const router = require('express').Router();
const { logger } = require('./logger');
const {
  ROUTES: { HOME, ESCAPE, COURIERS, LOOKUP },
} = require('./constants');
const { authenticate } = require('./controllers/authenticate');
const { logIncomingRequest } = require('./utils');
const {
  createOrUpdateCourier,
} = require('./controllers/create-or-update-courier');

router.all(ESCAPE, (req, res, next) => {
  logIncomingRequest(req);
  authenticate(req, res, next);
});

router.get(HOME, (req, res) => {
  res.send('Hello World!');
});

router.get(LOOKUP, (req, res) => {
  res.send(COURIERS);
});

router.post(COURIERS, createOrUpdateCourier);
router.put(COURIERS, createOrUpdateCourier);

router.delete(LOOKUP, (req, res) => {
  res.send(LOOKUP);
});

router.all(ESCAPE, (req, res) => {
  logger.error(
    `Error while serving path: ${req.path}, replying with 404 status`
  );
  res.status(404);
  res.send('Not Found');
});

module.exports = { router };
