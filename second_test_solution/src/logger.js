const pino = require('pino');

const logger = pino({
  name: 'CourierAPI',
  level: process.env.LOG_LEVEL || 'info',
  messageKey: 'message',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    String(process.env.LOG_PRETTY) === 'true'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : null,
});

module.exports = { logger };
