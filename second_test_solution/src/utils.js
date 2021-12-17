const { logger } = require('./logger');

function logIncomingRequest(req) {
  logger.info(
    `Incoming request to ${req.path}\n
    query: ${JSON.stringify(req.query)}`
  );
}

module.exports = { logIncomingRequest };
