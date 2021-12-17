const pino = require('pino');

const logger = pino({
  name: 'CourierAPI',
  prettyPrint: true,
  messageKey: 'message',
  timestamp: pino.stdTimeFunctions.isoTime,
});

module.exports = { logger };
