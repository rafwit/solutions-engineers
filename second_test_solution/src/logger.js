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
  serializers: {
    req(req) {
      return {
        url: req.url.split('?')[0],
        query: req.query,
      };
    },
  },
});

module.exports = { logger };
