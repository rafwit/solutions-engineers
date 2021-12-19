const { logger } = require('./logger');

function logIncomingRequestInfo(req) {
  logger.info(
    `Incoming request to ${req.path} with query: ${JSON.stringify(req.query)}`
  );
}

module.exports = { logIncomingRequestInfo };
