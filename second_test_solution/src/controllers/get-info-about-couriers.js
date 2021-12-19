const { getCouriersWithMinCapacity } = require('../db/methods');
const { logger } = require('../logger');

async function getInfoAboutCouriers(req, res, next) {
  const { capacity_required } = req.query;

  try {
    const result = await getCouriersWithMinCapacity(capacity_required);
    res.status(200).send(result);
    logger.info({
      response_sent: {
        status: 200,
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getInfoAboutCouriers };
