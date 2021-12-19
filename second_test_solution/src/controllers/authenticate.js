const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { logger } = require('../logger');
const { ALLOWED_USERS } = require('../constants');

async function authenticate(request, response, next) {
  const userHeader = jwt.decode(request.headers.user);
  if (
    !userHeader ||
    !Object.values(ALLOWED_USERS).some(
      (allowedUser) => allowedUser === userHeader.user
    )
  ) {
    const authenticationError = createError(401, {
      code: 401,
      message: `User not allowed`,
    });

    logger.error(
      authenticationError,
      `Error authenticating user, received header: ${request.headers.user}`
    );

    response.status(401);
    response.send({ message: 'Unauthorized user' });
  } else {
    logger.info(`User authenticated as ${userHeader.user}`);
    next();
  }
}

module.exports = { authenticate };
