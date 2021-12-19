const router = require('express').Router();
const { logger } = require('./logger');
const {
  ROUTES: { ESCAPE, COURIERS, LOOKUP, LOAD_UPDATE },
} = require('./constants');
const { authenticate } = require('./controllers/authenticate');
const { logIncomingRequestInfo } = require('./utils');
const {
  createOrUpdateCourier,
} = require('./controllers/create-or-update-courier');
const { deleteCourier } = require('./controllers/delete-courier');
const {
  getInfoAboutCouriers,
} = require('./controllers/get-info-about-couriers');
const {
  updateCourierAvailableCapacity,
} = require('./controllers/update-courier-capacity');

router.all(ESCAPE, (req, res, next) => {
  logIncomingRequestInfo(req);
  authenticate(req, res, next);
});

router.get(LOOKUP, getInfoAboutCouriers);

router.post(COURIERS, createOrUpdateCourier);
router.put(COURIERS, createOrUpdateCourier);
router.delete(COURIERS, deleteCourier);

router.put(LOAD_UPDATE, updateCourierAvailableCapacity);

router.all(ESCAPE, (req, res) => {
  logger.error(
    `Error while serving path: ${req.path}, replying with 404 status`
  );
  res.status(404).send({ message: 'Resource not found' });
});

module.exports = { router };
