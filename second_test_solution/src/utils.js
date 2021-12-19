const { logger } = require('./logger');

function logIncomingRequestInfo(req) {
  logger.info(
    `Incoming request to ${req.path} with query: ${JSON.stringify(req.query)}`
  );
}

function isLoadPossible(currentLoad = 0, newLoad, maxCourierCapacity) {
  if (currentLoad + newLoad <= maxCourierCapacity) {
    return true;
  }
  return false;
}

module.exports = { logIncomingRequestInfo, isLoadPossible };
